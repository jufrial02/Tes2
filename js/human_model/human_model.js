import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createLeg } from './leg.js';
import { createArm } from './arm.js'; // <-- Tambahkan import ini

export function createHumanModel() {
  const model = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.25, 0.7, 18),
    new THREE.MeshStandardMaterial({ color: 0x6699aa })
  );
  body.position.y = 1.4;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 12),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  head.position.y = 1.9;

  const leftLeg = createLeg('left');
  leftLeg.position.x = -0.12;
  leftLeg.position.y = 1.0;

  const rightLeg = createLeg('right');
  rightLeg.position.x = 0.12;
  rightLeg.position.y = 1.0;

  // Tambahkan lengan
  const leftArm = createArm('left');
  leftArm.position.x = -0.33;
  leftArm.position.y = 1.7;

  const rightArm = createArm('right');
  rightArm.position.x = 0.33;
  rightArm.position.y = 1.7;

  model.add(body);
  model.add(head);
  model.add(leftLeg);
  model.add(rightLeg);
  model.add(leftArm);
  model.add(rightArm);

  return model;
}
