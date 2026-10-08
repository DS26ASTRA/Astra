import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Sparkles, Award, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

const TeamAvatar3D = ({ 
  teamName = 'Expedition Warriors', 
  teamId = 'TEAM-AC-001', 
  archetype = 'warrior', // 'warrior' | 'sage' | 'architect'
  qualificationStatus = 'QUALIFIED', // 'QUALIFIED' | 'ELIMINATED' | 'IN TRIAL'
  altitude = '4,850m'
}) => {
  const mountRef = useRef(null);
  const [selectedArchetype, setSelectedArchetype] = useState(archetype);
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const characterGroupRef = useRef(null);

  const isEliminated = qualificationStatus === 'ELIMINATED';

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isEliminated ? 0.9 : 1.35;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      isEliminated ? 0x8899aa : 0xfff3d6, 
      isEliminated ? 0.6 : 1.25
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      isEliminated ? 0x99aacc : 0xffdf99, 
      isEliminated ? 1.0 : 2.2
    );
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(
      isEliminated ? 0x446688 : 0x00f0ff, 
      isEliminated ? 0.7 : 1.6
    );
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Pedestal Dais
    const daisGeo = new THREE.CylinderGeometry(2.4, 2.7, 0.6, 24);
    const daisMat = new THREE.MeshStandardMaterial({
      color: isEliminated ? 0x1f1f1f : 0x241d14,
      metalness: isEliminated ? 0.4 : 0.8,
      roughness: isEliminated ? 0.7 : 0.3
    });
    const dais = new THREE.Mesh(daisGeo, daisMat);
    dais.position.y = -0.3;
    dais.receiveShadow = true;
    scene.add(dais);

    const goldRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.08, 12, 32),
      new THREE.MeshStandardMaterial({ 
        color: isEliminated ? 0x666666 : 0xffd700, 
        metalness: isEliminated ? 0.3 : 0.9, 
        roughness: isEliminated ? 0.8 : 0.2 
      })
    );
    goldRing.rotation.x = Math.PI / 2;
    goldRing.position.y = 0.02;
    scene.add(goldRing);

    // =========================================================
    // 3D ANCIENT INDIAN EXPLORER / WARRIOR CHARACTER GEOMETRY
    // =========================================================
    const characterGroup = new THREE.Group();
    characterGroupRef.current = characterGroup;
    scene.add(characterGroup);

    // Skin & Materials (Dimmed & Weathered if Eliminated)
    const skinMat = new THREE.MeshStandardMaterial({ 
      color: isEliminated ? 0x6e5a48 : 0x946b49, 
      roughness: 0.75 
    });

    const armorMat = new THREE.MeshStandardMaterial({ 
      color: isEliminated ? 0x5a554a : 0xd4af37, 
      metalness: isEliminated ? 0.2 : 0.85, 
      roughness: isEliminated ? 0.8 : 0.3 
    });

    const clothMat = new THREE.MeshStandardMaterial({ 
      color: isEliminated ? 0x3d3532 : 0x8a2323, 
      roughness: 0.85 
    });

    const dhotiMat = new THREE.MeshStandardMaterial({ 
      color: isEliminated ? 0x8a8479 : 0xded0b3, 
      roughness: 0.9 
    });

    const runeMat = new THREE.MeshStandardMaterial({ 
      color: isEliminated ? 0x335566 : 0x00f0ff, 
      emissive: isEliminated ? 0x112233 : 0x00f0ff, 
      emissiveIntensity: isEliminated ? 0.1 : 1.5 
    });

    // Torso / Cuirass
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.55, 1.6, 8), armorMat);
    torso.position.y = 2.4;
    torso.castShadow = true;
    characterGroup.add(torso);

    // Angavastram Sash draped across chest
    const sash = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.12, 8, 16), clothMat);
    sash.rotation.x = Math.PI / 3;
    sash.rotation.y = Math.PI / 4;
    sash.position.set(0, 2.5, 0.05);
    characterGroup.add(sash);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 16), skinMat);
    head.position.y = 3.65;
    characterGroup.add(head);

    // Ushnisha Turban / Headband with Golden Jewel
    const headband = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 8, 16), armorMat);
    headband.rotation.x = Math.PI / 2;
    headband.position.y = 3.75;
    characterGroup.add(headband);

    const jewel = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 6), runeMat);
    jewel.rotation.x = Math.PI / 2;
    jewel.position.set(0, 3.82, 0.5);
    characterGroup.add(jewel);

    // Legs / Dhoti
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 1.6, 8), dhotiMat);
    leftLeg.position.set(-0.35, 1.0, 0);
    characterGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 1.6, 8), dhotiMat);
    rightLeg.position.set(0.35, 1.0, 0);
    characterGroup.add(rightLeg);

    // Greaves
    [-0.35, 0.35].forEach(x => {
      const greave = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.8, 8), armorMat);
      greave.position.set(x, 0.5, 0);
      characterGroup.add(greave);
    });

    // Arms
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 1.3, 8), skinMat);
    leftArm.position.set(-0.95, 2.3, 0);
    leftArm.rotation.z = Math.PI / 10;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 1.3, 8), skinMat);
    rightArm.position.set(0.95, 2.3, 0);
    rightArm.rotation.z = isEliminated ? -Math.PI / 16 : -Math.PI / 10;
    characterGroup.add(rightArm);

    // Left Hand: Khetaka Shield
    const shieldGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.1, 16);
    const shield = new THREE.Mesh(shieldGeo, armorMat);
    shield.rotation.x = Math.PI / 2;
    shield.rotation.z = isEliminated ? 0 : Math.PI / 6;
    shield.position.set(-1.1, isEliminated ? 1.6 : 2.2, isEliminated ? 0.2 : 0.4);
    characterGroup.add(shield);

    const shieldBoss = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.3, 8), runeMat);
    shieldBoss.rotation.x = Math.PI / 2;
    shieldBoss.position.set(-1.1, isEliminated ? 1.6 : 2.2, isEliminated ? 0.35 : 0.55);
    characterGroup.add(shieldBoss);

    // Right Hand: Spear (Bhala) - Lowered if Eliminated
    const spearShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.2, 8), dhotiMat);
    spearShaft.position.set(1.15, isEliminated ? 2.1 : 2.6, 0.2);
    spearShaft.rotation.x = isEliminated ? -Math.PI / 8 : -Math.PI / 16;
    characterGroup.add(spearShaft);

    const spearTip = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.8, 6), armorMat);
    spearTip.position.set(1.15, isEliminated ? 4.3 : 4.8, isEliminated ? -0.1 : 0.3);
    characterGroup.add(spearTip);

    // Back: Traveler's Quiver & Scroll pack
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 0.35), clothMat);
    pack.position.set(0, 2.4, -0.45);
    characterGroup.add(pack);

    // Floating Particles (Golden Embers or Dim Grey Ash)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 3.5;
      particlePos[p * 3 + 1] = Math.random() * 4.5 + 0.2;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isEliminated ? 0x8899aa : 0xffd700,
      size: 0.18,
      transparent: true,
      opacity: isEliminated ? 0.4 : 0.85
    });
    const auraPoints = new THREE.Points(particleGeo, particleMat);
    characterGroup.add(auraPoints);

    // Gentle Floating Animation Loop
    const startTime = performance.now();
    let animId;

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001;

      // Auto-rotation when not dragging (slower if eliminated)
      if (!isDragging && characterGroup) {
        characterGroup.rotation.y += isEliminated ? 0.003 : 0.008;
      }

      // Breathing motion
      torso.position.y = 2.4 + Math.sin(time * (isEliminated ? 1.2 : 2)) * 0.03;
      head.position.y = 3.65 + Math.sin(time * (isEliminated ? 1.2 : 2)) * 0.03;

      // Aura particles drift upward
      const pos = auraPoints.geometry.attributes.position.array;
      for (let p = 0; p < particleCount; p++) {
        pos[p * 3 + 1] += 0.015;
        if (pos[p * 3 + 1] > 5) pos[p * 3 + 1] = 0.5;
      }
      auraPoints.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse drag rotation
    const onMouseDown = (e) => {
      setIsDragging(true);
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging || !characterGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      characterGroupRef.current.rotation.y += deltaX * 0.012;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => setIsDragging(false);

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedArchetype, qualificationStatus]);

  return (
    <div className={`relative rounded-2xl border backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col items-center select-none transition-all ${
      isEliminated 
        ? 'border-gray-700/60 bg-[#09090b]/90 shadow-[0_0_20px_rgba(0,0,0,0.6)]' 
        : 'border-[#d4af37]/40 bg-[#09090c]/90'
    }`}>
      
      {/* Header Info */}
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#d4af37]/25">
        <div>
          <span className="text-[10px] font-ancient tracking-widest text-[#d4af37] uppercase">
            EXPEDITION AVATAR
          </span>
          <h3 className="font-ancient text-base font-bold text-white uppercase truncate">
            {teamName}
          </h3>
        </div>
        <div className="text-right">
          <span className={`px-2.5 py-0.5 rounded-full font-ancient text-[10px] font-bold inline-flex items-center gap-1 ${
            isEliminated 
              ? 'border border-red-500/50 bg-red-500/10 text-red-400' 
              : 'border border-green-500/50 bg-green-500/10 text-green-400'
          }`}>
            {isEliminated ? <AlertTriangle size={10} /> : <CheckCircle size={10} />}
            <span>{qualificationStatus}</span>
          </span>
          <div className="text-[10px] font-mono text-gray-400 mt-0.5">{altitude}</div>
        </div>
      </div>

      {/* 3D WebGL Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-[360px] cursor-grab active:cursor-grabbing flex items-center justify-center relative"
        title="Drag left/right to rotate 3D avatar"
      >
        {/* Subtle rotate instruction overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-[#d4af37]/30 text-[9px] font-ancient tracking-widest text-gray-400 flex items-center gap-1.5 pointer-events-none">
          <RotateCcw size={10} />
          <span>DRAG TO ROTATE 360°</span>
        </div>

        {/* Elimination Overlay Ribbon */}
        {isEliminated && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-[10px] font-ancient text-red-300 font-bold tracking-widest uppercase shadow-lg">
            JOURNEY PAUSED • HALTED AT BASECAMP
          </div>
        )}
      </div>

      {/* Archetype Persona Selectors */}
      <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-[#d4af37]/25">
        {[
          { id: 'warrior', label: 'SENANI', sub: 'Warrior Guard' },
          { id: 'sage', label: 'VIDWAN', sub: 'Vedic Scholar' },
          { id: 'architect', label: 'SHILPI', sub: 'Civil Architect' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedArchetype(item.id)}
            className={`py-1.5 px-2 rounded-lg text-center transition-all ${
              selectedArchetype === item.id
                ? 'border border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700]'
                : 'border border-gray-800 bg-black/40 text-gray-400 hover:text-white'
            }`}
          >
            <div className="font-ancient text-[10px] font-bold uppercase">{item.label}</div>
            <div className="text-[8px] text-gray-400">{item.sub}</div>
          </button>
        ))}
      </div>

    </div>
  );
};

export default TeamAvatar3D;
