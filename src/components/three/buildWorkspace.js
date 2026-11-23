// ─────────────────────────────────────────────────────────────────────────────
// Hero — "the workspace": an isometric engineer's desk, fully simulated.
//   monitor    · live-typed FastAPI code
//   laptop     · uvicorn terminal streaming request logs
//   server     · blinking status LEDs
//   wall frame · the IEEE ICCUBEA 2026 paper
//   shelf      · books        mug · rising steam        lamp · click to toggle
// Hovering any object lifts it and shows a tooltip; clicks trigger small
// reactions (typing burst, steam puff, lamp switch).
// ─────────────────────────────────────────────────────────────────────────────
import {
  CanvasTexture,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
} from 'three';
import { addPlinth, createStage, PALETTE as C, rbox, std } from './stage';

const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';

// ── Canvas-texture screens ──────────────────────────────────────────────────
const CODE = [
  [['k', 'from '], ['t', 'fastapi '], ['k', 'import '], ['t', 'FastAPI']],
  [['k', 'from '], ['t', 'app.llm '], ['k', 'import '], ['t', 'gemini']],
  [],
  [['t', 'app = FastAPI()']],
  [],
  [['d', '@app.post'], ['t', '('], ['s', '"/ask"'], ['t', ')']],
  [['k', 'async def '], ['f', 'ask'], ['t', '(q: Query):']],
  [['t', '    ctx = '], ['k', 'await '], ['t', 'memory.get(q.session)']],
  [['t', '    ans = '], ['k', 'await '], ['t', 'gemini.generate(q.text, ctx)']],
  [['t', '    '], ['k', 'await '], ['t', 'memory.save(q.session, ans)']],
  [['t', '    '], ['k', 'return '], ['t', '{'], ['s', '"answer"'], ['t', ': ans}']],
];
const CODE_COLORS = { k: '#8EA2FF', t: '#E7E9EE', s: '#F4A582', d: '#EE6A52', f: '#7FE0B5', c: '#6B7280' };
const CODE_LEN = CODE.reduce((n, l) => n + l.reduce((m, [, s]) => m + s.length, 0) + 1, 0);

function makeEditor() {
  const cv = document.createElement('canvas');
  cv.width = 1024;
  cv.height = 600;
  const g = cv.getContext('2d');
  const tex = new CanvasTexture(cv);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  let shown = -1;
  const draw = (chars, blink) => {
    if (chars === shown && !blink) return;
    shown = chars;
    g.fillStyle = '#12151C';
    g.fillRect(0, 0, 1024, 600);
    // title bar
    g.fillStyle = '#1B1F29';
    g.fillRect(0, 0, 1024, 54);
    ['#EE6A52', '#F4C152', '#4ADE80'].forEach((c, i) => {
      g.fillStyle = c;
      g.beginPath();
      g.arc(30 + i * 26, 27, 8, 0, 7);
      g.fill();
    });
    g.fillStyle = '#9AA1AE';
    g.font = `500 22px ${MONO}`;
    g.fillText('main.py — FastAPI', 120, 35);
    g.font = `500 27px ${MONO}`;
    let left = chars;
    let cx = 0;
    let cy = 0;
    CODE.forEach((line, li) => {
      const y = 100 + li * 44;
      g.fillStyle = '#4B5262';
      g.fillText(String(li + 1).padStart(2, ' '), 18, y);
      let x = 78;
      for (const [k, s] of line) {
        if (left <= 0) break;
        const part = s.slice(0, left);
        g.fillStyle = CODE_COLORS[k];
        g.fillText(part, x, y);
        x += g.measureText(part).width;
        left -= part.length;
      }
      if (left > 0) {
        left -= 1;
        cx = x;
        cy = y;
      } else if (left === 0 && cy === 0) {
        cx = x;
        cy = y;
      }
    });
    if (blink) {
      g.fillStyle = '#E5452C';
      g.fillRect(cx + 2, cy - 22, 3, 28);
    }
    tex.needsUpdate = true;
  };
  return { tex, draw };
}

const LOG = [
  ['$', 'uvicorn main:app --reload'],
  ['i', 'Uvicorn running on http://127.0.0.1:8000'],
  ['i', 'Application startup complete.'],
  ['r', 'POST /ask            200 OK'],
  ['r', 'GET  /health         200 OK'],
  ['r', 'POST /ask            200 OK'],
  ['r', 'POST /sql/generate   200 OK'],
  ['r', 'POST /ask            200 OK'],
];
function makeTerminal() {
  const cv = document.createElement('canvas');
  cv.width = 768;
  cv.height = 480;
  const g = cv.getContext('2d');
  const tex = new CanvasTexture(cv);
  tex.colorSpace = SRGBColorSpace;
  let shown = -1;
  const draw = (n) => {
    if (n === shown) return;
    shown = n;
    g.fillStyle = '#0F1218';
    g.fillRect(0, 0, 768, 480);
    g.font = `500 25px ${MONO}`;
    const lines = [];
    for (let i = 0; i < n; i++) lines.push(LOG[i < 3 ? i : 3 + ((i - 3) % (LOG.length - 3))]);
    lines.slice(-10).forEach(([k, s], i) => {
      const y = 50 + i * 42;
      if (k === '$') {
        g.fillStyle = '#7FE0B5';
        g.fillText('$ ', 24, y);
        g.fillStyle = '#E7E9EE';
        g.fillText(s, 58, y);
      } else {
        g.fillStyle = k === 'i' ? '#7FE0B5' : '#8EA2FF';
        g.fillText('INFO', 24, y);
        g.fillStyle = '#C9CDD6';
        g.fillText(':  ' + s, 96, y);
      }
    });
    tex.needsUpdate = true;
  };
  return { tex, draw };
}

function makePaper() {
  const cv = document.createElement('canvas');
  cv.width = 420;
  cv.height = 560;
  const g = cv.getContext('2d');
  g.fillStyle = '#FFFFFF';
  g.fillRect(0, 0, 420, 560);
  g.fillStyle = '#E5452C';
  g.fillRect(36, 40, 70, 10);
  g.fillStyle = '#1B1E27';
  g.font = `700 30px ${MONO}`;
  g.fillText('IEEE', 36, 100);
  g.font = `500 20px ${MONO}`;
  g.fillStyle = '#555B67';
  g.fillText('ICCUBEA 2026', 36, 132);
  g.fillStyle = '#1B1E27';
  g.font = `700 26px ${MONO}`;
  g.fillText('FedShield', 36, 196);
  g.fillStyle = '#C9CCD3';
  for (let i = 0; i < 9; i++) g.fillRect(36, 232 + i * 30, i % 3 === 2 ? 220 : 340, 9);
  g.fillStyle = '#2F4BFF';
  g.fillRect(36, 512, 140, 8);
  const tex = new CanvasTexture(cv);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

export function buildWorkspace(canvas, opts) {
  const S = createStage(canvas, { ...opts, cameraPos: [9.5, 8.4, 10.5], lookAt: [-0.55, 1.05, -0.75], fit: { min: 6.6, k: 9.7 }, sunPos: [-2, 12, 8] });
  const { world } = S;
  addPlinth(world, 7.6, 6.2);

  const wallMat = std(new Color('#F3F0E9'), { roughness: 0.95 });
  // walls (back + left), with a soft top trim
  const back = new Mesh(rbox(7.6, 3.4, 0.2, 0.06), wallMat);
  back.position.set(0, 1.7, -3.0);
  back.receiveShadow = true;
  world.add(back);
  const left = new Mesh(rbox(0.2, 3.4, 6.2, 0.06), wallMat);
  left.position.set(-3.7, 1.7, 0);
  left.receiveShadow = true;
  world.add(left);
  const trim = std(new Color('#E6E1D7'), { roughness: 0.9 });
  const t1 = new Mesh(rbox(7.6, 0.1, 0.26, 0.04), trim);
  t1.position.set(0, 0.05, -2.87);
  world.add(t1);
  const t2 = new Mesh(rbox(0.26, 0.1, 6.2, 0.04), trim);
  t2.position.set(-3.57, 0.05, 0);
  world.add(t2);

  // rug
  const rug = new Mesh(rbox(3.4, 0.03, 2.4, 0.012), std(new Color('#F4E1D9'), { roughness: 1 }));
  rug.position.set(-0.3, 0.015, -0.35);
  rug.receiveShadow = true;
  world.add(rug);

  // window on the back wall
  {
    const frame = new Mesh(rbox(2.1, 1.5, 0.08, 0.04), std(C.white, { roughness: 0.5 }));
    frame.position.set(2.1, 2.05, -2.87);
    world.add(frame);
    const glass = new Mesh(new PlaneGeometry(1.9, 1.3), new MeshStandardMaterial({ color: new Color('#DCE4FF'), emissive: new Color('#C9D4FF'), emissiveIntensity: 0.35, roughness: 0.2 }));
    glass.position.set(2.1, 2.05, -2.82);
    glass.userData.noShadow = true;
    world.add(glass);
    const sun = new Mesh(new SphereGeometry(0.16, 24, 16), new MeshBasicMaterial({ color: new Color('#F4A582') }));
    sun.position.set(2.6, 2.35, -2.81);
    sun.scale.z = 0.05;
    world.add(sun);
    const mullionV = new Mesh(rbox(0.05, 1.3, 0.05, 0.02), std(C.white));
    mullionV.position.set(2.1, 2.05, -2.8);
    world.add(mullionV);
    const mullionH = new Mesh(rbox(1.9, 0.05, 0.05, 0.02), std(C.white));
    mullionH.position.set(2.1, 2.05, -2.8);
    world.add(mullionH);
  }

  // framed IEEE paper on the back wall
  const paper = new Group();
  {
    const fr = new Mesh(rbox(0.95, 1.22, 0.06, 0.03), std(C.ink, { roughness: 0.4 }));
    paper.add(fr);
    const pg = new Mesh(new PlaneGeometry(0.82, 1.09), new MeshStandardMaterial({ map: makePaper(), roughness: 0.6 }));
    pg.position.z = 0.035;
    pg.userData.noShadow = true;
    paper.add(pg);
    paper.position.set(-3.57, 2.05, 0.85);
    paper.rotation.y = Math.PI / 2;
  }
  S.register(paper, 'paper', { text: 'Published · IEEE ICCUBEA 2026', hoverOnly: true, offset: new Vector3(0.3, 0.75, 0) });

  // shelf + books on the left wall
  const shelf = new Group();
  {
    const board = new Mesh(rbox(0.55, 0.07, 2.2, 0.02), std(C.white, { roughness: 0.6 }));
    shelf.add(board);
    const cols = [C.ink, C.signal, C.paper, C.cobalt, new Color('#9DB59A'), C.ink, new Color('#F4A582')];
    let z = -0.95;
    cols.forEach((c, i) => {
      const h = 0.42 + ((i * 7) % 4) * 0.06;
      const w = 0.12 + ((i * 3) % 3) * 0.03;
      const b = new Mesh(rbox(0.36, h, w, 0.015), std(c, { roughness: 0.7 }));
      b.position.set(0, 0.035 + h / 2, z + w / 2);
      if (i === 5) {
        b.rotation.x = 0.35;
        b.position.y -= 0.02;
      }
      shelf.add(b);
      z += w + 0.025;
    });
    shelf.position.set(-3.33, 2.2, -1.0);
  }
  S.register(shelf, 'shelf', { text: 'Always learning', hoverOnly: true, offset: new Vector3(0, 0.85, 0) });

  // desk
  const DY = 1.25;
  const desk = new Group();
  {
    const top = new Mesh(rbox(4.0, 0.12, 1.55, 0.04), std(new Color('#E8DCCB'), { roughness: 0.75 }));
    top.position.y = DY;
    desk.add(top);
    const legMat = std(C.ink, { roughness: 0.4, metalness: 0.4 });
    for (const [x, z] of [[-1.85, -0.62], [1.85, -0.62], [-1.85, 0.62], [1.85, 0.62]]) {
      const leg = new Mesh(new CylinderGeometry(0.045, 0.045, DY, 12), legMat);
      leg.position.set(x, DY / 2, z);
      desk.add(leg);
    }
    desk.position.set(-0.5, 0, -2.0);
    world.add(desk);
    desk.traverse((m) => m.isMesh && ((m.castShadow = true), (m.receiveShadow = true)));
  }

  // monitor with live code
  const editor = makeEditor();
  const monitor = new Group();
  {
    const neck = new Mesh(rbox(0.12, 0.55, 0.08, 0.03), std(C.ink, { roughness: 0.4 }));
    neck.position.y = 0.3;
    monitor.add(neck);
    const foot = new Mesh(rbox(0.6, 0.04, 0.32, 0.02), std(C.ink, { roughness: 0.4 }));
    foot.position.y = 0.02;
    monitor.add(foot);
    const shell = new Mesh(rbox(2.05, 1.22, 0.08, 0.04), std(C.ink, { roughness: 0.35, metalness: 0.2 }));
    shell.position.y = 1.08;
    monitor.add(shell);
    const scr = new Mesh(new PlaneGeometry(1.92, 1.1), new MeshBasicMaterial({ map: editor.tex, toneMapped: false }));
    scr.position.set(0, 1.08, 0.045);
    scr.userData.noShadow = true;
    monitor.add(scr);
    monitor.position.set(-0.75, DY + 0.06, -2.35);
  }
  let typed = 0;
  let typingBoost = 0;
  S.register(monitor, 'monitor', { text: 'FastAPI · Python', hoverOnly: true, offset: new Vector3(0, 1.95, 0), onClick: () => (typingBoost = 1) });

  // laptop with terminal
  const term = makeTerminal();
  const laptop = new Group();
  {
    const base = new Mesh(rbox(1.0, 0.05, 0.7, 0.02), std(C.white, { roughness: 0.4 }));
    base.position.y = 0.03;
    laptop.add(base);
    const lid = new Group();
    lid.position.set(0, 0.05, -0.33);
    lid.rotation.x = -0.28;
    const shellL = new Mesh(rbox(1.0, 0.66, 0.04, 0.02), std(C.white, { roughness: 0.4 }));
    shellL.position.y = 0.33;
    lid.add(shellL);
    const scrL = new Mesh(new PlaneGeometry(0.92, 0.58), new MeshBasicMaterial({ map: term.tex, toneMapped: false }));
    scrL.position.set(0, 0.33, 0.022);
    scrL.userData.noShadow = true;
    lid.add(scrL);
    laptop.add(lid);
    laptop.position.set(0.95, DY + 0.06, -1.9);
    laptop.rotation.y = -0.45;
  }
  let logs = 3;
  S.register(laptop, 'laptop', { text: 'Live APIs · uvicorn', hoverOnly: true, offset: new Vector3(0, 1.0, 0), onClick: () => (logs += 2) });

  // keyboard
  {
    const kb = new Mesh(rbox(1.25, 0.04, 0.4, 0.02), std(C.white, { roughness: 0.5 }));
    kb.position.set(-0.75, DY + 0.08, -1.65);
    kb.castShadow = true;
    world.add(kb);
    const keys = new Mesh(new PlaneGeometry(1.15, 0.32), new MeshStandardMaterial({ color: new Color('#E9EBF0'), roughness: 0.6 }));
    keys.rotation.x = -Math.PI / 2;
    keys.position.set(-0.75, DY + 0.105, -1.65);
    keys.userData.noShadow = true;
    world.add(keys);
  }

  // mug + steam
  const mug = new Group();
  {
    const cup = new Mesh(new CylinderGeometry(0.15, 0.13, 0.3, 32), std(C.signal, { roughness: 0.45 }));
    cup.position.y = 0.15;
    mug.add(cup);
    const handle = new Mesh(new TorusGeometry(0.09, 0.025, 8, 24), std(C.signal, { roughness: 0.45 }));
    handle.position.set(0.17, 0.16, 0);
    mug.add(handle);
    const coffee = new Mesh(new CylinderGeometry(0.13, 0.13, 0.01, 32), std(new Color('#5B3A29'), { roughness: 0.3 }));
    coffee.position.y = 0.285;
    mug.add(coffee);
    mug.position.set(0.25, DY + 0.06, -1.45);
  }
  const steam = [];
  for (let i = 0; i < 7; i++) {
    const s = new Mesh(new SphereGeometry(0.06, 12, 8), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
    s.userData.noShadow = true;
    s.userData.t = i / 7;
    world.add(s);
    steam.push(s);
  }
  let puff = 0;
  S.register(mug, 'mug', { text: 'Fuel', hoverOnly: true, offset: new Vector3(0, 0.9, 0), onClick: () => (puff = 1) });

  // desk lamp
  const lamp = new Group();
  const bulbMat = new MeshBasicMaterial({ color: new Color('#FFE7B8') });
  const lampLight = new PointLight(0xffd59a, 6, 4.5, 1.6);
  let lampOn = true;
  {
    const lm = std(C.ink, { roughness: 0.35, metalness: 0.3 });
    const base = new Mesh(new CylinderGeometry(0.22, 0.24, 0.05, 32), lm);
    base.position.y = 0.03;
    lamp.add(base);
    const arm1 = new Mesh(new CylinderGeometry(0.025, 0.025, 0.85, 12), lm);
    arm1.position.set(0, 0.45, 0);
    arm1.rotation.z = 0.2;
    lamp.add(arm1);
    const arm2 = new Mesh(new CylinderGeometry(0.025, 0.025, 0.6, 12), lm);
    arm2.position.set(0.22, 0.9, 0);
    arm2.rotation.z = -1.05;
    lamp.add(arm2);
    const head = new Mesh(new ConeGeometry(0.2, 0.3, 32, 1, true), lm);
    head.position.set(0.5, 0.95, 0);
    head.rotation.z = 2.4;
    lamp.add(head);
    const bulb = new Mesh(new SphereGeometry(0.075, 16, 12), bulbMat);
    bulb.position.set(0.56, 0.88, 0);
    bulb.userData.noShadow = true;
    lamp.add(bulb);
    lampLight.position.set(0.6, 0.75, 0);
    lamp.add(lampLight);
    lamp.position.set(-2.15, DY + 0.06, -2.25);
    lamp.rotation.y = -0.5;
  }
  S.register(lamp, 'lamp', {
    text: 'Click · lights',
    hoverOnly: true,
    offset: new Vector3(0, 1.4, 0),
    onClick: () => {
      lampOn = !lampOn;
    },
  });

  // plant
  const plant = new Group();
  {
    const pot = new Mesh(new CylinderGeometry(0.36, 0.28, 0.6, 32), std(new Color('#E9D8C4'), { roughness: 0.85 }));
    pot.position.y = 0.3;
    plant.add(pot);
    const soil = new Mesh(new CylinderGeometry(0.33, 0.33, 0.03, 32), std(new Color('#5B4636'), { roughness: 1 }));
    soil.position.y = 0.59;
    plant.add(soil);
    const leafMat = std(new Color('#8FB08B'), { roughness: 0.7 });
    const leafMat2 = std(new Color('#6E9470'), { roughness: 0.7 });
    for (let i = 0; i < 9; i++) {
      const leaf = new Mesh(new SphereGeometry(0.16, 16, 12), i % 2 ? leafMat : leafMat2);
      const a = (i / 9) * Math.PI * 2;
      leaf.scale.set(0.55, 1.9, 0.3);
      leaf.position.set(Math.cos(a) * 0.17, 0.95 + (i % 3) * 0.12, Math.sin(a) * 0.17);
      leaf.rotation.set(Math.sin(a) * 0.6, a, -Math.cos(a) * 0.6);
      plant.add(leaf);
    }
    plant.position.set(-2.85, 0, 1.75);
  }
  S.register(plant, 'plant', { text: 'Growing every day', hoverOnly: true, offset: new Vector3(0, 1.75, 0) });

  // server tower
  const server = new Group();
  const leds = [];
  {
    const box = new Mesh(rbox(0.75, 1.55, 1.05, 0.06), std(C.white, { roughness: 0.45 }));
    box.position.y = 0.78;
    server.add(box);
    const face = new Mesh(rbox(0.04, 1.3, 0.85, 0.02), std(C.ink, { roughness: 0.4 }));
    face.position.set(0.38, 0.78, 0);
    server.add(face);
    for (let i = 0; i < 6; i++) {
      for (let k = 0; k < 2; k++) {
        const led = new Mesh(new SphereGeometry(0.035, 10, 8), new MeshBasicMaterial({ color: k ? C.cobalt : C.emerald }));
        led.position.set(0.41, 0.3 + i * 0.18, -0.25 + k * 0.12);
        led.userData.noShadow = true;
        led.userData.phase = Math.random() * 6;
        server.add(led);
        leds.push(led);
      }
      const slot = new Mesh(rbox(0.01, 0.05, 0.4, 0.01), std(C.graphite));
      slot.position.set(0.41, 0.3 + i * 0.18, 0.15);
      server.add(slot);
    }
    server.position.set(2.65, 0, -2.2);
  }
  S.register(server, 'server', { text: 'Backend systems', hoverOnly: true, offset: new Vector3(0, 2.0, 0) });

  // chair
  {
    const chair = new Group();
    const cm = std(C.ink, { roughness: 0.5 });
    const seat = new Mesh(rbox(0.9, 0.12, 0.85, 0.05), std(new Color('#2A3352'), { roughness: 0.7 }));
    seat.position.y = 0.78;
    chair.add(seat);
    const backrest = new Mesh(rbox(0.85, 0.85, 0.1, 0.05), std(new Color('#2A3352'), { roughness: 0.7 }));
    backrest.position.set(0, 1.3, 0.42);
    backrest.rotation.x = 0.12;
    chair.add(backrest);
    const pole = new Mesh(new CylinderGeometry(0.05, 0.05, 0.62, 12), cm);
    pole.position.y = 0.42;
    chair.add(pole);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const legC = new Mesh(rbox(0.5, 0.05, 0.08, 0.02), cm);
      legC.position.set(Math.cos(a) * 0.25, 0.1, Math.sin(a) * 0.25);
      legC.rotation.y = -a;
      chair.add(legC);
      const wheel = new Mesh(new SphereGeometry(0.06, 12, 8), cm);
      wheel.position.set(Math.cos(a) * 0.48, 0.06, Math.sin(a) * 0.48);
      chair.add(wheel);
    }
    chair.position.set(-0.6, 0, -0.5);
    chair.rotation.y = 0.35;
    chair.traverse((m) => m.isMesh && ((m.castShadow = true), (m.receiveShadow = true)));
    world.add(chair);
  }

  // ── simulation ───────────────────────────────────────────────────────────
  let typeClock = 0;
  let logClock = 0;
  const mugPos = new Vector3();
  S.onUpdate(({ time, dt }) => {
    // code typing loop (with a pause when complete)
    typeClock += dt * (22 + typingBoost * 120);
    typingBoost *= Math.exp(-dt * 1.5);
    const cycle = CODE_LEN + 60;
    typed = Math.floor(typeClock) % cycle;
    editor.draw(Math.min(typed, CODE_LEN), Math.sin(time * 6) > 0);
    // terminal logs
    logClock += dt;
    if (logClock > 1.4) {
      logClock = 0;
      logs += 1;
      if (logs > 60) logs = 3;
    }
    term.draw(logs);
    // LEDs
    leds.forEach((l) => (l.visible = Math.sin(time * 3.2 + l.userData.phase * 3) > -0.5));
    // lamp
    const k = lampOn ? 1 : 0;
    lampLight.intensity += (k * 6 - lampLight.intensity) * Math.min(1, dt * 8);
    bulbMat.color.setRGB(lampOn ? 1 : 0.55, lampOn ? 0.9 : 0.55, lampOn ? 0.72 : 0.55);
    // steam
    puff *= Math.exp(-dt * 0.8);
    mug.getWorldPosition(mugPos);
    steam.forEach((s) => {
      s.userData.t = (s.userData.t + dt * (0.28 + puff * 0.6)) % 1;
      const t = s.userData.t;
      s.position.set(mugPos.x + Math.sin(t * 9 + time) * 0.05, mugPos.y + 0.35 + t * (0.9 + puff * 0.6), mugPos.z + Math.cos(t * 7) * 0.04);
      s.scale.setScalar(0.6 + t * 1.6 + puff * 0.6);
      s.material.opacity = Math.sin(t * Math.PI) * (0.55 + puff * 0.35);
    });
  });

  S.api.ready();
  return S.api;
}
