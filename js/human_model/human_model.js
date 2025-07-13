import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

export function createHuman(scene, onReady) {
  const loader = new GLTFLoader();

  const parts = {
    torso: 'js/human_model/torso.glb',
    arm: 'js/human_model/arm.glb',
    leg: 'js/human_model/leg.glb'
  };

  const loaded = {};
  let loadedCount = 0;
  const totalParts = Object.keys(parts).length;

  for (const [name, path] of Object.entries(parts)) {
    loader.load(path, (gltf) => {
      const model = gltf.scene;
      model.name = name;
      loaded[name] = model;

      loadedCount++;
      if (loadedCount === totalParts) {
        const torso = loaded.torso;
        const arm = loaded.arm;
        const leg = loaded.leg;

        arm.position.set(0.4, 0.4, 0);  // kanan
        leg.position.set(0.2, -0.9, 0); // bawah

        torso.add(arm);
        torso.add(leg);

        scene.add(torso);
        if (onReady) onReady(torso);
      }
    }, undefined, (error) => {
      console.error(`Gagal memuat ${name}:`, error);
    });
  }
}
