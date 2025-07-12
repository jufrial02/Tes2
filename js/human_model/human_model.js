import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createTorso } from './torso.js';
import { createArm } from './arm.js';
import { createLeg } from './leg.js';
import { createHead } from './head.js';

/**
 * Membuat model manusia 3D.
 * @param {Object} options Opsi warna bagian tubuh.
 * @param {number} options.torsoColor - Warna torso (default: 0x8d5524).
 * @param {number} options.headColor - Warna kepala (default: 0xc68642).
 * @param {number} options.armColor - Warna lengan (default: 0xe0ac69).
 * @param {number} options.legColor - Warna kaki (default: 0xf1c27d).
 * @returns {THREE.Group} - Grup model manusia.
 */
export function createHumanModel(options = {}) {
  const {
    torsoColor = 0x8d5524,
    headColor = 0xc68642,
    armColor = 0xe0ac69,
    legColor = 0xf1c27d
  } = options;

  const model = new THREE.Group();

  // Torso
  const torso = createTorso(torsoColor);
  model.add(torso);

  // Head
  const head = createHead(headColor);
  head.position.y = 0.9 + 0.25 + 0.05; // di atas torso
  torso.add(head);

  // Arms
  const leftArm = createArm('left', armColor);
  leftArm.position.set(-0.35, 0.5, 0);
  torso.add(leftArm);

  const rightArm = createArm('right', armColor);
  rightArm.position.set(0.35, 0.5, 0);
  torso.add(rightArm);

  // Legs
  const leftLeg = createLeg('left', legColor);
  leftLeg.position.set(-0.15, -0.9, 0);
  torso.add(leftLeg);

  const rightLeg = createLeg('right', legColor);
  rightLeg.position.set(0.15, -0.9, 0);
  torso.add(rightLeg);

  return model;
}