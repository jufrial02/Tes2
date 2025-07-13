import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { createHuman } from './human_model/human_model.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 3, 2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

scene.background = new THREE.Color(0xdddddd);
const grid = new THREE.GridHelper(10, 10);
scene.add(grid);

let humanModel = null;
createHuman(scene, (model) => {
  humanModel = model;
  model.position.set(0, 0, 0);
  model.rotation.y = Math.PI;
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
