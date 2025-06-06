
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCovenant } from '../contexts/CovenantContext';
import { Compass, Star } from 'lucide-react';

const SacredGeometryVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { terrainContext } = useCovenant();
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawSacredGeometry = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const baseRadius = Math.min(centerX, centerY) * 0.8;

      // Set colors based on terrain context
      const colors = terrainContext === 'desert' 
        ? ['#f59e0b', '#f97316', '#dc2626'] 
        : ['#8b5cf6', '#3b82f6', '#06b6d4'];

      // Draw multiple rotating sacred patterns
      for (let layer = 0; layer < 3; layer++) {
        const radius = baseRadius * (0.3 + layer * 0.2);
        const rotation = time * 0.001 * (layer + 1);
        const petals = 6 + layer * 2;

        ctx.strokeStyle = colors[layer];
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.7;

        // Flower of Life pattern
        for (let i = 0; i < petals; i++) {
          const angle = (i / petals) * Math.PI * 2 + rotation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
          ctx.stroke();

          // Inner connections
          for (let j = i + 1; j < petals; j++) {
            const angle2 = (j / petals) * Math.PI * 2 + rotation;
            const x2 = centerX + Math.cos(angle2) * radius;
            const y2 = centerY + Math.sin(angle2) * radius;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.globalAlpha = 0.2;
            ctx.stroke();
            ctx.globalAlpha = 0.7;
          }
        }
      }

      // Central pulse
      const pulseRadius = 20 + Math.sin(time * 0.003) * 10;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = terrainContext === 'desert' ? '#fbbf24' : '#8b5cf6';
      ctx.globalAlpha = 0.5;
      ctx.fill();

      animationRef.current = requestAnimationFrame(drawSacredGeometry);
    };

    animationRef.current = requestAnimationFrame(drawSacredGeometry);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [terrainContext]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-6 h-6" />
          <span>Sacred Geometry Harmonics</span>
          <Compass className="w-5 h-5 ml-2 animate-spin" style={{ animationDuration: '8s' }} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-64 rounded-lg bg-gradient-to-br from-slate-900 to-purple-900"
          />
          <div className="absolute bottom-2 left-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
            {terrainContext === 'desert' ? 'Desert Mandala' : 'Empire Geometries'}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          AI-generated sacred patterns reflecting the harmony between technology and divine order
        </p>
      </CardContent>
    </Card>
  );
};

export default SacredGeometryVisualizer;
