import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createLeg } from './leg.js';

export function createHumanModel() {
  const model = new THREE.Group();

  // Badan
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.25, 0.7, 18),
    new THREE.MeshStandardMaterial({ color: 0x6699aa })
  );
  body.position.y = 1.4;

  // Kepala
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 12),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  head.position.y = 1.9;

  // Kaki kiri
  const leftLeg = createLeg('left');
  leftLeg.position.x = -0.12;
  leftLeg.position.y = 1.0;

  // Kaki kanan
  const rightLeg = createLeg('right');
  rightLeg.position.x = 0.12;
  rightLeg.position.y = 1.0;

  // Gabung
  model.add(body);
  model.add(head);
  model.add(leftLeg);
  model.add(rightLeg);

  return model;
}