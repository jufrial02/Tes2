import * as THREE from 'three';
import { createHuman } from './human_model/human_model.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 1.6, 3);

// Tambahkan pencahayaan
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

// Panggil fungsi createHuman
createHuman(scene, (human) => {
  human.position.set(0, 0, 0); // pusat dunia
  animate();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
});
