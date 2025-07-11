import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import nipplejs from 'https://cdn.jsdelivr.net/npm/nipplejs@0.9.0/dist/nipplejs.esm.js';
import { createHumanModel } from './human_model/human_model.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222244);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5.5, 15);
camera.lookAt(4, 1.2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Tambah lampu lantai agar terang
const floorLight = new THREE.HemisphereLight(0xffffff, 0x222222, 1.2);
scene.add(floorLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const human = createHumanModel();
human.position.set(0, 1, 0);
scene.add(human);

let leftLeg, rightLeg;
human.traverse((obj) => {
  if (obj.name === 'leftLeg') leftLeg = obj;
  if (obj.name === 'rightLeg') rightLeg = obj;
});

let walkCycle = 0;
let isWalking = false;

let moveDir = { x: 0, y: 0 };
const joystick = nipplejs.create({
  zone: document.getElementById('joystick-zone'),
  mode: 'static',
  position: { left: '80px', bottom: '80px' },
  color: 'blue',
  size: 100
});
joystick.on('move', function (evt, data) {
  if (data && data.vector) {
    moveDir.x = data.vector.x * 50;
    moveDir.y = data.vector.y * 50;
  }
});
joystick.on('end', function () {
  moveDir.x = 0;
  moveDir.y = 0;
});

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

function moveHuman(dt) {
  const speed = 2.5;
  if (Math.abs(moveDir.x) > 5 || Math.abs(moveDir.y) > 5) {
    const dx = moveDir.x * speed * dt * 0.1;
    const dz = moveDir.y * speed * dt * 0.1;
    human.position.x += dx;
    human.position.z += dz;
    if (dx !== 0 || dz !== 0) {
      human.rotation.y = Math.atan2(dx, dz);
    }
  }
}

let lastTime = performance.now();
function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  isWalking = Math.abs(moveDir.x) > 5 || Math.abs(moveDir.y) > 5;

  moveHuman(dt);
  animateLegs(dt);

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});