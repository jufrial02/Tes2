import * as THREE from 'three';
import { createHuman } from './human_model/human_model.js';

const scene = new THREE.Scene();

// Kamera sudut pandang first-person (bebas disesuaikan)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 3); // kamera lihat dari depan

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambahkan pencahayaan
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 3, 2);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040, 2); // cahaya global
scene.add(ambient);

// Latar belakang agar tidak hitam
scene.background = new THREE.Color(0xdddddd);

// Tambahkan grid di bawah
const grid = new THREE.GridHelper(10, 10);
scene.add(grid);

// Muat manusia (torso + arm + leg)
let humanModel = null;

createHuman(scene, (model) => {
  humanModel = model;
  model.position.set(0, 0, 0);
  model.rotation.y = Math.PI; // menghadap ke kamera

  // Kalau kamu ingin pakai joystick/movement.js, inisialisasi di sini
  // setupJoystick(model);     ← jika kamu punya joystick.js
  // setupMovement(model);     ← jika kamu punya movement.js
});

// Animasi loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Responsif saat resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
