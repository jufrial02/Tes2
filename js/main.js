// ... (Bagian import dan setup scene tetap seperti sebelumnya)

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { setupMovementWithJoystick } from './movement.js';
import { createHumanModel } from './human_model/human_model.js';

// SCENE SETUP
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222244);

// KAMERA
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5.5, 15);
camera.lookAt(4, 1.2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// ==========================
// LANTAI REALISTIK
// ...
// (lanjutkan bagian setup lantai, rumah, lampu, dsb seperti kode asli)

// ==========================
// MODEL MANUSIA
// ==========================
const human = createHumanModel();
human.position.set(0, 1, 0);
scene.add(human);

// ==========================
// Ambil referensi kaki
let leftLeg, rightLeg;
human.traverse((obj) => {
  if (obj.name === 'leftLeg') leftLeg = obj;
  if (obj.name === 'rightLeg') rightLeg = obj;
});

// ==========================
// JOYSTICK DAN MOVEMENT
// ...
// (pastikan variabel moveDir tersedia dari joystick)

let walkCycle = 0;
let isWalking = false;

function animateLegs(dt) {
  if (!leftLeg || !rightLeg) return;
  if (isWalking) {
    walkCycle += dt * 7;
    const swing = Math.sin(walkCycle) * 0.6;
    leftLeg.knee.rotation.x = swing;
    rightLeg.knee.rotation.x = -swing;
  } else {
    leftLeg.knee.rotation.x *= 0.7;
    rightLeg.knee.rotation.x *= 0.7;
  }
}

let lastTime = performance.now();
function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  // Deteksi apakah bergerak (moveDir dari joystick)
  isWalking = typeof moveDir !== 'undefined' && (Math.abs(moveDir.x) > 5 || Math.abs(moveDir.y) > 5);

  animateLegs(dt);
  renderer.render(scene, camera);
}
animate();

// ... (Bagian lain: event resize, dsb, tetap seperti kode asli)