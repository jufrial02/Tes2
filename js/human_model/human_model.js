import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
        // Semua bagian sudah dimuat
        const torso = loaded.torso;
        const arm = loaded.arm;
        const leg = loaded.leg;

        // Atur posisi relatif
        arm.position.set(0.4, 0.4, 0);  // kanan
        leg.position.set(0.2, -0.9, 0); // bawah

        // Gabungkan jadi satu tubuh
        torso.add(arm);
        torso.add(leg);

        // Tambahkan ke dunia
        scene.add(torso);

        if (onReady) onReady(torso);
      }
    }, undefined, (error) => {
      console.error(`Gagal memuat ${name}:`, error);
    });
  }
}
