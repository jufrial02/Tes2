import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createHead(color = 0xffdddd) {
  const geometry = new THREE.SphereGeometry(0.25, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color });
  const head = new THREE.Mesh(geometry, material);
  return head;
}