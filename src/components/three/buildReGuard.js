// ─────────────────────────────────────────────────────────────────────────────
// ReGuard-FL — the update ledger, simulated (from the project README).
//   clients → updates travel a track through the lifecycle gates:
//   Upload (resumable) → Integrity → Guardian v2 → Eligible → Aggregate (ledger)
//   · some uploads are interrupted: LAUR-FL resumes them (amber pause) or drops
//     them when the expected value is not positive
//   · Guardian v2 diverts malicious updates into the reject bin
//   · each accepted update is written to the ledger exactly once (a new slab)
// ─────────────────────────────────────────────────────────────────────────────
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
  Vector3,
} from 'three';
import { addPlinth, createStage, PALETTE as C, rbox, std } from './stage';

const AMBER = new Color('#F4B740');

export function buildReGuard(canvas, opts) {
  const emit = opts.onEvent || (() => {});
  const S = createStage(canvas, { ...opts, cameraPos: [0.9, 9.2, 9.6], lookAt: [-0.35, 0.1, 0.3], fit: { min: 5.9, k: 11.2 } });
  const { world } = S;
  const PW = 10;
  const PD = 5.6;
  addPlinth(world, PW, PD);

  // engraved grid
  {
    const pts = [];
    for (let x = -PW / 2 + 0.6; x <= PW / 2 - 0.6 + 1e-6; x += 0.6) pts.push(x, 0.002, -PD / 2 + 0.4, x, 0.002, PD / 2 - 0.4);
    for (let z = -PD / 2 + 0.4; z <= PD / 2 - 0.4 + 1e-6; z += 0.6) pts.push(-PW / 2 + 0.6, 0.002, z, PW / 2 - 0.6, 0.002, z);
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(pts, 3));
    world.add(new LineSegments(g, new LineBasicMaterial({ color: 0x101217, transparent: true, opacity: 0.05 })));
  }

  // ── track ────────────────────────────────────────────────────────────────
  const X0 = -3.6;
  const XEND = 3.35;
  const track = new Mesh(rbox(XEND - X0 + 0.9, 0.08, 0.9, 0.04), std(new Color('#EFECE6'), { roughness: 0.8 }));
  track.position.set((X0 + XEND) / 2, 0.04, 0);
  track.receiveShadow = true;
  world.add(track);
  const lane = new Mesh(new PlaneGeometry(XEND - X0 + 0.6, 0.06), new MeshBasicMaterial({ color: C.ink, transparent: true, opacity: 0.12 }));
  lane.rotation.x = -Math.PI / 2;
  lane.position.set((X0 + XEND) / 2, 0.085, 0);
  world.add(lane);

  // ── clients feeding the track ────────────────────────────────────────────
  const client = () => {
    const g = new Group();
    const b = new Mesh(rbox(0.8, 0.05, 0.56, 0.02), std(C.white));
    b.position.y = 0.03;
    g.add(b);
    const lid = new Group();
    lid.position.set(0, 0.05, -0.26);
    lid.rotation.x = -0.3;
    const sh = new Mesh(rbox(0.8, 0.52, 0.04, 0.02), std(C.white));
    sh.position.y = 0.26;
    lid.add(sh);
    const scr = new Mesh(new PlaneGeometry(0.72, 0.44), new MeshStandardMaterial({ color: new Color('#DCE2FF'), emissive: C.cobalt, emissiveIntensity: 0.15 }));
    scr.position.set(0, 0.26, 0.022);
    lid.add(scr);
    g.add(lid);
    return g;
  };
  [[-4.4, -1.3], [-4.5, 0], [-4.4, 1.3]].forEach(([x, z], i) => {
    const c = client();
    c.position.set(x, 0, z);
    c.rotation.y = Math.PI / 2 - z * 0.3;
    S.register(c, `client-${i}`, i === 0 ? { text: 'Clients', offset: new Vector3(0, 0.95, 0) } : { text: null });
  });

  // ── gates ────────────────────────────────────────────────────────────────
  const GATES = [
    { x: -2.5, id: 'Upload', band: C.cobalt },
    { x: -1.0, id: 'Integrity', band: C.cobalt },
    { x: 0.5, id: 'Guardian v2', band: C.signal },
    { x: 2.0, id: 'Eligible', band: C.cobalt },
  ];
  const gateLeds = [];
  let scanner;
  GATES.forEach((gd, i) => {
    const g = new Group();
    const post = std(C.white, { roughness: 0.5 });
    for (const z of [-0.62, 0.62]) {
      const p = new Mesh(rbox(0.16, 1.15, 0.16, 0.05), post);
      p.position.set(0, 0.58, z);
      g.add(p);
    }
    const top = new Mesh(rbox(0.22, 0.16, 1.44, 0.05), post);
    top.position.y = 1.22;
    g.add(top);
    const band = new Mesh(rbox(0.24, 0.06, 1.46, 0.03), new MeshStandardMaterial({ color: gd.band, emissive: gd.band, emissiveIntensity: 0.45, roughness: 0.4 }));
    band.position.y = 1.32;
    g.add(band);
    const ledMat = new MeshBasicMaterial({ color: C.emerald });
    const led = new Mesh(new SphereGeometry(0.06, 12, 8), ledMat);
    led.position.set(0.12, 1.22, 0.55);
    led.userData.noShadow = true;
    g.add(led);
    gateLeds.push({ led, mat: ledMat, flash: 0, bad: 0 });
    if (gd.id === 'Integrity') {
      scanner = new Mesh(new PlaneGeometry(1.1, 0.05), new MeshBasicMaterial({ color: C.cobalt, transparent: true, opacity: 0.55 }));
      scanner.rotation.y = Math.PI / 2;
      scanner.userData.noShadow = true;
      g.add(scanner);
    }
    g.position.set(gd.x, 0, 0);
    S.register(g, gd.id, {
      text: `${i + 1} · ${gd.id}`,
      tone: gd.id === 'Guardian v2' ? 'signal' : 'ink',
      offset: new Vector3(0, 1.55, 0),
    });
  });

  // ── reject bin (Guardian v2) ─────────────────────────────────────────────
  const bin = new Group();
  {
    const binMat = std(new Color('#FCE3DD'), { roughness: 0.6 });
    const floor = new Mesh(rbox(1.1, 0.06, 0.9, 0.03), binMat);
    floor.position.y = 0.03;
    bin.add(floor);
    for (const [w, d, x, z] of [[1.1, 0.06, 0, -0.42], [1.1, 0.06, 0, 0.42], [0.06, 0.9, -0.52, 0], [0.06, 0.9, 0.52, 0]]) {
      const wall = new Mesh(rbox(w, 0.34, d, 0.02), binMat);
      wall.position.set(x, 0.2, z);
      bin.add(wall);
    }
    bin.position.set(0.5, 0, 1.9);
  }
  S.register(bin, 'Rejected', { text: 'Rejected', tone: 'signal', offset: new Vector3(0, 0, 0.6), below: true });

  // ── ledger (aggregate, exactly-once) ─────────────────────────────────────
  const ledger = new Group();
  const base = new Mesh(rbox(1.2, 0.12, 1.2, 0.05), std(C.ink, { roughness: 0.35, metalness: 0.3 }));
  base.position.y = 0.06;
  ledger.add(base);
  const slabs = [];
  const slabGeo = rbox(1.0, 0.1, 1.0, 0.04);
  for (let i = 0; i < 9; i++) {
    const m = new Mesh(slabGeo, new MeshStandardMaterial({ color: i % 2 ? new Color('#F7F5F0') : C.white, roughness: 0.45, transparent: true }));
    m.position.y = 0.18 + i * 0.12;
    m.visible = false;
    ledger.add(m);
    slabs.push(m);
  }
  const topLight = new Mesh(rbox(1.04, 0.03, 1.04, 0.015), new MeshStandardMaterial({ color: C.emerald, emissive: C.emerald, emissiveIntensity: 0.6 }));
  ledger.add(topLight);
  ledger.position.set(3.35, 0, 0);
  S.register(ledger, 'Aggregate', { text: '5 · Ledger', offset: new Vector3(0, 1.55, 0) });
  let written = 0;
  let pulse = 0;

  // ── update cubes ─────────────────────────────────────────────────────────
  const cubeGeo = rbox(0.34, 0.34, 0.34, 0.06);
  const cubes = [];
  const lanesZ = [-1.35, 0, 1.35];
  const kinds = ['ok', 'ok', 'interrupt', 'ok', 'bad', 'ok', 'drop', 'ok', 'interrupt', 'bad'];
  let seq = 0;
  const spawn = (kind = kinds[seq++ % kinds.length]) => {
    const color = kind === 'bad' ? C.signal : C.cobalt;
    const m = new Mesh(cubeGeo, new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.25, roughness: 0.35, transparent: true }));
    m.castShadow = true;
    world.add(m);
    const lz = lanesZ[seq % 3];
    cubes.push({ m, kind, id: String(seq).padStart(2, '0'), phase: 'feed', x: -4.1, z: lz, y: 0.3, pause: 0, alpha: 1 });
  };
  let spawnClock = 0;

  S.onUpdate(({ time, dt }) => {
    spawnClock += dt;
    if (spawnClock > 1.6) {
      spawnClock = 0;
      spawn();
    }
    if (scanner) scanner.position.y = 0.25 + (Math.sin(time * 3) * 0.5 + 0.5) * 0.85;
    pulse *= Math.exp(-dt * 3);
    topLight.material.emissiveIntensity = 0.5 + pulse * 1.5;
    gateLeds.forEach((g) => {
      g.flash *= Math.exp(-dt * 4);
      g.mat.color.copy(g.bad > 0.05 ? C.signal : g.flash > 0.05 ? C.emerald : new Color('#B9C0CB'));
      g.bad *= Math.exp(-dt * 3);
    });

    for (let i = cubes.length - 1; i >= 0; i--) {
      const c = cubes[i];
      const v = 1.05 * dt;
      if (c.phase === 'feed') {
        // merge from the client lane onto the track
        c.x += v;
        c.z += (0 - c.z) * Math.min(1, dt * 3.2);
        if (c.x >= X0) c.phase = 'track';
      } else if (c.phase === 'track') {
        const before = c.x;
        // interruption just before the Upload gate (LAUR-FL decision)
        if ((c.kind === 'interrupt' || c.kind === 'drop') && before < -3.1 && before + v >= -3.1 && c.pause === 0) {
          c.pause = 1.8;
          c.phase = 'paused';
          emit({ type: 'interrupt', id: c.id });
        } else c.x += v;
        GATES.forEach((g, gi) => {
          if (before < g.x && c.x >= g.x) gateLeds[gi].flash = 1;
        });
        if (c.kind === 'bad' && c.x >= GATES[2].x) {
          gateLeds[2].bad = 1;
          c.phase = 'reject';
          emit({ type: 'reject', id: c.id });
        }
        if (c.x >= XEND - 0.1) c.phase = 'write';
      } else if (c.phase === 'paused') {
        c.pause -= dt;
        c.m.material.color.copy(Math.sin(time * 14) > 0 ? AMBER : C.cobalt);
        if (c.pause <= 0) {
          if (c.kind === 'drop') {
            c.phase = 'fade';
            emit({ type: 'drop', id: c.id });
          } else {
            emit({ type: 'resume', id: c.id });
            c.m.material.color.copy(C.cobalt);
            c.pause = -1;
            c.phase = 'track';
          }
        }
      } else if (c.phase === 'reject') {
        c.z += 1.6 * dt;
        c.x += (bin.position.x - c.x) * Math.min(1, dt * 4);
        if (c.z > 1.45) {
          c.y -= 1.2 * dt;
          c.alpha -= dt * 0.9;
        }
      } else if (c.phase === 'write') {
        c.x += (ledger.position.x - c.x) * Math.min(1, dt * 6);
        c.y += 1.4 * dt;
        c.alpha -= dt * 2.2;
        if (c.alpha <= 0.3 && !c.written) {
          c.written = true;
          if (written >= slabs.length) {
            slabs.forEach((s) => (s.visible = false));
            written = 0;
          }
          slabs[written++].visible = true;
          emit({ type: 'write', id: c.id });
          topLight.position.y = 0.18 + written * 0.12 + 0.02;
          pulse = 1;
        }
      } else if (c.phase === 'fade') {
        c.alpha -= dt * 1.4;
        c.y += dt * 0.5;
        c.m.material.color.copy(AMBER);
      }
      c.m.position.set(c.x, c.y + (c.phase === 'track' ? Math.sin(time * 6 + i) * 0.015 : 0), c.z);
      c.m.rotation.y = c.phase === 'reject' ? time * 3 : 0;
      c.m.material.opacity = Math.max(0, Math.min(1, c.alpha));
      if (c.alpha <= 0) {
        world.remove(c.m);
        c.m.material.dispose();
        cubes.splice(i, 1);
      }
    }
  });
  S.onClick(() => {
    for (let k = 0; k < 4; k++) setTimeout(() => spawn(k === 2 ? 'bad' : 'ok'), k * 180);
  });
  topLight.position.y = 0.18;

  S.api.ready();
  return S.api;
}
