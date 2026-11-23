// ─────────────────────────────────────────────────────────────────────────────
// Shared 3D "stage" for the isometric dioramas (hero workspace, FedShield model).
// Handles renderer + soft studio lighting, an orthographic isometric camera that
// fits any aspect ratio, hover-lift of registered parts, projected DOM labels,
// pointer tilt, and a render loop that the scene builders hook into.
// ─────────────────────────────────────────────────────────────────────────────
import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  PCFSoftShadowMap,
  PlaneGeometry,
  Raycaster,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export const PALETTE = {
  paper: new Color('#FBFAF7'),
  plinth: new Color('#E9E5DC'),
  white: new Color('#FFFFFF'),
  ink: new Color('#1B1E27'),
  graphite: new Color('#8A8F9A'),
  steel: new Color('#C9CCD3'),
  signal: new Color('#E5452C'),
  cobalt: new Color('#2F4BFF'),
  emerald: new Color('#10B981'),
  groove: new Color('#DCD7CC'),
};

export const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.05, ...o });
export const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, r);

export function createStage(canvas, opts = {}) {
  const {
    compact = false,
    reducedMotion = false,
    onLabels,
    cameraPos = [6.5, 8.6, 11.5],
    lookAt = [0, -0.35, 0],
    fit = { min: 7, k: 11.7 },
    sunPos = [-4, 11, 6],
  } = opts;

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const scene = new Scene();
  const camera = new OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
  camera.position.set(...cameraPos);
  camera.lookAt(...lookAt);

  scene.add(new HemisphereLight(0xffffff, 0xe9e5dc, 1.35));
  const sun = new DirectionalLight(0xffffff, 2.1);
  sun.position.set(...sunPos);
  sun.castShadow = true;
  sun.shadow.mapSize.set(compact ? 1024 : 2048, compact ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 34 });
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);

  const world = new Group();
  scene.add(world);

  const ground = new Mesh(new PlaneGeometry(40, 40), new ShadowMaterial({ opacity: 0.1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.95;
  ground.receiveShadow = true;
  world.add(ground);

  // ── registry ─────────────────────────────────────────────────────────────
  const hoverables = [];
  const anchors = [];
  const updaters = [];
  const clickers = [];
  const shadowAll = (o) =>
    o.traverse((m) => {
      if (m.isMesh && !m.userData.noShadow) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });

  /** Register an interactive part (lifts on hover). Label options: { offset, below, tone, hoverOnly, text } */
  function register(group, id, label = {}) {
    shadowAll(group);
    if (!group.parent) world.add(group);
    const h = { group, id, baseY: group.position.y, lift: 0, onClick: label.onClick };
    hoverables.push(h);
    if (label.text !== null) {
      anchors.push({
        id,
        text: label.text ?? id,
        obj: group,
        offset: label.offset ?? new Vector3(0, 1.2, 0),
        below: !!label.below,
        tone: label.tone ?? 'ink',
        hoverOnly: !!label.hoverOnly,
        h,
      });
    }
    return h;
  }
  function anchor(obj, id, label = {}) {
    anchors.push({ id, text: label.text ?? id, obj, offset: label.offset ?? new Vector3(), below: !!label.below, tone: label.tone ?? 'ink', hoverOnly: !!label.hoverOnly });
  }
  const onUpdate = (fn) => updaters.push(fn);
  const onClick = (fn) => clickers.push(fn);

  // ── interaction ──────────────────────────────────────────────────────────
  const ray = new Raycaster();
  const ndc = new Vector2(5, 5);
  const pointer = { nx: 0, ny: 0, inside: false };
  let hovered = null;
  let scroll = 0;

  function pickHover() {
    if (!pointer.inside || !hoverables.length) return null;
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(
      hoverables.map((h) => h.group),
      true
    );
    if (!hits.length) return null;
    let o = hits[0].object;
    while (o && !hoverables.some((h) => h.group === o)) o = o.parent;
    return hoverables.find((h) => h.group === o) || null;
  }

  // ── layout ───────────────────────────────────────────────────────────────
  let W = 1;
  let H = 1;
  function resize() {
    W = canvas.clientWidth || 1;
    H = canvas.clientHeight || 1;
    renderer.setSize(W, H, false);
    const aspect = W / H;
    const h = Math.max(fit.min, fit.k / aspect);
    camera.left = (-h * aspect) / 2;
    camera.right = (h * aspect) / 2;
    camera.top = h / 2;
    camera.bottom = -h / 2;
    camera.updateProjectionMatrix();
  }

  // ── loop ─────────────────────────────────────────────────────────────────
  const tmp = new Vector3();
  const rot = { y: 0, x: 0 };
  const state = { time: 0, dt: 0, scroll: 0, hovered: null };
  let raf = 0;
  let last = 0;
  let running = false;

  function step(dt) {
    state.time += dt;
    state.dt = dt;
    state.scroll = scroll;
    const ty = Math.sin(state.time * 0.25) * 0.05 + pointer.nx * 0.14 + scroll * 0.45;
    const tx = pointer.ny * 0.045;
    rot.y += (ty - rot.y) * Math.min(1, dt * 3);
    rot.x += (tx - rot.x) * Math.min(1, dt * 3);
    world.rotation.y = rot.y;
    world.rotation.x = rot.x;
    world.position.y = -scroll * 0.8;

    const h = pickHover();
    if (h !== hovered) {
      hovered = h;
      canvas.style.cursor = h ? 'pointer' : 'grab';
    }
    state.hovered = hovered;
    hoverables.forEach((o) => {
      const target = o === hovered ? 0.26 : 0;
      o.lift += (target - o.lift) * Math.min(1, dt * 10);
      o.group.position.y = o.baseY + o.lift;
    });
    updaters.forEach((fn) => fn(state));
  }

  function emitLabels() {
    if (!onLabels) return;
    const out = anchors.map((a) => {
      a.obj.getWorldPosition(tmp);
      tmp.add(a.offset);
      tmp.project(camera);
      const active = a.h ? a.h === hovered : false;
      return {
        id: a.id,
        text: a.text,
        x: (tmp.x * 0.5 + 0.5) * W,
        y: (-tmp.y * 0.5 + 0.5) * H,
        active,
        visible: a.hoverOnly ? active : true,
        below: a.below,
        tone: a.tone,
      };
    });
    onLabels(out);
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    step(dt);
    renderer.render(scene, camera);
    emitLabels();
    if (running) raf = requestAnimationFrame(frame);
  }

  const api = {
    start() {
      if (reducedMotion || running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    resize() {
      resize();
      renderer.render(scene, camera);
      emitLabels();
    },
    pointer(x, y, nx, ny, inside) {
      ndc.set((x / W) * 2 - 1, -(y / H) * 2 + 1);
      pointer.nx = nx;
      pointer.ny = ny;
      pointer.inside = inside;
    },
    click() {
      if (hovered) {
        hovered.lift = 0.55;
        hovered.onClick?.(state);
      }
      clickers.forEach((fn) => fn(state, hovered));
      if (!running) {
        step(0.016);
        renderer.render(scene, camera);
        emitLabels();
      }
    },
    setScroll(v) {
      scroll = v;
    },
    dispose() {
      api.stop();
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
          m.map?.dispose?.();
          m.dispose();
        });
      });
      renderer.dispose();
    },
    /** call once the builder has added everything */
    ready() {
      resize();
      step(0.016);
      renderer.render(scene, camera);
      emitLabels();
    },
  };

  return { renderer, scene, camera, world, register, anchor, onUpdate, onClick, api, state, PALETTE, compact };
}

/** The shared rounded paper plinth. */
export function addPlinth(world, w, d) {
  const base = new Mesh(rbox(w + 0.4, 0.36, d + 0.4, 0.16, 4), std(PALETTE.plinth, { roughness: 0.9 }));
  base.position.y = -0.72;
  base.castShadow = true;
  base.receiveShadow = true;
  world.add(base);
  const top = new Mesh(rbox(w, 0.5, d, 0.22, 5), std(PALETTE.paper, { roughness: 0.88 }));
  top.position.y = -0.25;
  top.castShadow = true;
  top.receiveShadow = true;
  world.add(top);
  return top;
}
