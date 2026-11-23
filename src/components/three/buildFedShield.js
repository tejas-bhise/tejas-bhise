// ─────────────────────────────────────────────────────────────────────────────
// FedShield — interactive 3D model of the paper's setup.
//   5 federated clients (clients 1 and 3 malicious, as in the evaluation config)
//   → model updates travel toward the global model
//   → the Guardian layer stops malicious updates before aggregation
//   Flower server orchestrates rounds · CIFAR-10 training data · SVHN OOD proxy
// ─────────────────────────────────────────────────────────────────────────────
import {
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from 'three';
import { addPlinth, createStage, PALETTE as C, rbox, std } from './stage';

export function buildFedShield(canvas, opts) {
  const S = createStage(canvas, { ...opts, cameraPos: [6.5, 8.6, 11.5], lookAt: [0, -0.35, 0], fit: { min: 7, k: 11.9 } });
  const { world } = S;
  const PW = 9.4;
  const PD = 6.9;
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

  // ── Global model (chip) ──────────────────────────────────────────────────
  const core = new Group();
  const body = new Mesh(rbox(1.9, 0.34, 1.9, 0.1, 4), std(C.ink, { roughness: 0.35, metalness: 0.35 }));
  body.position.y = 0.17;
  core.add(body);
  const dieMat = std(C.signal, { emissive: C.signal, emissiveIntensity: 0.55, roughness: 0.3 });
  const die = new Mesh(rbox(1.05, 0.08, 1.05, 0.03), dieMat);
  die.position.y = 0.37;
  core.add(die);
  {
    const lines = [];
    for (let i = -2; i <= 2; i++) lines.push(i * 0.18, 0.415, -0.45, i * 0.18, 0.415, 0.45, -0.45, 0.415, i * 0.18, 0.45, 0.415, i * 0.18);
    const lg = new BufferGeometry();
    lg.setAttribute('position', new Float32BufferAttribute(lines, 3));
    core.add(new LineSegments(lg, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })));
    const pinGeo = new BoxGeometry(0.09, 0.07, 0.26);
    const pinMat = std(C.steel, { metalness: 0.8, roughness: 0.3 });
    for (let i = 0; i < 7; i++) {
      const o = -0.66 + i * 0.22;
      for (const [x, z, r] of [
        [o, 1.05, 0],
        [o, -1.05, 0],
        [1.05, o, Math.PI / 2],
        [-1.05, o, Math.PI / 2],
      ]) {
        const pin = new Mesh(pinGeo, pinMat);
        pin.position.set(x, 0.06, z);
        pin.rotation.y = r;
        core.add(pin);
      }
    }
  }
  S.register(core, 'Global model', { offset: new Vector3(-1.55, 0.05, 0.55), below: true });

  // ── Guardian layer ring ──────────────────────────────────────────────────
  const ringMat = new MeshStandardMaterial({ color: C.signal, emissive: C.signal, emissiveIntensity: 0.6, roughness: 0.4 });
  const guardian = new Mesh(new TorusGeometry(1.75, 0.035, 12, 120), ringMat);
  guardian.rotation.x = Math.PI / 2;
  guardian.position.y = 0.55;
  world.add(guardian);
  const dots = new Group();
  for (let i = 0; i < 6; i++) {
    const d = new Mesh(new SphereGeometry(0.07, 16, 12), new MeshBasicMaterial({ color: C.signal }));
    const a = (i / 6) * Math.PI * 2;
    d.position.set(Math.cos(a) * 1.75, 0.55, Math.sin(a) * 1.75);
    dots.add(d);
  }
  world.add(dots);
  S.anchor(guardian, 'Guardian layer', { offset: new Vector3(-1.45, 0.1, -0.75), tone: 'signal' });

  // ── Flower server ────────────────────────────────────────────────────────
  const server = new Group();
  server.position.set(-3.0, 0, 1.25);
  const leds = [];
  for (let i = 0; i < 3; i++) {
    const blade = new Mesh(rbox(1.5, 0.32, 1.05, 0.06), std(C.white, { roughness: 0.5 }));
    blade.position.y = 0.17 + i * 0.37;
    server.add(blade);
    const panel = new Mesh(new BoxGeometry(1.2, 0.12, 0.02), std(C.ink, { roughness: 0.4 }));
    panel.position.set(-0.05, 0.17 + i * 0.37, 0.53);
    server.add(panel);
    for (let k = 0; k < 3; k++) {
      const led = new Mesh(new SphereGeometry(0.045, 12, 8), new MeshBasicMaterial({ color: k === 0 ? C.emerald : C.cobalt }));
      led.position.set(-0.45 + k * 0.16, 0.17 + i * 0.37, 0.55);
      led.userData.phase = Math.random() * 6;
      server.add(led);
      leds.push(led);
    }
  }
  S.register(server, 'Flower server', { offset: new Vector3(0, 1.75, 0) });

  // ── Datasets (drums) ─────────────────────────────────────────────────────
  const drum = (accent, layers) => {
    const g = new Group();
    for (let i = 0; i < layers; i++) {
      const disk = new Mesh(new CylinderGeometry(0.62, 0.62, 0.3, 48), std(C.white, { roughness: 0.45 }));
      disk.position.y = 0.16 + i * 0.36;
      g.add(disk);
      const ring = new Mesh(
        new TorusGeometry(0.63, 0.03, 8, 64),
        new MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.35, roughness: 0.4 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.33 + i * 0.36;
      g.add(ring);
    }
    return g;
  };
  const svhn = drum(C.cobalt, 3);
  svhn.position.set(3.0, 0, 1.35);
  S.register(svhn, 'SVHN · OOD proxy', { offset: new Vector3(0, 1.75, 0) });
  const cifar = drum(C.signal, 2);
  cifar.position.set(1.0, 0, 2.45);
  S.register(cifar, 'CIFAR-10', { offset: new Vector3(0, 0, 0.75), below: true });

  // ── 5 federated clients (1 and 3 malicious) ──────────────────────────────
  const laptop = (bad) => {
    const g = new Group();
    const baseL = new Mesh(rbox(1.1, 0.07, 0.76, 0.03, 2), std(C.white, { roughness: 0.4 }));
    baseL.position.y = 0.04;
    g.add(baseL);
    const lid = new Group();
    lid.position.set(0, 0.07, -0.36);
    lid.rotation.x = -0.32;
    const shell = new Mesh(rbox(1.1, 0.74, 0.05, 0.025, 2), std(C.white, { roughness: 0.4 }));
    shell.position.y = 0.37;
    lid.add(shell);
    const scr = new Mesh(
      new PlaneGeometry(0.98, 0.6),
      new MeshStandardMaterial({
        color: bad ? new Color('#FBD5CC') : new Color('#DCE2FF'),
        emissive: bad ? C.signal : C.cobalt,
        emissiveIntensity: bad ? 0.32 : 0.16,
        roughness: 0.3,
      })
    );
    scr.position.set(0, 0.37, 0.027);
    lid.add(scr);
    for (let i = 0; i < 4; i++) {
      const w = 0.2 + ((i * 37) % 5) * 0.09;
      const bar = new Mesh(new PlaneGeometry(w, 0.045), new MeshBasicMaterial({ color: bad ? C.signal : C.ink, transparent: true, opacity: 0.55 }));
      bar.position.set(-0.3 + w / 2, 0.55 - i * 0.1, 0.03);
      lid.add(bar);
    }
    g.add(lid);
    g.scale.setScalar(1.08);
    return g;
  };
  const CL = [
    [-3.6, -1.85],
    [-1.85, -2.3],
    [0, -2.5],
    [1.85, -2.3],
    [3.6, -1.85],
  ];
  const BAD = new Set([1, 3]);
  CL.forEach(([x, z], i) => {
    const g = laptop(BAD.has(i));
    g.position.set(x, 0, z);
    g.rotation.y = Math.atan2(-x, -z) * 0.35;
    const label =
      i === 2 ? { text: 'Clients ×5' } : BAD.has(i) ? { text: i === 1 ? 'Malicious · client 1' : 'Malicious · client 3', tone: 'signal' } : { text: null };
    S.register(g, `client-${i}`, { ...label, offset: new Vector3(0, 1.3, 0) });
  });

  // ── Paths & packets ──────────────────────────────────────────────────────
  const grooveMat = std(C.groove, { roughness: 0.9 });
  const paths = [];
  const addPath = (pts, kind) => {
    const curve = new CatmullRomCurve3(pts.map(([x, z]) => new Vector3(x, 0.03, z)));
    const tube = new Mesh(new TubeGeometry(curve, 48, 0.028, 6, false), grooveMat);
    tube.receiveShadow = true;
    world.add(tube);
    paths.push({ curve, kind });
  };
  CL.forEach(([x, z], i) =>
    addPath(
      [
        [x, z + 0.45],
        [x * 0.55, z * 0.55 + 0.2],
        [x * 0.12, -0.95],
      ],
      BAD.has(i) ? 'blocked' : 'update'
    )
  );
  addPath([[-0.98, 0.35], [-1.8, 0.9], [-2.2, 1.25]], 'model'); // aggregated model → server
  addPath([[2.4, 1.3], [1.6, 0.9], [0.98, 0.5]], 'proxy'); // SVHN proxy → guardian checks
  addPath([[-2.9, 1.85], [-0.6, 2.35], [0.4, 2.3]], 'data'); // server ↔ CIFAR-10

  const packetGeo = new SphereGeometry(0.085, 16, 12);
  const packets = [];
  const spawn = (idx, t0, speed) => {
    const bad = paths[idx].kind === 'blocked';
    const m = new Mesh(packetGeo, new MeshBasicMaterial({ color: bad ? C.signal : C.cobalt, transparent: true }));
    m.castShadow = true;
    world.add(m);
    packets.push({ m, idx, t: t0, speed, once: t0 < 0 });
  };
  paths.forEach((_, i) => {
    spawn(i, Math.random(), 0.22 + Math.random() * 0.12);
    spawn(i, Math.random(), 0.22 + Math.random() * 0.12);
  });

  let flash = 0;
  const tmp = new Vector3();
  S.onUpdate(({ time, dt }) => {
    flash *= Math.exp(-dt * 3);
    dieMat.emissiveIntensity = 0.5 + Math.sin(time * 2.2) * 0.12 + flash * 0.5;
    ringMat.emissiveIntensity = 0.55 + flash * 1.2;
    guardian.rotation.z = time * 0.35;
    dots.rotation.y = -time * 0.35;
    core.position.y += Math.sin(time * 1.4) * 0.0006;
    leds.forEach((l) => (l.visible = Math.sin(time * 3 + l.userData.phase * 3) > -0.6));
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.t += dt * p.speed;
      const bad = paths[p.idx].kind === 'blocked';
      const end = bad ? 0.84 : 1;
      if (p.t >= end) {
        if (bad) flash = Math.max(flash, 0.6); // Guardian rejects the update
        if (p.once) {
          world.remove(p.m);
          p.m.material.dispose();
          packets.splice(i, 1);
          continue;
        }
        p.t = 0;
      }
      const t = Math.max(0, p.t);
      paths[p.idx].curve.getPointAt(Math.min(1, t), tmp);
      p.m.position.set(tmp.x, 0.13, tmp.z);
      p.m.material.opacity = Math.max(0, Math.min(1, t * 8) * Math.min(1, (end - t) * 8));
      p.m.scale.setScalar(bad && t > end - 0.08 ? 1 + (t - (end - 0.08)) * 14 : 1);
    }
  });
  S.onClick(() => {
    // a new federated round: every client sends an update at once
    paths.forEach((_, i) => {
      for (let k = 0; k < 3; k++) spawn(i, -k * 0.12, 0.6);
    });
  });

  S.api.ready();
  return S.api;
}
