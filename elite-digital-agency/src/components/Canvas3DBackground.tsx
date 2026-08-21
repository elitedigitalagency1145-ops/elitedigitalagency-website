import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VisualFigure {
  id: string;
  name: string;
  renderType: 'robot_host' | 'ai_chatbot' | 'neural_brain' | 'voice_soundwave' | 'maps_beacon' | 'cyber_laptop' | 'automation_gear' | 'growth_rocket' | 'elite_crown';
  primaryColor: string;
  glowColor: string;
  accentColor: string;
}

const VISUAL_FIGURES: VisualFigure[] = [
  {
    id: 'voice_host',
    name: 'AI Voice Calling Agent',
    renderType: 'robot_host',
    primaryColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    accentColor: '#fbbf24',
  },
  {
    id: 'ai_chatbot',
    name: 'AI Smart Chatbot',
    renderType: 'ai_chatbot',
    primaryColor: '#06b6d4',
    glowColor: 'rgba(34, 211, 238, 0.6)',
    accentColor: '#38bdf8',
  },
  {
    id: 'neural_brain',
    name: 'AI Neural Core Brain',
    renderType: 'neural_brain',
    primaryColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    accentColor: '#a78bfa',
  },
  {
    id: 'maps_beacon',
    name: 'Google Maps 3D Pin',
    renderType: 'maps_beacon',
    primaryColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    accentColor: '#60a5fa',
  },
  {
    id: 'cyber_laptop',
    name: '3D Web Developer Matrix',
    renderType: 'cyber_laptop',
    primaryColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    accentColor: '#34d399',
  },
  {
    id: 'automation_gear',
    name: 'Autonomous Workflow Engine',
    renderType: 'automation_gear',
    primaryColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    accentColor: '#fb923c',
  },
  {
    id: 'growth_rocket',
    name: 'Meta Ads Growth Rocket',
    renderType: 'growth_rocket',
    primaryColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    accentColor: '#f472b6',
  },
  {
    id: 'elite_crown',
    name: 'Elite Agency Golden Crest',
    renderType: 'elite_crown',
    primaryColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.7)',
    accentColor: '#fde047',
  },
];

// Helper to draw rich 2D canvas illustrations (Cutout Figures with Transparent Backgrounds)
function createFigureTexture(fig: VisualFigure): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const cx = 256;
  const cy = 256;

  // Fully transparent background
  ctx.clearRect(0, 0, 512, 512);

  // Outer ambient neon aura glow (soft radial gradient)
  const aura = ctx.createRadialGradient(cx, cy, 30, cx, cy, 220);
  aura.addColorStop(0, fig.glowColor);
  aura.addColorStop(0.5, fig.glowColor.replace('0.6', '0.2').replace('0.7', '0.25'));
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(cx, cy, 220, 0, Math.PI * 2);
  ctx.fill();

  // Draw Specific 3D Illustrated Figure
  switch (fig.renderType) {
    case 'robot_host': {
      // 1. Futuristic Robot Host with Gold Headphones
      // Head base
      ctx.save();
      const headGrad = ctx.createLinearGradient(cx - 90, cy - 90, cx + 90, cy + 90);
      headGrad.addColorStop(0, '#1e293b');
      headGrad.addColorStop(0.5, '#0f172a');
      headGrad.addColorStop(1, '#020617');
      ctx.fillStyle = headGrad;
      ctx.strokeStyle = fig.accentColor;
      ctx.lineWidth = 4;
      ctx.shadowColor = fig.primaryColor;
      ctx.shadowBlur = 25;

      // Rounded Robot Head Shape
      ctx.beginPath();
      ctx.roundRect(cx - 85, cy - 85, 170, 150, 45);
      ctx.fill();
      ctx.stroke();

      // Cyber Visor / Eye Screen
      ctx.fillStyle = '#060d1a';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cx - 65, cy - 40, 130, 48, 20);
      ctx.fill();
      ctx.stroke();

      // Glowing Cyan Visor Eyes
      ctx.fillStyle = '#22d3ee';
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(cx - 30, cy - 16, 18, 12, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + 30, cy - 16, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden Over-Ear Headphones Arc
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(cx, cy - 30, 115, Math.PI * 0.85, Math.PI * 2.15);
      ctx.stroke();

      // Headphone Ear Pads
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.roundRect(cx - 120, cy - 45, 24, 60, 10);
      ctx.roundRect(cx + 96, cy - 45, 24, 60, 10);
      ctx.fill();

      // Mic Boom & Light
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx + 105, cy);
      ctx.quadraticCurveTo(cx + 60, cy + 85, cx + 15, cy + 70);
      ctx.stroke();

      ctx.fillStyle = '#22d3ee';
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(cx + 12, cy + 70, 9, 0, Math.PI * 2);
      ctx.fill();

      // Voice Wave Bars below
      ctx.fillStyle = '#fbbf24';
      const heights = [12, 28, 45, 30, 52, 38, 20];
      heights.forEach((h, idx) => {
        ctx.fillRect(cx - 60 + idx * 18, cy + 90 - h / 2, 7, h);
      });

      ctx.restore();
      break;
    }

    case 'ai_chatbot': {
      // 2. Cute Holographic AI Chatbot with Speech Balloon
      ctx.save();
      // Glowing Antenna
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 75);
      ctx.lineTo(cx, cy - 130);
      ctx.stroke();

      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(cx, cy - 135, 15, 0, Math.PI * 2);
      ctx.fill();

      // Bot Sphere Body
      const botGrad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, 100);
      botGrad.addColorStop(0, '#38bdf8');
      botGrad.addColorStop(0.6, '#0369a1');
      botGrad.addColorStop(1, '#082f49');
      ctx.fillStyle = botGrad;
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Bot Face Screen
      ctx.fillStyle = '#030712';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cx - 55, cy - 35, 110, 65, 25);
      ctx.fill();
      ctx.stroke();

      // Happy Glowing Eyes
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      // Left curve eye (happy blink)
      ctx.arc(cx - 25, cy - 5, 12, Math.PI * 0.9, Math.PI * 2.1);
      // Right curve eye
      ctx.arc(cx + 25, cy - 5, 12, Math.PI * 0.9, Math.PI * 2.1);
      ctx.stroke();

      // Mini Speech Bubble at top right
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.roundRect(cx + 50, cy - 110, 75, 45, 14);
      ctx.fill();

      // Bubble Dots
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(cx + 70, cy - 88, 5, 0, Math.PI * 2);
      ctx.arc(cx + 87, cy - 88, 5, 0, Math.PI * 2);
      ctx.arc(cx + 104, cy - 88, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      break;
    }

    case 'neural_brain': {
      // 3. Glowing AI Brain & Neural Synapse Core
      ctx.save();
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 30;

      // Brain Lobe Left & Right Glow
      const bGrad = ctx.createLinearGradient(cx - 100, cy, cx + 100, cy);
      bGrad.addColorStop(0, '#c084fc');
      bGrad.addColorStop(0.5, '#7e22ce');
      bGrad.addColorStop(1, '#3b0764');

      // Left Hemisphere
      ctx.fillStyle = bGrad;
      ctx.strokeStyle = '#e9d5ff';
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.arc(cx - 45, cy - 35, 45, Math.PI * 0.8, Math.PI * 1.8);
      ctx.arc(cx - 50, cy + 25, 45, Math.PI * 1.2, Math.PI * 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Hemisphere
      ctx.beginPath();
      ctx.arc(cx + 45, cy - 35, 45, Math.PI * 1.2, Math.PI * 0.2);
      ctx.arc(cx + 50, cy + 25, 45, Math.PI * 1.7, Math.PI * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Synapse Nodes & Interconnected Circuit Lines
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2.5;
      const nodes = [
        { x: cx - 60, y: cy - 40 },
        { x: cx - 25, y: cy - 60 },
        { x: cx + 25, y: cy - 60 },
        { x: cx + 60, y: cy - 40 },
        { x: cx - 50, y: cy + 10 },
        { x: cx, y: cy },
        { x: cx + 50, y: cy + 10 },
        { x: cx - 30, y: cy + 45 },
        { x: cx + 30, y: cy + 45 },
      ];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 70) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Nodes
      nodes.forEach((n) => {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      break;
    }

    case 'maps_beacon': {
      // 4. Holographic 3D Google Maps Location Pin & 5 Stars
      ctx.save();
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 30;

      // Pin Body Gradient
      const pinGrad = ctx.createLinearGradient(cx - 50, cy - 110, cx + 50, cy + 50);
      pinGrad.addColorStop(0, '#ef4444');
      pinGrad.addColorStop(0.5, '#ea580c');
      pinGrad.addColorStop(1, '#b91c1c');

      ctx.fillStyle = pinGrad;
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 4;

      // Big Teardrop Pin Shape
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 65, Math.PI * 0.8, Math.PI * 2.2);
      ctx.lineTo(cx, cy + 90);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pin Center Circle
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 26, 0, Math.PI * 2);
      ctx.fill();

      // Blue Core in Center
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 14, 0, Math.PI * 2);
      ctx.fill();

      // 5-Star Arc around top of Pin
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 15;
      for (let s = -2; s <= 2; s++) {
        const angle = -Math.PI / 2 + (s * Math.PI) / 8;
        const sx = cx + Math.cos(angle) * 92;
        const sy = cy - 35 + Math.sin(angle) * 92;
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⭐', sx, sy);
      }

      // Ground Radar Ripple beneath Pin
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 105, 75, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
      break;
    }

    case 'cyber_laptop': {
      // 5. 3D Holographic Cyber Matrix Laptop
      ctx.save();
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 25;

      // Laptop Screen Frame
      ctx.fillStyle = '#064e3b';
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(cx - 95, cy - 90, 190, 120, 16);
      ctx.fill();
      ctx.stroke();

      // Screen Display Inner
      ctx.fillStyle = '#022c22';
      ctx.beginPath();
      ctx.roundRect(cx - 85, cy - 80, 170, 100, 10);
      ctx.fill();

      // Matrix Code / 3D Graphics on Screen
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('< AI />', cx - 45, cy - 25);

      ctx.fillStyle = '#6ee7b7';
      ctx.font = '14px monospace';
      ctx.fillText('console.log("3D Web")', cx - 75, cy + 5);

      // Laptop Keyboard Base
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 125, cy + 65);
      ctx.lineTo(cx + 125, cy + 65);
      ctx.lineTo(cx + 100, cy + 30);
      ctx.lineTo(cx - 100, cy + 30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Trackpad
      ctx.strokeStyle = '#6ee7b7';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 30, cy + 45, 60, 15);

      ctx.restore();
      break;
    }

    case 'automation_gear': {
      // 6. Glowing Autonomous Workflow Gears & Lightning Reactor
      ctx.save();
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 30;

      // Outer Gear
      const gearRadius = 75;
      const teeth = 8;
      ctx.fillStyle = '#7c2d12';
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 5;

      ctx.beginPath();
      for (let i = 0; i < teeth * 2; i++) {
        const angle = (i * Math.PI) / teeth;
        const r = i % 2 === 0 ? gearRadius + 18 : gearRadius;
        const gx = cx + Math.cos(angle) * r;
        const gy = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Core Circle
      ctx.fillStyle = '#0c0a09';
      ctx.strokeStyle = '#fed7aa';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Lightning Bolt in Center
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(cx + 5, cy - 25);
      ctx.lineTo(cx - 15, cy + 2);
      ctx.lineTo(cx - 2, cy + 2);
      ctx.lineTo(cx - 8, cy + 28);
      ctx.lineTo(cx + 16, cy - 2);
      ctx.lineTo(cx + 2, cy - 2);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
      break;
    }

    case 'growth_rocket': {
      // 7. 3D Meta Ads Growth Rocket
      ctx.save();
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 28;

      // Rocket Body
      const rGrad = ctx.createLinearGradient(cx - 40, cy - 80, cx + 40, cy + 60);
      rGrad.addColorStop(0, '#f43f5e');
      rGrad.addColorStop(0.5, '#be185d');
      rGrad.addColorStop(1, '#831843');
      ctx.fillStyle = rGrad;
      ctx.strokeStyle = '#fbcfe8';
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.moveTo(cx, cy - 100);
      ctx.quadraticCurveTo(cx + 55, cy - 30, cx + 38, cy + 50);
      ctx.lineTo(cx - 38, cy + 50);
      ctx.quadraticCurveTo(cx - 55, cy - 30, cx, cy - 100);
      ctx.fill();
      ctx.stroke();

      // Porthole Window
      ctx.fillStyle = '#06b6d4';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Left & Right Wings
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.moveTo(cx - 38, cy + 20);
      ctx.lineTo(cx - 75, cy + 65);
      ctx.lineTo(cx - 38, cy + 50);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx + 38, cy + 20);
      ctx.lineTo(cx + 75, cy + 65);
      ctx.lineTo(cx + 38, cy + 50);
      ctx.fill();

      // Fiery Thruster Blast
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy + 52);
      ctx.lineTo(cx, cy + 105);
      ctx.lineTo(cx + 20, cy + 52);
      ctx.fill();

      ctx.restore();
      break;
    }

    case 'elite_crown': {
      // 8. Elite Digital Agency Golden Crest & Crown
      ctx.save();
      ctx.shadowColor = '#eab308';
      ctx.shadowBlur = 30;

      // Golden Shield Background
      const shGrad = ctx.createLinearGradient(cx - 70, cy - 80, cx + 70, cy + 80);
      shGrad.addColorStop(0, '#fef08a');
      shGrad.addColorStop(0.5, '#eab308');
      shGrad.addColorStop(1, '#a16207');

      ctx.fillStyle = shGrad;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.moveTo(cx - 70, cy - 70);
      ctx.lineTo(cx + 70, cy - 70);
      ctx.lineTo(cx + 70, cy + 10);
      ctx.quadraticCurveTo(cx + 60, cy + 75, cx, cy + 100);
      ctx.quadraticCurveTo(cx - 60, cy + 75, cx - 70, cy + 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Dark Shield
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.moveTo(cx - 55, cy - 55);
      ctx.lineTo(cx + 55, cy - 55);
      ctx.lineTo(cx + 55, cy + 5);
      ctx.quadraticCurveTo(cx + 45, cy + 60, cx, cy + 82);
      ctx.quadraticCurveTo(cx - 45, cy + 60, cx - 55, cy + 5);
      ctx.closePath();
      ctx.fill();

      // Golden Crown Emblem
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(cx - 35, cy + 15);
      ctx.lineTo(cx - 40, cy - 30);
      ctx.lineTo(cx - 18, cy - 10);
      ctx.lineTo(cx, cy - 40);
      ctx.lineTo(cx + 18, cy - 10);
      ctx.lineTo(cx + 40, cy - 30);
      ctx.lineTo(cx + 35, cy + 15);
      ctx.closePath();
      ctx.fill();

      // Star Diamonds on Crown
      ctx.fillStyle = '#ffffff';
      [-40, 0, 40].forEach((ox) => {
        ctx.beginPath();
        ctx.arc(cx + (ox === 0 ? 0 : ox > 0 ? 38 : -38), cy - (ox === 0 ? 40 : 30), 4.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export const Canvas3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Galaxy
    const particleCount = prefersReducedMotion ? 200 : 800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color('#06b6d4');
    const cAmber = new THREE.Color('#f59e0b');
    const cPurple = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 10 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(phi);
      positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? cCyan : Math.random() > 0.3 ? cAmber : cPurple;
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3D Geometric Floating Rings & Polyhedrons
    const polyGroup = new THREE.Group();
    const polyGeo1 = new THREE.IcosahedronGeometry(1.6, 0);
    const polyMat1 = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const polyMesh1 = new THREE.Mesh(polyGeo1, polyMat1);
    polyMesh1.position.set(-14, 10, -6);
    polyGroup.add(polyMesh1);

    const polyGeo2 = new THREE.OctahedronGeometry(1.8, 0);
    const polyMat2 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const polyMesh2 = new THREE.Mesh(polyGeo2, polyMat2);
    polyMesh2.position.set(15, -9, -5);
    polyGroup.add(polyMesh2);

    const ringGeo = new THREE.TorusGeometry(2.2, 0.08, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(16, 9, -7);
    polyGroup.add(ringMesh);

    scene.add(polyGroup);

    // Group for 3D Illustrated Cutout Figures (Bommalu / 3D Hologram Avatars)
    const figuresGroup = new THREE.Group();
    const figureMeshes: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatPhase: number;
    }[] = [];

    // Spatial Layout Positions for the 8 Figures around the edges so center content is readable
    const figurePositions = [
      { x: -16, y: 7, z: -4, scale: 5.6 }, // Left top (Robot Host)
      { x: 16, y: 8, z: -3, scale: 5.4 }, // Right top (Chatbot)
      { x: -18, y: -7, z: -6, scale: 5.6 }, // Left bottom (Neural Brain)
      { x: 17, y: -7, z: -5, scale: 5.6 }, // Right bottom (Maps Pin)
      { x: -12, y: 15, z: -10, scale: 5.2 }, // Upper Left (Laptop)
      { x: 13, y: 16, z: -11, scale: 5.2 }, // Upper Right (Gear)
      { x: -12, y: -16, z: -10, scale: 5.2 }, // Lower Left (Rocket)
      { x: 12, y: -16, z: -9, scale: 5.4 }, // Lower Right (Crown Crest)
    ];

    const planeGeo = new THREE.PlaneGeometry(1, 1);

    VISUAL_FIGURES.forEach((fig, index) => {
      const texture = createFigureTexture(fig);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(planeGeo, mat);
      const pos = figurePositions[index % figurePositions.length];

      mesh.scale.set(pos.scale, pos.scale, 1);
      mesh.position.set(pos.x, pos.y, pos.z);

      figuresGroup.add(mesh);
      figureMeshes.push({
        mesh,
        basePos: new THREE.Vector3(pos.x, pos.y, pos.z),
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.015,
        },
        floatSpeed: 0.7 + Math.random() * 0.5,
        floatPhase: index * 1.3,
      });
    });

    scene.add(figuresGroup);

    // Mouse Tracking for Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0008;
      mouseY = (e.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });

    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow parallax
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      if (!prefersReducedMotion) {
        // Rotate cosmic particle field
        particles.rotation.y = elapsedTime * 0.02 + targetX * 0.8;
        particles.rotation.x = elapsedTime * 0.01 + targetY * 0.8;

        // Rotate wireframe polyhedrons
        polyMesh1.rotation.x = elapsedTime * 0.4;
        polyMesh1.rotation.y = elapsedTime * 0.6;

        polyMesh2.rotation.x = elapsedTime * 0.5;
        polyMesh2.rotation.z = elapsedTime * 0.4;

        ringMesh.rotation.x = elapsedTime * 0.3;
        ringMesh.rotation.y = elapsedTime * 0.5;

        // Animate floating 3D figures (Bommalu / Holograms) with natural undulating 3D float
        figureMeshes.forEach((item) => {
          const t = elapsedTime * item.floatSpeed + item.floatPhase;
          item.mesh.position.y = item.basePos.y + Math.sin(t) * 0.9;
          item.mesh.position.x = item.basePos.x + Math.cos(t * 0.8) * 0.5;
          // Subtle natural 3D tilt
          item.mesh.rotation.z = Math.sin(t * 0.6) * 0.08;
        });

        // Group-level 3D Parallax tilt reacting to cursor
        figuresGroup.rotation.y = targetX * 1.3;
        figuresGroup.rotation.x = -targetY * 1.3;
        figuresGroup.position.x = targetX * 5;
        figuresGroup.position.y = -targetY * 5;

        polyGroup.rotation.y = targetX * 1.5;
        polyGroup.rotation.x = -targetY * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      polyGeo1.dispose();
      polyMat1.dispose();
      polyGeo2.dispose();
      polyMat2.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      planeGeo.dispose();
      figureMeshes.forEach((item) => {
        if (Array.isArray(item.mesh.material)) {
          item.mesh.material.forEach((m) => m.dispose());
        } else {
          item.mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
