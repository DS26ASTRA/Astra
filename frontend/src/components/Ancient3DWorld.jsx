import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const Ancient3DWorld = ({ 
  scrollProgress = 0, 
  onSceneReady,
  onZoneChange,
  onOpenAboutModal
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);

  // Loading state
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Entering ancient expedition...');
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth camera progression
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const lastFootstepProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  // Animation references
  const dynamicAtmosphereRef = useRef(null);
  const currentZoneRef = useRef('entrance');

  useEffect(() => {
    targetProgress.current = Math.max(0, Math.min(1, scrollProgress));
    let newZone = 'entrance';
    let zoneTitle = 'Ancient Forest Trail';

    if (scrollProgress < 0.20) {
      newZone = 'entrance';
      zoneTitle = 'Ancient Forest Trail';
    } else if (scrollProgress < 0.44) {
      newZone = 'about';
      zoneTitle = 'The Sacred Monument';
    } else if (scrollProgress < 0.70) {
      newZone = 'forest';
      zoneTitle = 'Deep Forest Trail';
    } else if (scrollProgress < 0.88) {
      newZone = 'ruins';
      zoneTitle = 'Ancient Archaeological Ruins';
    } else {
      newZone = 'vista';
      zoneTitle = 'The Citadel Ridge';
    }

    if (currentZoneRef.current !== newZone) {
      currentZoneRef.current = newZone;
      if (onZoneChange) onZoneChange(newZone, zoneTitle);
    }
  }, [scrollProgress, onZoneChange]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // =========================================================
    // 1. THREE.JS SCENE, RENDERER & CINEMATIC CAMERA
    // =========================================================
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Soft luminous morning mist (harmonious atmospheric silver-sage)
    const forestMistColor = new THREE.Color(0x627568);
    scene.background = forestMistColor;

    // Linear atmospheric fog: clear foreground (<18m),
    // midground softens into mist, completely fades to background by 75m
    // (ZERO black polygons, ZERO visible terrain edges!)
    scene.fog = new THREE.Fog(0x627568, 18, 75);

    // Human eye-level cinematic camera (50 deg FOV standard prime feel)
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 450);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02; // Rich natural contrast
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Postprocessing bloom
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.12,  // subtle bloom strength
      0.35,  // radius
      0.90   // threshold
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // =========================================================
    // 2. SOFT CINEMATIC DAYLIGHT & FOREST ATMOSPHERE
    // Soft daylight filtering through canopy, slightly darker ground,
    // natural green tones, zero overexposure!
    // =========================================================
    const sunLight = new THREE.DirectionalLight(0xffeed6, 1.8);
    sunLight.position.set(20, 36, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    sunLight.shadow.bias = -0.0002;
    scene.add(sunLight);

    const sunTarget = new THREE.Object3D();
    sunTarget.position.set(0, 1.5, -16);
    scene.add(sunTarget);
    sunLight.target = sunTarget;

    // Canopy emerald bounce vs dark rich forest loam shadow
    const hemiLight = new THREE.HemisphereLight(0x6b8270, 0x1a241c, 0.72);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0x28382c, 0.40);
    scene.add(ambientLight);

    dynamicAtmosphereRef.current = {
      sunLight,
      sunTarget,
      hemiLight,
      ambientLight
    };

    // Soft volumetric sunbeams filtering directly onto the stone path
    const rayGroup = new THREE.Group();
    const rayGeo = new THREE.CylinderGeometry(0.5, 3.2, 34, 12, 1, true);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xffe6b0,
      transparent: true,
      opacity: 0.024,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    for (let i = 0; i < 3; i++) {
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(-2.6 + i * 2.6, 17, 4 - i * 7);
      ray.rotation.x = 0.44;
      ray.rotation.z = -0.22 + (i * 0.04);
      rayGroup.add(ray);
    }
    scene.add(rayGroup);

    // =========================================================
    // 3. CONTINUOUS NATURAL TERRAIN PROFILE
    // Vast bounds (280m x 360m), organic elevation swells,
    // slightly darker loam ground to let path and monument shine!
    // =========================================================
    const textureLoader = new THREE.TextureLoader();

    const groundTex = textureLoader.load('/textures/ground.jpg');
    groundTex.wrapS = THREE.RepeatWrapping;
    groundTex.wrapT = THREE.RepeatWrapping;
    groundTex.repeat.set(16, 22);
    groundTex.anisotropy = 16;

    const stoneTex = textureLoader.load('/textures/stone.jpg');
    stoneTex.wrapS = THREE.RepeatWrapping;
    stoneTex.wrapT = THREE.RepeatWrapping;
    stoneTex.repeat.set(3, 3);
    stoneTex.anisotropy = 16;

    // Continuous Winding Expedition Trail Centerline
    const getTrailX = (z) => {
      if (z > -8) {
        // 01 Ancient Forest: gentle natural path
        return Math.sin((z - 8) * 0.055) * 0.95;
      } else if (z > -28) {
        // 02 Sacred Monument: path glides past monument clearing (at x = +2.4)
        return -0.22 + Math.sin((z + 8) * 0.075) * 0.32;
      } else if (z > -65) {
        // 03 Deep Forest: natural winding path
        return Math.sin((z + 10) * 0.046) * 1.5;
      } else if (z > -94) {
        // 04 Ruins: passes through archaeological gateway
        if (z >= -80) return 0.0;
        return Math.sin((z + 80) * 0.065) * 1.0;
      } else {
        // 05 Citadel Ridge: ascends toward mountain pass
        return Math.sin((z + 94) * 0.04) * 0.9;
      }
    };

    // Organic Forest Elevation (Gentle slopes, subtle depressions, zero vertical walls)
    const getTerrainHeight = (x, z) => {
      let baseY = 0;
      if (z > 0) {
        baseY = 0;
      } else if (z > -25) {
        baseY = (-z / 25) * 0.85;
      } else if (z > -65) {
        baseY = 0.85 + ((-z - 25) / 40) * 2.3;
      } else if (z > -96) {
        baseY = 3.15 + ((-z - 65) / 31) * 3.3;
      } else {
        baseY = 6.45 + ((-z - 96) / 45) * 6.0;
      }

      const pathCenter = getTrailX(z);
      const distFromTrail = Math.abs(x - pathCenter);

      let y = baseY;

      // Center trail bed: smooth natural trodden depression
      if (distFromTrail < 1.6) {
        y -= 0.04 * Math.cos((distFromTrail / 1.6) * (Math.PI / 2));
      } else if (distFromTrail < 3.8) {
        // Gentle trail shoulder
        y += 0.08 * ((distFromTrail - 1.6) / 2.2);
      } else {
        // Beyond the trail: GENTLE, ROLLING NATURAL FOREST FLOOR SLOPES
        const bankDist = distFromTrail - 3.8;
        if (z > -65) {
          y += Math.min(1.3, Math.pow(bankDist / 8.5, 0.9) * 0.75);
        } else if (z > -96) {
          y += Math.min(2.4, Math.pow(bankDist / 6.5, 1.0) * 1.1);
        } else {
          y += Math.min(4.8, Math.pow(bankDist / 5.5, 1.1) * 1.5);
        }
      }

      // Multi-octave organic ground undulations
      y += Math.sin(x * 0.15 + z * 0.11) * 0.22 + Math.cos(x * 0.09 - z * 0.14) * 0.18;
      y += Math.sin(x * 0.38 - z * 0.28) * 0.08 + Math.cos(x * 0.28 + z * 0.22) * 0.06;

      return y;
    };

    // Vast Continuous Terrain Mesh (280m x 360m) - ZERO visible edges!
    const terrainGeo = new THREE.PlaneGeometry(280, 360, 160, 200);
    terrainGeo.rotateX(-Math.PI / 2);
    terrainGeo.translate(0, 0, -80); // Spans from +100 down to -260, far past fog horizon!

    const posAttr = terrainGeo.attributes.position;
    const vertexCount = posAttr.count;
    const colorArray = new Float32Array(vertexCount * 3);

    for (let i = 0; i < vertexCount; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const h = getTerrainHeight(vx, vz);
      posAttr.setY(i, h);

      const pathCenter = getTrailX(vz);
      const distFromTrail = Math.abs(vx - pathCenter);

      // Slightly darker natural ground palette:
      // Trail bed = trodden loam and stone dust
      // Shoulder = dark damp forest soil
      // Forest floor = deep mossy green & leaf litter
      let r, g, b;
      if (distFromTrail < 1.5) {
        // Trail bed
        r = 0.38 + Math.sin(vx * 1.6 + vz * 2.1) * 0.03;
        g = 0.34 + Math.sin(vx * 1.3 - vz * 1.7) * 0.03;
        b = 0.26 + Math.cos(vx * 1.9 + vz * 1.4) * 0.02;
      } else if (distFromTrail < 3.6) {
        // Shoulder: rich damp loam
        const t = (distFromTrail - 1.5) / 2.1;
        r = THREE.MathUtils.lerp(0.32, 0.22, t);
        g = THREE.MathUtils.lerp(0.28, 0.24, t);
        b = THREE.MathUtils.lerp(0.20, 0.15, t);
      } else {
        // Forest floor: organic moss patches & leaf litter
        const noise = Math.sin(vx * 0.5 + vz * 0.35) * 0.05 + Math.cos(vx * 0.25 - vz * 0.6) * 0.04;
        r = 0.18 + noise * 0.35;
        g = 0.26 + noise * 0.8;
        b = 0.16 + noise * 0.28;
      }

      colorArray[i * 3] = Math.max(0.10, Math.min(0.55, r));
      colorArray[i * 3 + 1] = Math.max(0.12, Math.min(0.55, g));
      colorArray[i * 3 + 2] = Math.max(0.06, Math.min(0.45, b));
    }

    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      vertexColors: true,
      color: 0x82887e, // Darker ground tones
      roughness: 0.94,
      metalness: 0.02
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.set(0, 0, 0);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // =========================================================
    // 4. THE HERO ANCIENT STONE PATH
    // Prominent, irregular interlocking ancient stone slabs
    // Lighter warm tone so path naturally attracts the eye!
    // =========================================================
    const stoneMats = [
      new THREE.MeshStandardMaterial({
        map: stoneTex,
        roughness: 0.78,
        metalness: 0.08,
        color: 0x9a9180 // Warm ancient weathered sandstone
      }),
      new THREE.MeshStandardMaterial({
        map: stoneTex,
        roughness: 0.80,
        metalness: 0.06,
        color: 0x85867d // Ancient granite slate
      }),
      new THREE.MeshStandardMaterial({
        map: stoneTex,
        roughness: 0.82,
        metalness: 0.05,
        color: 0x7c8574 // Moss-stained flagstone
      })
    ];

    const shadowSkirtMat = new THREE.MeshBasicMaterial({
      color: 0x0c120d,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });

    // High-density interlocking flagstones every 0.72 meters
    for (let z = 12.0; z > -110; z -= 0.72) {
      const trailX = getTrailX(z);
      const isEven = Math.round(z * 1.38) % 2 === 0;

      if (isEven) {
        // PATTERN A: Large central ancient slab flanked by companion stones
        const lateralShift = Math.sin(z * 1.6) * 0.14;
        const stoneX = trailX + lateralShift;
        const stoneY = getTerrainHeight(stoneX, z);

        const slabW = 1.80 + Math.sin(z * 1.8) * 0.35;
        const slabL = 0.64 + Math.cos(z * 2.4) * 0.12;
        const slabH = 0.06;

        const flagGeo = new THREE.BoxGeometry(slabW, slabH, slabL);
        const mat = stoneMats[Math.abs(Math.round(z * 3)) % stoneMats.length];
        const flagMesh = new THREE.Mesh(flagGeo, mat);
        flagMesh.position.set(stoneX, stoneY + 0.024, z);
        flagMesh.rotation.y = Math.sin(z * 2.1) * 0.09;
        flagMesh.rotation.x = Math.sin(z * 1.4) * 0.02;
        flagMesh.rotation.z = Math.cos(z * 1.9) * 0.02;
        flagMesh.castShadow = true;
        flagMesh.receiveShadow = true;
        scene.add(flagMesh);

        // Contact shadow skirt
        const skirtGeo = new THREE.PlaneGeometry(slabW * 1.12, slabL * 1.14);
        skirtGeo.rotateX(-Math.PI / 2);
        const skirtMesh = new THREE.Mesh(skirtGeo, shadowSkirtMat);
        skirtMesh.position.set(stoneX, stoneY + 0.004, z);
        scene.add(skirtMesh);
      } else {
        // PATTERN B: Two interlocking split slabs with irregular central seam
        const sideOffset = 0.58;
        const slabW1 = 1.08 + Math.sin(z * 2.2) * 0.18;
        const slabW2 = 1.00 + Math.cos(z * 2.5) * 0.16;
        const slabL = 0.60 + Math.sin(z * 1.9) * 0.10;
        const slabH = 0.055;

        // Left split slab
        const sX1 = trailX - sideOffset + Math.sin(z * 2.8) * 0.08;
        const sY1 = getTerrainHeight(sX1, z);
        const flag1 = new THREE.Mesh(
          new THREE.BoxGeometry(slabW1, slabH, slabL),
          stoneMats[Math.abs(Math.round(z * 5)) % stoneMats.length]
        );
        flag1.position.set(sX1, sY1 + 0.022, z);
        flag1.rotation.y = -0.06 + Math.sin(z * 3.2) * 0.08;
        flag1.castShadow = true;
        flag1.receiveShadow = true;
        scene.add(flag1);

        const skirt1 = new THREE.Mesh(
          new THREE.PlaneGeometry(slabW1 * 1.12, slabL * 1.14).rotateX(-Math.PI / 2),
          shadowSkirtMat
        );
        skirt1.position.set(sX1, sY1 + 0.003, z);
        scene.add(skirt1);

        // Right split slab
        const sX2 = trailX + sideOffset + Math.cos(z * 2.6) * 0.08;
        const sY2 = getTerrainHeight(sX2, z);
        const flag2 = new THREE.Mesh(
          new THREE.BoxGeometry(slabW2, slabH, slabL),
          stoneMats[Math.abs(Math.round(z * 7)) % stoneMats.length]
        );
        flag2.position.set(sX2, sY2 + 0.022, z);
        flag2.rotation.y = 0.07 + Math.cos(z * 3.0) * 0.08;
        flag2.castShadow = true;
        flag2.receiveShadow = true;
        scene.add(flag2);

        const skirt2 = new THREE.Mesh(
          new THREE.PlaneGeometry(slabW2 * 1.12, slabL * 1.14).rotateX(-Math.PI / 2),
          shadowSkirtMat
        );
        skirt2.position.set(sX2, sY2 + 0.003, z);
        scene.add(skirt2);
      }
    }

    // =========================================================
    // 5. EXACT MATHEMATICAL GROUNDING HELPER (ZERO FLOATING OBJECTS!)
    // =========================================================
    const groundObject = (obj, x, z, yOffset = 0) => {
      obj.position.set(x, 0, z);
      obj.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(obj);
      const currentBaseY = box.min.y;
      const targetGroundY = getTerrainHeight(x, z);
      obj.position.y = targetGroundY - currentBaseY + yOffset;
      obj.updateMatrixWorld(true);
    };

    const createCenteredWrapper = (object) => {
      const box = new THREE.Box3().setFromObject(object);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const size = new THREE.Vector3();
      box.getSize(size);

      object.position.set(-center.x, -box.min.y, -center.z);

      const wrapper = new THREE.Group();
      wrapper.add(object);
      return { wrapper, size };
    };

    // =========================================================
    // 6. PRELOAD & CLEAN ENVIRONMENT POPULATION
    // Handcrafted tree clusters framing the path; zero clutter
    // =========================================================
    const loadingManager = new THREE.LoadingManager();
    const gltfLoader = new GLTFLoader(loadingManager);
    const hdrLoader = new HDRLoader(loadingManager);

    loadingManager.onProgress = (item, loaded, total) => {
      const pct = Math.round((loaded / total) * 100);
      setLoadProgress(pct);
      if (item.includes('forest_env')) setLoadingText('Calibrating morning sky...');
      else if (item.includes('tree')) setLoadingText('Framing ancient tree clusters...');
      else if (item.includes('root')) setLoadingText('Anchoring roots into forest floor...');
      else if (item.includes('statue')) setLoadingText('Excavating ancient relics...');
      else setLoadingText(`Materializing ancient forest... ${pct}%`);
    };

    loadingManager.onLoad = () => {
      setTimeout(() => {
        setIsLoaded(true);
        if (onSceneReady) onSceneReady();
      }, 350);
    };

    hdrLoader.load('/env/forest_env_1k.hdr', (envTexture) => {
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTexture;
    });

    const setupModel = (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = Math.max(0.68, child.material.roughness || 0.8);
            if (child.material.map) child.material.map.anisotropy = 8;
          }
        }
      });
    };

    const models = {};

    // ---------------------------------------------------------
    // A. BEECH TREES: DENSE NATURAL CLUSTERS ENCLOSING FLANKS & FRAMING
    // 2-4 trees clustered together, open central path corridor,
    // overarching branches forming lush canopy overhead!
    // Trunks sunk -1.25m into soil so roots anchor naturally
    // ---------------------------------------------------------
    gltfLoader.load('/models/tree_beech.glb', (gltf) => {
      models.tree = gltf.scene;
      setupModel(models.tree);

      const treeList = [
        // FOREGROUND LEFT COPSE (Framing top-left canopy)
        { x: -4.8, z: 9.2, scale: 7.4, rotY: 0.6, tiltZ: -0.06 },
        { x: -6.2, z: 7.5, scale: 6.2, rotY: 2.1, tiltZ: 0.03 },
        { x: -7.8, z: 10.5, scale: 5.6, rotY: 3.8, tiltZ: 0.00 },
        { x: -9.0, z: 8.0, scale: 6.0, rotY: 1.2 },

        // FOREGROUND RIGHT COPSE (Framing top-right canopy)
        { x: 4.8, z: 8.5, scale: 7.4, rotY: 2.8, tiltZ: 0.06 },
        { x: 6.5, z: 9.5, scale: 6.2, rotY: 1.2, tiltZ: -0.02 },
        { x: 8.2, z: 7.5, scale: 5.8, rotY: 4.1 },
        { x: 9.5, z: 9.0, scale: 6.0, rotY: 0.5 },

        // [OPEN SUNLIT CLEARING at Z = 1 to 5: warm morning sun onto the path]

        // NEAR-MIDGROVE LEFT (Filling left flank)
        { x: -4.5, z: 3.5, scale: 6.4, rotY: 1.4 },
        { x: -6.5, z: 2.0, scale: 6.6, rotY: 3.2 },
        { x: -8.5, z: 3.0, scale: 6.0, rotY: 0.8 },
        { x: -10.5, z: 4.5, scale: 6.4, rotY: 2.5 },

        // NEAR-MIDGROVE RIGHT (Filling right flank)
        { x: 4.8, z: 2.5, scale: 6.4, rotY: 2.2 },
        { x: 6.8, z: 1.5, scale: 6.6, rotY: 0.4 },
        { x: 8.8, z: 2.8, scale: 6.0, rotY: 3.8 },
        { x: 10.8, z: 3.5, scale: 6.4, rotY: 1.6 },

        // MIDGROUND LEFT GROVE (Z: -4 to -8)
        { x: -5.2, z: -4.5, scale: 6.5, rotY: 1.7, tiltZ: 0.02 },
        { x: -6.8, z: -6.5, scale: 6.0, rotY: 4.1, tiltZ: -0.03 },
        { x: -8.5, z: -5.0, scale: 5.8, rotY: 0.9 },
        { x: -10.2, z: -7.5, scale: 6.2, rotY: 2.8 },

        // MIDGROUND RIGHT GROVE (Z: -4 to -8)
        { x: 5.4, z: -5.0, scale: 6.5, rotY: 2.9, tiltZ: -0.04 },
        { x: 7.2, z: -6.8, scale: 6.0, rotY: 0.5, tiltZ: 0.02 },
        { x: 9.0, z: -5.5, scale: 5.8, rotY: 3.6 },
        { x: 10.8, z: -8.0, scale: 6.2, rotY: 1.1 },

        // MONUMENT CLEARING NATURAL FRAME (Z: -14 to -22)
        { x: 3.0, z: -21.0, scale: 8.2, rotY: 1.8, tiltZ: 0.03 }, // Giant ancient elder beech behind monument!
        { x: 6.8, z: -17.5, scale: 6.6, rotY: 3.5, tiltZ: -0.02 },
        { x: 9.2, z: -16.0, scale: 6.2, rotY: 0.9 },
        { x: -5.8, z: -14.5, scale: 6.6, rotY: 2.1, tiltZ: 0.04 },
        { x: -7.6, z: -16.5, scale: 6.2, rotY: 4.0 },
        { x: -9.5, z: -15.0, scale: 6.4, rotY: 1.5 },

        // DEEP FLANKING FOREST (Z: -24 to -45)
        { x: -6.0, z: -25.0, scale: 6.4, rotY: 3.2 },
        { x: -8.5, z: -27.0, scale: 6.6, rotY: 1.1 },
        { x: -6.2, z: -36.0, scale: 6.5, rotY: 2.4 },
        { x: -8.5, z: -38.0, scale: 6.5, rotY: 0.5 },

        { x: 6.5, z: -25.0, scale: 6.4, rotY: 0.8 },
        { x: 8.8, z: -27.0, scale: 6.6, rotY: 3.6 },
        { x: 6.2, z: -38.0, scale: 6.5, rotY: 1.9 },
        { x: 8.5, z: -40.0, scale: 6.5, rotY: 4.2 },

        // DISTANT MIST SILHOUETTES (Softly fading into green atmospheric fog)
        { x: -8.0, z: -55, scale: 6.8, rotY: 2.4 },
        { x: 8.2, z: -56, scale: 6.8, rotY: 3.7 },
        { x: -7.5, z: -70, scale: 6.4, rotY: 0.8 },
        { x: 7.8, z: -72, scale: 6.4, rotY: 4.2 }
      ];

      treeList.forEach((cfg) => {
        const tree = models.tree.clone();
        tree.scale.setScalar(cfg.scale);
        tree.rotation.y = cfg.rotY;
        if (cfg.tiltZ) tree.rotation.z = cfg.tiltZ;
        groundObject(tree, cfg.x, cfg.z, -1.25);
        scene.add(tree);
      });
    });

    // ---------------------------------------------------------
    // B. EXPOSED GNARLED ROOTS (`root_cluster_01`)
    // Creeping from tree trunks across the soil
    // ---------------------------------------------------------
    gltfLoader.load('/models/root_cluster_01/root_cluster_01_1k.gltf', (gltf) => {
      models.rootCluster = gltf.scene;
      setupModel(models.rootCluster);

      const rootConfigs = [
        { x: -3.8, z: 8.0, scale: 0.62, rotY: 0.7 },
        { x: 3.8, z: 5.5, scale: 0.64, rotY: 2.8 },
        { x: -3.9, z: -2.0, scale: 0.68, rotY: 4.2 },
        { x: 4.0, z: -6.5, scale: 0.70, rotY: 1.5 },
        // Gnarled roots anchoring the Sacred Monument dais
        { x: 3.8, z: -15.5, scale: 0.78, rotY: 1.6 },
        { x: 1.4, z: -17.0, scale: 0.70, rotY: 3.9 },
        // Deep forest roots
        { x: -4.2, z: -35, scale: 0.74, rotY: 2.1 },
        { x: 4.4, z: -46, scale: 0.76, rotY: 0.8 }
      ];

      rootConfigs.forEach((cfg) => {
        const root = models.rootCluster.clone();
        root.scale.setScalar(cfg.scale);
        root.rotation.y = cfg.rotY;
        groundObject(root, cfg.x, cfg.z, -0.15);
        scene.add(root);
      });
    });

    // ---------------------------------------------------------
    // C. SCATTERED ANCIENT BORDER STONES (`stone_01` & `rock_07`)
    // Natural edging along the flagstone road
    // ---------------------------------------------------------
    gltfLoader.load('/models/stone_01/stone_01_1k.gltf', (gltf) => {
      models.stone1 = gltf.scene;
      setupModel(models.stone1);

      for (let z = 10.5; z > -95; z -= 3.2) {
        const pX = getTrailX(z);
        const side = Math.sin(z * 1.7) > 0 ? 1 : -1;
        const borderX = pX + side * (1.90 + Math.sin(z * 0.9) * 0.35);

        const stone = models.stone1.clone();
        stone.scale.setScalar(0.38 + Math.sin(z * 2.8) * 0.12);
        stone.rotation.y = Math.sin(z * 4.1) * Math.PI;
        groundObject(stone, borderX, z, -0.06);
        scene.add(stone);
      }
    });

    gltfLoader.load('/models/rock_07/rock_07_1k.gltf', (gltf) => {
      models.rock7 = gltf.scene;
      setupModel(models.rock7);

      for (let z = 9.5; z > -90; z -= 3.8) {
        const pX = getTrailX(z);
        const side = Math.cos(z * 1.5) > 0 ? -1 : 1;
        const borderX = pX + side * (2.05 + Math.cos(z * 1.1) * 0.35);

        const stone = models.rock7.clone();
        stone.scale.setScalar(0.35 + Math.cos(z * 2.5) * 0.10);
        stone.rotation.y = Math.cos(z * 3.3) * Math.PI;
        groundObject(stone, borderX, z, -0.07);
        scene.add(stone);
      }
    });

    // ---------------------------------------------------------
    // D. MOSSY BOULDERS & NATURAL ROCK FORMATIONS
    // Sunk firmly into the loam (ZERO FLOATING ROCKS!)
    // ---------------------------------------------------------
    gltfLoader.load('/models/boulder_01/boulder_01_1k.gltf', (gltf) => {
      models.boulder = gltf.scene;
      setupModel(models.boulder);

      const boulderConfigs = [
        { x: -5.6, z: 3.5, scale: 0.92, rotY: 0.8 },
        { x: 5.8, z: 1.5, scale: 0.96, rotY: 2.7 },
        { x: -5.9, z: -7.5, scale: 1.05, rotY: 4.2 },
        { x: 6.0, z: -14.0, scale: 1.10, rotY: 1.6 },
        { x: 4.0, z: -15.0, scale: 0.82, rotY: 2.4 }, // Nestled beside monument dais
        { x: -6.2, z: -24.0, scale: 1.15, rotY: 3.4 },
        { x: 6.4, z: -44.0, scale: 1.20, rotY: 1.9 }
      ];

      boulderConfigs.forEach((cfg) => {
        const b = models.boulder.clone();
        b.scale.setScalar(cfg.scale);
        b.rotation.y = cfg.rotY;
        groundObject(b, cfg.x, cfg.z, -0.30);
        scene.add(b);
      });
    });

    // ---------------------------------------------------------
    // E. SMALL STORY ELEMENTS:
    // Fallen branches, mossy stumps, broken markers, partially buried relics
    // ---------------------------------------------------------
    gltfLoader.load('/models/dead_tree_trunk/dead_tree_trunk_1k.gltf', (gltf) => {
      models.trunk = gltf.scene;
      setupModel(models.trunk);

      const trunkConfigs = [
        { x: 3.6, z: 1.2, scale: 0.95, rotY: 0.6 }, // Fallen mossy branch beside trail
        { x: -4.6, z: -11.5, scale: 1.05, rotY: 2.4 },
        { x: 5.0, z: -34.0, scale: 1.15, rotY: 1.4 }
      ];

      trunkConfigs.forEach((cfg) => {
        const trunk = models.trunk.clone();
        trunk.scale.setScalar(cfg.scale);
        trunk.rotation.y = cfg.rotY;
        groundObject(trunk, cfg.x, cfg.z, -0.06);
        scene.add(trunk);
      });
    });

    gltfLoader.load('/models/tree_stump_01/tree_stump_01_1k.gltf', (gltf) => {
      models.stump = gltf.scene;
      setupModel(models.stump);

      const stumpConfigs = [
        { x: -3.6, z: -5.5, scale: 0.78, rotY: 1.2 }, // Old mossy stump with roots
        { x: 4.4, z: 3.5, scale: 0.72, rotY: 2.9 },
        { x: -4.8, z: -27.0, scale: 0.85, rotY: 0.5 }
      ];

      stumpConfigs.forEach((cfg) => {
        const stump = models.stump.clone();
        stump.scale.setScalar(cfg.scale);
        stump.rotation.y = cfg.rotY;
        groundObject(stump, cfg.x, cfg.z, -0.09);
        scene.add(stump);
      });
    });

    // Broken ancient milestone markers (chipped stone obelisks along the trail)
    const markerMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.88,
      metalness: 0.06,
      color: 0x827c6e
    });

    const marker1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.75, 0.28), markerMat);
    marker1.rotation.y = 0.42;
    marker1.rotation.z = -0.15; // Tilted naturally in the soil
    marker1.castShadow = true;
    groundObject(marker1, getTrailX(3.5) - 1.85, 3.5, 0.02);
    scene.add(marker1);

    const marker2 = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.65, 0.26), markerMat);
    marker2.rotation.y = -0.35;
    marker2.rotation.z = 0.18;
    marker2.castShadow = true;
    groundObject(marker2, getTrailX(-4.5) + 1.95, -4.5, 0.02);
    scene.add(marker2);

    // Weathered ancient wooden sign fragment
    const woodMat = new THREE.MeshStandardMaterial({
      roughness: 0.92,
      metalness: 0.02,
      color: 0x54412f
    });
    const postMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.2, 8), woodMat);
    postMesh.rotation.z = 0.12;
    postMesh.rotation.x = -0.08;
    postMesh.castShadow = true;
    groundObject(postMesh, getTrailX(-0.5) - 1.90, -0.5, 0.10);
    scene.add(postMesh);

    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.04), woodMat);
    signBoard.position.set(0, 0.42, 0.05);
    signBoard.rotation.z = -0.10;
    postMesh.add(signBoard);

    // Partially buried ancient stone artifact (carved spherical relic half-submerged in moss)
    const relicGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const relicMesh = new THREE.Mesh(relicGeo, markerMat);
    relicMesh.scale.set(1.0, 0.85, 1.0);
    relicMesh.castShadow = true;
    groundObject(relicMesh, getTrailX(0.8) + 2.2, 0.8, -0.16); // Half-buried
    scene.add(relicMesh);

    // ---------------------------------------------------------
    // F. FERNS & NATURAL VEGETATION CLUSTERS
    // ---------------------------------------------------------
    gltfLoader.load('/models/fern_02/fern_02_1k.gltf', (gltf) => {
      models.fern = gltf.scene;
      setupModel(models.fern);

      for (let z = 11; z > -75; z -= 2.2) {
        const pathCenter = getTrailX(z);
        const sideLeft = pathCenter - (2.15 + Math.sin(z * 1.3) * 0.55);
        const sideRight = pathCenter + (2.15 + Math.cos(z * 1.5) * 0.55);

        [sideLeft, sideRight].forEach((x) => {
          const fern = models.fern.clone();
          fern.scale.setScalar(0.72 + Math.sin(z * 2.1) * 0.25);
          fern.rotation.y = (z * 1.7) % (Math.PI * 2);
          groundObject(fern, x, z, -0.02);
          scene.add(fern);
        });
      }
    });

    gltfLoader.load('/models/shrub_02/shrub_02_1k.gltf', (gltf) => {
      models.shrub = gltf.scene;
      setupModel(models.shrub);

      const shrubConfigs = [
        { x: -4.2, z: 6.5, scale: 0.85 },
        { x: 4.4, z: -0.5, scale: 0.90 },
        { x: -4.5, z: -8.5, scale: 0.95 },
        { x: 4.6, z: -27.0, scale: 1.00 },
        { x: -4.8, z: -44.0, scale: 1.00 }
      ];

      shrubConfigs.forEach((cfg) => {
        const shrub = models.shrub.clone();
        shrub.scale.setScalar(cfg.scale);
        shrub.rotation.y = Math.random() * Math.PI * 2;
        groundObject(shrub, cfg.x, cfg.z, -0.04);
        scene.add(shrub);
      });
    });

    // =========================================================
    // 7. THE SACRED MONUMENT (COMMANDING DISCOVERY POINT)
    // Multi-tiered stone foundation platform, weathered steps,
    // surrounding boulders and roots, warm golden illumination,
    // contact shadow, perfectly framed beside the ancient path!
    // =========================================================
    const monumentGroup = new THREE.Group();
    const monZ = -15.5;
    const monX = getTrailX(monZ) + 2.4; // Naturally framed beside the path
    const monY = getTerrainHeight(monX, monZ);
    monumentGroup.position.set(monX, monY, monZ);
    monumentGroup.scale.setScalar(1.20);

    const daisMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.84,
      metalness: 0.08,
      color: 0x7a7468
    });

    // Lower foundation plinth partially embedded in the soil
    const daisGeo2 = new THREE.BoxGeometry(4.8, 0.35, 4.2);
    const dais2 = new THREE.Mesh(daisGeo2, daisMat);
    dais2.position.y = -0.08;
    dais2.receiveShadow = true;
    monumentGroup.add(dais2);

    // Raised upper stone dais
    const daisGeo1 = new THREE.BoxGeometry(4.0, 0.40, 3.4);
    const dais1 = new THREE.Mesh(daisGeo1, daisMat);
    dais1.position.y = 0.22;
    dais1.castShadow = true;
    dais1.receiveShadow = true;
    monumentGroup.add(dais1);

    // Weathered stone approach steps leading from the path
    const stepGeo = new THREE.BoxGeometry(1.8, 0.22, 0.95);
    const step1 = new THREE.Mesh(stepGeo, daisMat);
    step1.position.set(-1.15, 0.11, 1.35);
    step1.rotation.y = -0.34;
    step1.castShadow = true;
    step1.receiveShadow = true;
    monumentGroup.add(step1);

    // Granite Stele Pillar
    const steleGeo = new THREE.BoxGeometry(2.2, 4.4, 0.80);
    const steleMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.76,
      metalness: 0.14,
      color: 0x8a8475
    });
    const steleMesh = new THREE.Mesh(steleGeo, steleMat);
    steleMesh.position.y = 2.45;
    steleMesh.castShadow = true;
    steleMesh.receiveShadow = true;
    monumentGroup.add(steleMesh);

    // Classical cornice top
    const corniceGeo = new THREE.BoxGeometry(2.5, 0.28, 1.0);
    const corniceMesh = new THREE.Mesh(corniceGeo, daisMat);
    corniceMesh.position.y = 4.70;
    corniceMesh.castShadow = true;
    monumentGroup.add(corniceMesh);

    // Flanking weathered archaeological columns
    const colGeo = new THREE.CylinderGeometry(0.32, 0.38, 2.9, 14);
    const colMesh1 = new THREE.Mesh(colGeo, daisMat);
    colMesh1.position.set(-1.7, 1.45, -0.4);
    colMesh1.castShadow = true;
    colMesh1.receiveShadow = true;
    monumentGroup.add(colMesh1);

    const colMesh2 = new THREE.Mesh(colGeo, daisMat);
    colMesh2.position.set(1.7, 1.15, -0.4);
    colMesh2.castShadow = true;
    colMesh2.receiveShadow = true;
    monumentGroup.add(colMesh2);

    // High-resolution Carved Inscription Plaque face with glowing golden glyphs
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 1024;
    const pctxPlaque = plaqueCanvas.getContext('2d');

    pctxPlaque.fillStyle = '#181714';
    pctxPlaque.fillRect(0, 0, 1024, 1024);

    // Double carved gold border
    pctxPlaque.strokeStyle = '#c5a059';
    pctxPlaque.lineWidth = 16;
    pctxPlaque.strokeRect(36, 36, 952, 952);
    pctxPlaque.strokeStyle = '#7a5f2a';
    pctxPlaque.lineWidth = 5;
    pctxPlaque.strokeRect(52, 52, 920, 920);

    pctxPlaque.textAlign = 'center';
    pctxPlaque.fillStyle = '#ffe08a';
    pctxPlaque.font = '900 76px "Cinzel", "Times New Roman", serif';
    pctxPlaque.fillText('▲  ASTRA  ▲', 512, 175);

    pctxPlaque.fillStyle = '#d4af37';
    pctxPlaque.font = '700 36px "Cinzel", "Times New Roman", serif';
    pctxPlaque.fillText('NATIONAL LEVEL HACKATHON 2026', 512, 245);

    pctxPlaque.fillStyle = '#a69270';
    pctxPlaque.font = '500 24px monospace';
    pctxPlaque.fillText('• SACRED CHRONICLES OF FRONTIER INNOVATION •', 512, 315);

    pctxPlaque.fillStyle = '#ffffff';
    pctxPlaque.font = '400 32px "Inter", sans-serif';
    pctxPlaque.fillText('A 36-HOUR ENDURANCE EXPEDITION ACROSS REALMS', 512, 425);
    pctxPlaque.fillText('OF ARTIFICIAL INTELLIGENCE, BIO-COMPUTING', 512, 485);
    pctxPlaque.fillText('AND ADVANCED DISTRIBUTED ARCHITECTURE.', 512, 545);

    pctxPlaque.fillStyle = '#c5a059';
    pctxPlaque.font = '600 30px "Cinzel", "Times New Roman", serif';
    pctxPlaque.fillText('DURATION: 36 HOURS  |  PRIZE POOL: ₹1,00,000+', 512, 665);
    pctxPlaque.fillText('DATE: MARCH 2026  |  CAMPUS: KCT', 512, 725);

    pctxPlaque.fillStyle = '#94815a';
    pctxPlaque.font = 'italic 26px serif';
    pctxPlaque.fillText('“Where ancient discipline unlocks tomorrow’s boundless frontiers.”', 512, 845);

    const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
    const plaqueGeo = new THREE.PlaneGeometry(1.90, 3.50);
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: plaqueTex,
      roughness: 0.62,
      metalness: 0.38,
      emissive: 0x241806,
      emissiveIntensity: 0.45
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.position.set(0, 2.45, 0.43);
    monumentGroup.add(plaqueMesh);

    monumentGroup.rotation.y = -0.45;
    scene.add(monumentGroup);

    // Warm golden discovery illumination highlighting the monument
    const monumentLight = new THREE.PointLight(0xffdf88, 3.5, 16, 1.4);
    monumentLight.position.set(monX - 0.4, monY + 1.6, monZ + 0.8);
    monumentLight.castShadow = true;
    scene.add(monumentLight);

    // Contact shadow base beneath the monument foundation
    const monShadowGeo = new THREE.PlaneGeometry(6.0, 5.4);
    monShadowGeo.rotateX(-Math.PI / 2);
    const monShadow = new THREE.Mesh(monShadowGeo, shadowSkirtMat);
    monShadow.position.set(monX, monY + 0.006, monZ);
    scene.add(monShadow);

    // Weathered ancient relic statue beside the trail at Station 03 (x = -3.6, z = -46)
    gltfLoader.load('/models/gothic_statue/gothic_statue_1k.gltf', (gltf) => {
      const statueModel = gltf.scene;
      setupModel(statueModel);

      const { wrapper: sDeep } = createCenteredWrapper(statueModel.clone());
      sDeep.rotation.y = 0.85;
      sDeep.scale.setScalar(1.35);
      groundObject(sDeep, getTrailX(-46) - 3.6, -46, -0.05);
      scene.add(sDeep);
    });

    // =========================================================
    // 8. INTERACTIVE MOUSE PARALLAX & RESIZE HANDLERS
    // =========================================================
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMousePos.current = { x: nx * 0.15, y: ny * 0.09 };
    };

    const handleResize = () => {
      if (!container || !renderer || !camera || !composer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // =========================================================
    // 9. ANIMATION LOOP & PRECISE HUMAN EYE-LEVEL CAMERA PATH
    // Eye level: 1.58m, perfectly smooth tracking, zero polygon revealing!
    // Perfect composition: Canopy -> Distant Mist -> Monument -> Path -> Camera
    // =========================================================
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Mouse smoothing
      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;

      // Smooth scroll progress interpolation
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.055;
      const p = currentProgress.current;

      // Audio footstep cadence during scroll
      if (Math.abs(p - lastFootstepProgress.current) > 0.025) {
        lastFootstepProgress.current = p;
        ancientSoundscape.playFootstep();
      }

      // -------------------------------------------------------
      // SMOOTH CINEMATIC CAMERA CHOREOGRAPHY
      // Perfect hierarchy: Canopy (top) -> Distant Mist -> Monument -> Path -> Camera
      // -------------------------------------------------------
      let camX, camY, camZ, lookX, lookY, lookZ;

      if (p <= 0.20) {
        // SEGMENT 1: 01 ANCIENT FOREST ENTRANCE (z: 8.0 -> -7.5)
        // Camera at human eye-level (1.58m), looking down the hero path straight toward the monument
        const seg = p / 0.20;
        camZ = THREE.MathUtils.lerp(8.0, -7.5, seg);
        camX = getTrailX(camZ);
        const groundY = getTerrainHeight(camX, camZ);
        camY = groundY + 1.58; // Human eye level

        const monTargetX = getTrailX(-15.5) + 2.4;
        const monTargetY = getTerrainHeight(monTargetX, -15.5) + 2.2;

        // Eye naturally guided along the stone path straight toward the Sacred Monument
        lookX = THREE.MathUtils.lerp(camX * 0.5, monTargetX * 0.55, seg);
        lookY = THREE.MathUtils.lerp(camY + 0.04, monTargetY * 0.75, seg);
        lookZ = THREE.MathUtils.lerp(-15.0, -15.5, seg);
      } else if (p <= 0.44) {
        // SEGMENT 2: 02 SACRED MONUMENT (z: -7.5 -> -23.0)
        // Camera glides along the trail passing the Sacred Monument on the right
        const seg = (p - 0.20) / 0.24;
        camZ = THREE.MathUtils.lerp(-7.5, -23.0, seg);
        camX = getTrailX(camZ);
        const groundY = getTerrainHeight(camX, camZ);
        camY = groundY + 1.60;

        const steleX = getTrailX(-15.5) + 2.4;
        const steleY = getTerrainHeight(steleX, -15.5) + 2.2;

        // Frames the stele while leading forward into the continuing trail
        lookX = THREE.MathUtils.lerp(steleX * 0.60, getTrailX(camZ - 16.0), seg);
        lookY = THREE.MathUtils.lerp(steleY * 0.80, getTerrainHeight(lookX, camZ - 16.0) + 1.65, seg);
        lookZ = THREE.MathUtils.lerp(-15.5, camZ - 16.0, seg);
      } else if (p <= 0.70) {
        // SEGMENT 3: 03 DEEP FOREST (z: -23.0 -> -58.0)
        const seg = (p - 0.44) / 0.26;
        camZ = THREE.MathUtils.lerp(-23.0, -58.0, seg);
        camX = getTrailX(camZ);
        const groundY = getTerrainHeight(camX, camZ);
        camY = groundY + 1.62;

        const targetZ = camZ - 16.0;
        lookX = getTrailX(targetZ);
        lookY = getTerrainHeight(lookX, targetZ) + 1.75;
        lookZ = targetZ;
      } else if (p <= 0.88) {
        // SEGMENT 4: 04 ANCIENT RUINS (z: -58.0 -> -88.0)
        const seg = (p - 0.70) / 0.18;
        camZ = THREE.MathUtils.lerp(-58.0, -88.0, seg);
        camX = getTrailX(camZ);
        const groundY = getTerrainHeight(camX, camZ);
        camY = groundY + 1.68;

        const targetZ = camZ - 18.0;
        lookX = getTrailX(targetZ);
        lookY = getTerrainHeight(lookX, targetZ) + 1.85;
        lookZ = targetZ;
      } else {
        // SEGMENT 5: 05 CITADEL RIDGE (z: -88.0 -> -118.0)
        const seg = (p - 0.88) / 0.12;
        camZ = THREE.MathUtils.lerp(-88.0, -118.0, seg);
        camX = getTrailX(camZ);
        const groundY = getTerrainHeight(camX, camZ);
        camY = groundY + 1.80;

        lookX = 0.0;
        lookY = groundY + 2.4;
        lookZ = camZ - 22.0;
      }

      // Dynamic terrain clearance guard
      const currentGroundY = getTerrainHeight(camX, camZ);
      const minSafeY = currentGroundY + 1.52;
      if (camY < minSafeY) {
        camY = minSafeY;
      }

      // Natural human walking sway
      const walkBobY = Math.sin(p * 38) * 0.010;
      const walkBobX = Math.cos(p * 19) * 0.005;

      camera.position.set(
        camX + walkBobX + mousePos.current.x * 0.20,
        camY + walkBobY + mousePos.current.y * 0.10,
        camZ
      );

      camera.lookAt(
        lookX + mousePos.current.x * 0.65,
        lookY + mousePos.current.y * 0.35,
        lookZ
      );

      camera.rotation.z = mousePos.current.x * -0.002;

      composer.render();
    };

    animate();

    return () => {
      isDisposed = true;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      composer.dispose();
    };
  }, [onSceneReady]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full pointer-events-auto" />

      {/* =========================================================
          CINEMATIC PRELOADER SCREEN
          ========================================================= */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-[#040805] flex flex-col items-center justify-center pointer-events-auto transition-opacity duration-1000">
          <div className="flex flex-col items-center max-w-md px-6 text-center">
            
            <div className="w-16 h-16 mb-6 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-gradient-to-b from-[#d4af37]/10 to-transparent shadow-[0_0_25px_rgba(212,175,55,0.2)] animate-pulse">
              <span className="font-ancient text-2xl text-[#ffd700]">▲</span>
            </div>

            <h1 className="font-ancient text-3xl sm:text-4xl font-black tracking-[0.3em] text-white mb-2">
              ASTRA
            </h1>
            <p className="font-ancient text-xs tracking-[0.25em] text-[#d4af37] uppercase mb-8">
              Entering The Ancient Expedition
            </p>

            <div className="w-64 h-1.5 bg-black/60 rounded-full border border-gray-800 overflow-hidden mb-4 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#ffe58f] rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_#d4af37]"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <div className="flex justify-between w-64 font-ancient text-[10px] tracking-widest text-gray-400">
              <span className="truncate max-w-[180px]">{loadingText}</span>
              <span className="text-[#ffd700] font-bold">{loadProgress}%</span>
            </div>

            <p className="mt-8 font-ancient text-[9px] tracking-[0.2em] text-gray-600 uppercase">
              Continuous 3D WebGL PBR • Sage Vaidya Province
            </p>
          </div>
        </div>
      )}

      {/* =========================================================
          IN-WORLD DISCOVERY BADGE: THE SACRED MONUMENT (STATION 02)
          ========================================================= */}
      {isLoaded && scrollProgress >= 0.22 && scrollProgress <= 0.44 && (
        <div className="fixed top-1/2 right-8 sm:right-16 -translate-y-1/2 z-20 pointer-events-auto max-w-sm transition-all duration-500 ease-out animate-fadeIn">
          <div className="bg-black/85 border border-[#d4af37]/60 rounded-lg p-5 backdrop-blur-md shadow-[0_0_35px_rgba(0,0,0,0.85),0_0_18px_rgba(212,175,55,0.2)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="font-ancient text-[10px] tracking-[0.25em] text-[#d4af37] uppercase">
                Discovery • Station 02
              </span>
            </div>
            
            <h3 className="font-ancient text-base sm:text-lg font-bold text-white tracking-widest mb-1">
              THE SACRED MONUMENT
            </h3>
            
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Weathered granite stele carved with ancient Sanskrit statutes, the 36-hour endurance timeline, and the ₹1,00,000+ bounty of ASTRA.
            </p>

            <button
              onClick={() => onOpenAboutModal && onOpenAboutModal()}
              className="w-full py-2.5 px-4 rounded border border-[#d4af37] bg-gradient-to-r from-[#d4af37]/25 to-[#d4af37]/10 hover:from-[#d4af37]/45 hover:to-[#d4af37]/25 text-[#ffd700] font-ancient text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer text-center"
            >
              Inspect Inscription →
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          IN-WORLD DISCOVERY BADGE: ANCIENT RUINS (STATION 04)
          ========================================================= */}
      {isLoaded && scrollProgress >= 0.70 && scrollProgress <= 0.86 && (
        <div className="fixed top-1/2 left-8 sm:left-16 -translate-y-1/2 z-20 pointer-events-auto max-w-sm transition-all duration-500 ease-out animate-fadeIn">
          <div className="bg-black/85 border border-[#d4af37]/60 rounded-lg p-5 backdrop-blur-md shadow-[0_0_35px_rgba(0,0,0,0.85),0_0_18px_rgba(212,175,55,0.2)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="font-ancient text-[10px] tracking-[0.25em] text-[#d4af37] uppercase">
                Discovery • Station 04
              </span>
            </div>
            
            <h3 className="font-ancient text-base sm:text-lg font-bold text-white tracking-widest mb-1">
              ANCIENT ARCHAEOLOGICAL RUINS
            </h3>
            
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Centuries-old stone gateway, broken fortress ramparts, and overgrown statues. The trail climbs ancient stairs toward Citadel Ridge.
            </p>

            <div className="font-ancient text-[10px] text-[#ffd700]/90 tracking-widest uppercase">
              • Ascend Mountain Stairs Toward Ridge •
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          IN-WORLD DISCOVERY BADGE: CITADEL RIDGE (STATION 05)
          ========================================================= */}
      {isLoaded && scrollProgress >= 0.88 && (
        <div className="fixed top-1/2 right-8 sm:right-16 -translate-y-1/2 z-20 pointer-events-auto max-w-sm transition-all duration-500 ease-out animate-fadeIn">
          <div className="bg-black/85 border border-[#d4af37]/60 rounded-lg p-5 backdrop-blur-md shadow-[0_0_35px_rgba(0,0,0,0.85),0_0_18px_rgba(212,175,55,0.2)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ffd700] animate-ping" />
              <span className="font-ancient text-[10px] tracking-[0.25em] text-[#d4af37] uppercase">
                Grand Reveal • Station 05
              </span>
            </div>
            
            <h3 className="font-ancient text-base sm:text-lg font-bold text-white tracking-widest mb-1">
              THE CITADEL RIDGE
            </h3>
            
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Emerging above the mountain tree line, the vast mountain realm unfolds. The Colossal Final Citadel stands revealed upon the sunlit peaks.
            </p>

            <div className="font-ancient text-[10px] text-[#ffd700] tracking-widest uppercase font-semibold">
              ▲ Expedition Summit Reached • Final Citadel Ahead ▲
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Ancient3DWorld;
