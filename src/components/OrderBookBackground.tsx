import { useEffect, useRef } from 'react';

interface Order {
  price: number;
  size: number;
  side: 'buy' | 'sell';
  y: number;
  opacity: number;
}

export default function OrderBookBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const orders: Order[] = [];
    const orderCount = 30;

    // Initialize orders
    for (let i = 0; i < orderCount; i++) {
      orders.push({
        price: 1000 + Math.random() * 100,
        size: Math.random() * 10,
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orders.forEach((order) => {
        order.y -= 0.2;
        if (order.y < -50) {
          order.y = canvas.height + 50;
          order.price = 1000 + Math.random() * 100;
          order.size = Math.random() * 10;
          order.opacity = Math.random() * 0.3 + 0.1;
        }

        ctx.save();
        ctx.globalAlpha = order.opacity;
        ctx.font = '12px monospace';
        ctx.fillStyle = order.side === 'buy' ? '#3B82F6' : '#8B5CF6';
        
        const text = `${order.price.toFixed(2)} | ${order.size.toFixed(3)}`;
        const x = order.side === 'buy' ? 50 : canvas.width - 150;
        
        ctx.fillText(text, x, order.y);
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
      style={{ zIndex: 0 }}
    />
  );
}
