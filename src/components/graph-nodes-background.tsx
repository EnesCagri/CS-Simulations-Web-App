"use client";
import { useEffect, useRef } from "react";

// Yardımcı: Rastgele pastel renk
function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
}

// Basit force-directed graph node animasyonu
export function GraphNodesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Node ve edge'ler state'i
  const nodesRef = useRef<any[]>([]);
  const edgesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!parent || !canvas) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resize();
    window.addEventListener("resize", resize);

    // Node ve edge'ler
    const NODES = 14;
    const nodes = Array.from({ length: NODES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: 16 + Math.random() * 10,
      color: randomColor(),
    }));
    const EDGES = Array.from({ length: NODES }, (_, i) => [i, (i + 1) % NODES]);
    nodesRef.current = nodes;
    edgesRef.current = EDGES;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Edge'ler
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 2;
      for (const [a, b] of edgesRef.current) {
        ctx.strokeStyle = nodesRef.current[a].color;
        ctx.beginPath();
        ctx.moveTo(nodesRef.current[a].x, nodesRef.current[a].y);
        ctx.lineTo(nodesRef.current[b].x, nodesRef.current[b].y);
        ctx.stroke();
      }
      ctx.restore();
      // Node'lar
      for (const node of nodesRef.current) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
      }
    }

    function update() {
      if (!canvas) return;
      for (const node of nodesRef.current) {
        node.x += node.vx;
        node.y += node.vy;
        // Kenarlardan sekme
        if (node.x < node.r || node.x > canvas.width - node.r) node.vx *= -1;
        if (node.y < node.r || node.y > canvas.height - node.r) node.vy *= -1;
      }
    }

    let running = true;
    function animate() {
      if (!running) return;
      update();
      draw();
      requestAnimationFrame(animate);
    }
    animate();

    // Canvas'a tıklama ile yeni node ekle
    function handleCanvasClick(e: MouseEvent) {
      // Hero card'ın bounding box'ını bul
      const card = document.querySelector(".glass-hero-card");
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          // Card'ın içi, tıklama yok say
          return;
        }
      }
      // Yeni node ekle
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const r = 16 + Math.random() * 10;
      const color = randomColor();
      // En yakın node'u bul
      let minDist = Infinity;
      let nearest = 0;
      nodesRef.current.forEach((node, i) => {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      });
      nodesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        r,
        color,
      });
      edgesRef.current.push([nodesRef.current.length - 1, nearest]);
    }
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-auto select-none bg-[#2551b6]"
      style={{
        filter: "blur(1.5px)",
        opacity: 0.7,
      }}
      aria-hidden
    />
  );
}
