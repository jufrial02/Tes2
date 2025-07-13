// Gunakan Three.js & GLTFLoader dari CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// Import fungsi createHuman dari human_model.js
import { createHuman } from './human_model/human_model.js';

// Buat scene 3D
const scene = new THREE.Scene();

// Kamera sudut pandang orang pertama (FPV)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 3); // Kamera setinggi kepala

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambahkan pencahayaan
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 3, 2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Latar belakang dan lantai (opsional)
scene.background = new THREE.Color(0xdddddd);
const grid = new THREE.GridHelper(10, 10);
scene.add(grid);

// Panggil createHuman() dan tambahkan ke scene
let humanModel = null;

createHuman(scene, (model) => {
  humanModel = model;
  model.position.set(0, 0, 0);
  model.rotation.y = Math.PI;
});

// Loop animasi
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
});
