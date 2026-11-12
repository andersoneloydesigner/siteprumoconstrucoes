/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

interface PlumbBob3DIntroProps {
  onStartExit?: () => void;
  onComplete?: () => void;
}

/**
 * Generates procedural brushed machined steel albedo & bump textures
 * with horizontal lathe turn lines and subtle metallic surface grain.
 */
function createSteelTextures(maxAnisotropy: number) {
  const width = 1024;
  const height = 1024;

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext("2d")!;

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext("2d")!;

  // Base metallic steel gradient
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0.0, "#dce0e6");
  baseGrad.addColorStop(0.25, "#cdd2d9");
  baseGrad.addColorStop(0.5, "#b8bec6");
  baseGrad.addColorStop(0.75, "#ccd1d8");
  baseGrad.addColorStop(1.0, "#c2c7cf");
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  bumpCtx.fillStyle = "#808080";
  bumpCtx.fillRect(0, 0, width, height);

  // Fine horizontal lathe-turned micro-grooves across the cylinder & cone
  for (let y = 0; y < height; y += 1) {
    const variation = (Math.sin(y * 0.9) * 0.5 + (Math.random() - 0.5)) * 15;
    const shade = Math.max(152, Math.min(240, Math.round(202 + variation)));
    ctx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 5})`;
    ctx.fillRect(0, y, width, 1);

    const bumpShade = Math.max(92, Math.min(168, Math.round(128 + variation * 1.45)));
    bumpCtx.fillStyle = `rgb(${bumpShade}, ${bumpShade}, ${bumpShade})`;
    bumpCtx.fillRect(0, y, width, 1);
  }

  // Subtle machined steel surface marks & micro-grain
  for (let i = 0; i < 480; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const w = 6 + Math.random() * 58;
    const h = 1 + Math.random() * 2.2;
    const dark = Math.random() > 0.44;
    ctx.fillStyle = dark ? "rgba(62, 68, 78, 0.085)" : "rgba(255, 255, 255, 0.11)";
    ctx.fillRect(x, y, w, h);
  }

  const colorTex = new THREE.CanvasTexture(colorCanvas);
  colorTex.wrapS = THREE.RepeatWrapping;
  colorTex.wrapT = THREE.ClampToEdgeWrapping;
  colorTex.colorSpace = THREE.SRGBColorSpace;
  colorTex.anisotropy = maxAnisotropy;

  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  bumpTex.wrapS = THREE.RepeatWrapping;
  bumpTex.wrapT = THREE.ClampToEdgeWrapping;
  bumpTex.anisotropy = maxAnisotropy;

  return { colorTex, bumpTex };
}

/**
 * Generates a high-contrast, deep laser-etched "PRUMO" + "CONSTRUÇÕES" directly underneath it,
 * mapped cleanly onto the upper smooth cylindrical section of the pointed steel plumb bob.
 */
function createLaserEngravingTexture(maxAnisotropy: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;

  ctx.save();
  ctx.translate(cx, 256);

  // Subtle bright bottom edge bevel to simulate recessed laser engraving in brushed steel
  ctx.shadowColor = "rgba(255, 255, 255, 0.78)";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 1;

  // Top line: Bold "PRUMO" in high-contrast deep laser-etched dark navy/charcoal
  ctx.font = "900 148px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#071120";
  ctx.strokeStyle = "#071120";
  ctx.lineWidth = 4;
  ctx.strokeText("PRUMO", 0, -48);
  ctx.fillText("PRUMO", 0, -48);

  // Directly below PRUMO: "CONSTRUÇÕES"
  ctx.font = "800 58px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillStyle = "#0b1d36";
  ctx.strokeStyle = "#0b1d36";
  ctx.lineWidth = 1.8;
  ctx.strokeText("CONSTRUÇÕES", 0, 66);
  ctx.fillText("CONSTRUÇÕES", 0, 66);

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/**
 * Generates a realistic braided white/silver nylon cord texture.
 */
function createBraidedCordTexture(maxAnisotropy: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#e4e7ec";
  ctx.fillRect(0, 0, 128, 256);

  ctx.strokeStyle = "#b0b7c2";
  ctx.lineWidth = 10;
  for (let y = -128; y < 384; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y + 64);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(128, y + 12);
    ctx.lineTo(0, y + 76);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 24);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export default function PlumbBob3DIntro({ onStartExit, onComplete }: PlumbBob3DIntroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onStartExitRef = useRef(onStartExit);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartExitRef.current = onStartExit;
    onCompleteRef.current = onComplete;
  }, [onStartExit, onComplete]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL guard from GPU renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement("canvas").getContext("webgl2");
      if (!gl) return true;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // 2. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    const isMobile = width < 640;
    camera.position.set(0, -0.1, isMobile ? 10.2 : 8.7);
    camera.lookAt(0, -0.25, 0);

    // 4. Balanced 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xeef6ff, 0x1e3a5f, 0.88);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff9f0, 2.45);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8ecaff, 1.35);
    fillLight.position.set(-6, 3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x0893e6, 1.85);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // 5. Procedural Textures & Materials
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const { colorTex: steelColorTex, bumpTex: steelBumpTex } = createSteelTextures(maxAnisotropy);
    const engravingTex = createLaserEngravingTexture(maxAnisotropy);
    const cordTex = createBraidedCordTexture(maxAnisotropy);

    // 6. Pointed Steel Plumb Bob + Single Continuous Braided Cord Assembly (No Extra Object on the Cord)
    const plumbAssembly = new THREE.Group();
    plumbAssembly.position.y = 8.5; // Starts above the top of the screen
    scene.add(plumbAssembly);

    // High Pendulum Pivot Point above the viewport so the cord and plumb bob swing as one natural pendulum
    const pendulumPivotGroup = new THREE.Group();
    pendulumPivotGroup.position.set(0, 4.5, 0);
    plumbAssembly.add(pendulumPivotGroup);

    // Suspended Pointed Steel Plumb Bob Group
    const suspendedBobGroup = new THREE.Group();
    suspendedBobGroup.position.set(0, -4.5, 0);
    pendulumPivotGroup.add(suspendedBobGroup);

    // --- PART 1: Machined Brushed Steel Pointed Plumb Bob (LatheGeometry matching reference image) ---
    // Features:
    // - Sharp conical bottom tip (y = -2.35 to y = -0.90)
    // - Lower smooth cylindrical band (y = -0.90 to y = -0.46)
    // - 4 distinct horizontal lathe-turned grooves in the middle section (y = -0.46 to y = +0.18)
    // - Upper smooth cylindrical band (y = +0.18 to y = +0.92) where "PRUMO / CONSTRUÇÕES" is engraved
    // - Rounded/beveled top shoulder leading into a raised knurled/hexagonal top nut
    const R = 1.02;
    const lathePoints: THREE.Vector2[] = [
      // Sharp conical bottom point
      new THREE.Vector2(0.0, -2.35),
      new THREE.Vector2(0.025, -2.33),
      // Smooth conical taper up to cylinder base
      new THREE.Vector2(0.51, -1.62),
      new THREE.Vector2(R - 0.015, -0.94),
      new THREE.Vector2(R, -0.90),

      // Lower smooth cylindrical band
      new THREE.Vector2(R, -0.46),

      // Groove 1 (y = -0.46 to -0.38)
      new THREE.Vector2(R - 0.038, -0.43),
      new THREE.Vector2(R - 0.038, -0.41),
      new THREE.Vector2(R, -0.38),

      // Rib 1
      new THREE.Vector2(R, -0.26),

      // Groove 2 (y = -0.26 to -0.18)
      new THREE.Vector2(R - 0.038, -0.23),
      new THREE.Vector2(R - 0.038, -0.21),
      new THREE.Vector2(R, -0.18),

      // Rib 2
      new THREE.Vector2(R, -0.06),

      // Groove 3 (y = -0.06 to +0.02)
      new THREE.Vector2(R - 0.038, -0.03),
      new THREE.Vector2(R - 0.038, -0.01),
      new THREE.Vector2(R, 0.02),

      // Rib 3
      new THREE.Vector2(R, 0.14),

      // Groove 4 (y = +0.14 to +0.22)
      new THREE.Vector2(R - 0.038, 0.17),
      new THREE.Vector2(R - 0.038, 0.19),
      new THREE.Vector2(R, 0.22),

      // Generous upper smooth cylindrical band for "PRUMO" + "CONSTRUÇÕES" below it (y = 0.22 to 0.90)
      new THREE.Vector2(R, 0.90),

      // Rounded / chamfered top shoulder (like the reference image)
      new THREE.Vector2(R - 0.03, 0.95),
      new THREE.Vector2(R - 0.09, 0.99),
      new THREE.Vector2(R - 0.18, 1.01),
      // Slightly domed top deck leading to central threaded nut
      new THREE.Vector2(0.24, 1.04),
      new THREE.Vector2(0.22, 1.04),
      new THREE.Vector2(0.0, 1.04),
    ];

    const steelBodyGeo = new THREE.LatheGeometry(lathePoints, 96);
    steelBodyGeo.computeVertexNormals();

    const steelBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: steelColorTex,
      bumpMap: steelBumpTex,
      bumpScale: 0.013,
      metalness: 0.92,
      roughness: 0.23,
      anisotropy: 0.78,
      anisotropyRotation: Math.PI / 2,
      clearcoat: 0.22,
      clearcoatRoughness: 0.24,
      envMapIntensity: 1.38,
    });

    const steelBodyMesh = new THREE.Mesh(steelBodyGeo, steelBodyMat);
    steelBodyMesh.castShadow = !isSoftwareGl;
    steelBodyMesh.receiveShadow = !isSoftwareGl;
    suspendedBobGroup.add(steelBodyMesh);

    // --- PART 1B: Prominent Laser-Engraved "PRUMO" + "CONSTRUÇÕES" Below It on Upper Smooth Band ---
    const upperBandDecalGeo = new THREE.CylinderGeometry(
      R + 0.002,
      R + 0.002,
      0.62,
      64,
      1,
      true,
      -Math.PI * 0.36,
      Math.PI * 0.72
    );

    const engravingMat = new THREE.MeshStandardMaterial({
      map: engravingTex,
      transparent: true,
      roughness: 0.40,
      metalness: 0.35,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      depthWrite: false,
    });

    const frontUpperDecal = new THREE.Mesh(upperBandDecalGeo, engravingMat);
    frontUpperDecal.position.y = 0.56;
    const backUpperDecal = new THREE.Mesh(upperBandDecalGeo, engravingMat);
    backUpperDecal.position.y = 0.56;
    backUpperDecal.rotation.y = Math.PI;

    suspendedBobGroup.add(frontUpperDecal, backUpperDecal);

    // --- PART 2: Knurled / Faceted Steel Top Retaining Nut ("Porca Rosqueada Superior") ---
    const nutGeo = new THREE.CylinderGeometry(0.19, 0.20, 0.14, 16);
    const nutMat = new THREE.MeshStandardMaterial({
      color: 0xbec4cc,
      map: steelColorTex,
      bumpMap: steelBumpTex,
      bumpScale: 0.018,
      metalness: 0.90,
      roughness: 0.30,
      envMapIntensity: 1.35,
    });
    const nutMesh = new THREE.Mesh(nutGeo, nutMat);
    nutMesh.position.y = 1.10;
    nutMesh.castShadow = !isSoftwareGl;
    suspendedBobGroup.add(nutMesh);

    // Top flange washer & cord knot base right above the nut
    const nutCollarGeo = new THREE.TorusGeometry(0.14, 0.025, 16, 36);
    nutCollarGeo.rotateX(Math.PI / 2);
    const nutCollarMesh = new THREE.Mesh(nutCollarGeo, nutMat);
    nutCollarMesh.position.y = 1.17;
    suspendedBobGroup.add(nutCollarMesh);

    // Braided cord knot emerging out of the top nut
    const cordMat = new THREE.MeshStandardMaterial({
      map: cordTex,
      bumpMap: cordTex,
      bumpScale: 0.016,
      roughness: 0.78,
      metalness: 0.05,
    });
    const cordKnotGeo = new THREE.SphereGeometry(0.085, 20, 16);
    cordKnotGeo.scale(1.0, 1.35, 1.0);
    const cordKnotMesh = new THREE.Mesh(cordKnotGeo, cordMat);
    cordKnotMesh.position.y = 1.22;
    suspendedBobGroup.add(cordKnotMesh);

    // --- PART 3: Single Continuous Braided Plumb Line Cord (No Extra Object on the Cord) ---
    const cordGeo = new THREE.CylinderGeometry(0.048, 0.048, 18.0, 24);
    const cordMesh = new THREE.Mesh(cordGeo, cordMat);
    // Extends from the top knot (y = 1.22 in bob space) straight up past the top of the screen
    cordMesh.position.y = 1.22 + 9.0;
    suspendedBobGroup.add(cordMesh);

    // --- PART 4: Soft Radial Contact Grounding Shadow Disc Below Sharp Conical Tip ---
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shCtx = shadowCanvas.getContext("2d")!;
    const radGrad = shCtx.createRadialGradient(128, 128, 8, 128, 128, 118);
    radGrad.addColorStop(0.0, "rgba(4, 30, 66, 0.36)");
    radGrad.addColorStop(0.45, "rgba(8, 147, 230, 0.15)");
    radGrad.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");
    shCtx.fillStyle = radGrad;
    shCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowPlaneGeo = new THREE.PlaneGeometry(3.2, 3.2);
    shadowPlaneGeo.rotateX(-Math.PI / 2);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.0,
    });
    const shadowPlaneMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlaneMesh.position.set(0, -2.68, 0);
    scene.add(shadowPlaneMesh);

    // Pre-compile shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 10.2 : 8.7;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 7. Natural Physics-Based 5-Second Choreography
    let frameId = 0;
    let isDisposed = false;
    let exitTriggered = false;
    let completeTriggered = false;

    const startTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;
      const now = performance.now();
      const elapsed = (now - startTime) / 1000; // Total elapsed seconds (0 -> 5.0s)

      // --- 1. Natural Entrance Descent, Elastic Cord Settle & Upward Exit ---
      if (elapsed < 3.85) {
        // Exponentially damped spring entrance from y = 8.5 down to y = 0
        const entranceProgress = 1 - Math.exp(-elapsed * 3.8) * Math.cos(elapsed * 4.6);
        const yPos = 8.5 * (1 - entranceProgress);
        plumbAssembly.position.y = yPos;

        // Subtle elastic cord stretch on the suspended steel bob as it brakes at the bottom of its descent
        const cordStretch = Math.exp(-elapsed * 2.8) * Math.sin(elapsed * 6.5) * 0.12;
        suspendedBobGroup.position.y = -4.5 - Math.max(0, cordStretch);

        const shadowAlpha = THREE.MathUtils.clamp(1 - yPos / 5.0, 0, 1);
        shadowPlaneMat.opacity = shadowAlpha * 0.84;
      } else {
        // Trigger Hero zoom-out text reveal as the plumb bob starts rising to the top
        if (!exitTriggered && elapsed >= 4.02) {
          exitTriggered = true;
          onStartExitRef.current?.();
        }

        const tUp = Math.min(1, (elapsed - 3.85) / (5.0 - 3.85));
        const easeUp = tUp * tUp * (3 - 2 * tUp);
        plumbAssembly.position.y = Math.pow(easeUp, 1.35) * 11.5;
        suspendedBobGroup.position.y = -4.5;
        shadowPlaneMat.opacity = Math.max(0, (1 - tUp * 2.0) * 0.84);
      }

      // --- 2. Natural Torsional Cord Rotation Ending Dead-Center on "PRUMO / CONSTRUÇÕES" ---
      const twistDecay = Math.exp(-elapsed * 1.18);
      const naturalUntwist = -3.85 * twistDecay * Math.cos(elapsed * 0.85);
      suspendedBobGroup.rotation.y = naturalUntwist;

      // --- 3. True Pendulum Swing from High Cord Pivot ("Entrando no Prumo") ---
      const pendulumDecay = Math.exp(-elapsed * 1.25);
      const swingZ = Math.sin(elapsed * 3.8) * 0.075 * pendulumDecay;
      const swingX = Math.cos(elapsed * 3.1) * 0.045 * pendulumDecay;
      pendulumPivotGroup.rotation.z = swingZ;
      pendulumPivotGroup.rotation.x = swingX;

      // Move the ground contact shadow slightly with the conical tip
      shadowPlaneMesh.position.x = Math.sin(swingZ) * 4.5;
      shadowPlaneMesh.position.z = -Math.sin(swingX) * 4.5;

      renderer.render(scene, camera);

      if (elapsed >= 5.05) {
        if (!completeTriggered) {
          completeTriggered = true;
          onCompleteRef.current?.();
        }
        return;
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener("resize", handleResize);

      // Clean disposal of geometries, materials, and textures
      steelBodyGeo.dispose();
      steelBodyMat.dispose();
      upperBandDecalGeo.dispose();
      engravingMat.dispose();
      nutGeo.dispose();
      nutCollarGeo.dispose();
      nutMat.dispose();
      cordKnotGeo.dispose();
      cordGeo.dispose();
      cordMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();

      steelColorTex.dispose();
      steelBumpTex.dispose();
      engravingTex.dispose();
      cordTex.dispose();
      shadowTex.dispose();
      envTarget.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
    />
  );
}
