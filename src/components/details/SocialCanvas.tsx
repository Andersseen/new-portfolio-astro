import { useEffect, useRef, useState } from "preact/hooks";
import { IconMap } from "../IconMap";

interface SocialItem {
  icon: string;
  url: string;
  color: string;
  label: string;
}

interface SocialCanvasProps {
  data?: {
    content?: SocialItem[]; // We might need to pass this or structured details
  };
  // We can also accept the original content items
  items?: SocialItem[];
}

const SocialCanvas = ({ items }: SocialCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive pixel logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    // Pixel grid configuration
    const size = 20;
    const cols = Math.ceil(width / size);
    const rows = Math.ceil(height / size);

    // State for pixels
    const pixels: { x: number; y: number; life: number; color: string }[] = [];

    const colors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"]; // Tailwind colors

    const resize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
        width = canvas.width;
        height = canvas.height;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / size) * size;
      const y = Math.floor((e.clientY - rect.top) / size) * size;

      // Add pixel at current grid position
      // Only if not exists roughly
      if (!pixels.find((p) => p.x === x && p.y === y && p.life > 0.5)) {
        pixels.push({
          x,
          y,
          life: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = pixels.length - 1; i >= 0; i--) {
        const p = pixels[i];
        p.life -= 0.02; // Fade speed

        if (p.life <= 0) {
          pixels.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, size - 2, size - 2); // -2 for grid gap
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="relative w-full h-96 overflow-hidden rounded-xl bg-black border border-border group"
      ref={containerRef}
    >
      {/* Background Grid Lines (CSS) */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: `20px 20px`,
        }}
      ></div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-crosshair block"
      />

      {/* Floating Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <h3 className="text-3xl font-bold text-white mb-8 mix-blend-difference">
          Connect With Me
        </h3>

        <div className="flex gap-6 pointer-events-auto">
          {items?.map((item, i) => {
            const Icon = IconMap[item.icon] || IconMap["github"]; // fallback
            return (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`
                            relative group/btn p-4 rounded-xl backdrop-blur-md border border-white/10
                            bg-white/5 hover:bg-white/10 transition-all duration-300
                            hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                        `}
                style={{
                  borderColor: `var(--color-${item.color})`, // Attempt to use dynamic color var or fallback
                }}
              >
                <div
                  className={`text-${item.color} group-hover/btn:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-white/30 pointer-events-none font-mono">
        Move your cursor to paint
      </div>
    </div>
  );
};

export default SocialCanvas;
