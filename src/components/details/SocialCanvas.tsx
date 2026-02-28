import { useEffect, useRef, useState } from "preact/hooks";
import createGlobe from "cobe";
import { IconMap } from "../IconMap";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-preact";


const SendIcon = Send as any;
const Loader2Icon = Loader2 as any;
const CheckCircle2Icon = CheckCircle2 as any;
const AlertCircleIcon = AlertCircle as any;

interface SocialItem {
  icon: string;
  url: string;
  color: string;
  label: string;
}

interface SocialCanvasProps {
  data?: {
    content?: SocialItem[];
  };
  items?: SocialItem[];
}

const SocialCanvas = ({ items, data }: SocialCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const socialItems = items || data?.content || [];

  
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.2 : 2,
      mapSamples: 16000,
      mapBrightness: isDark ? 6 : 2,
      baseColor: isDark ? [0.3, 0.3, 0.3] : [0.93, 0.93, 0.93],
      markerColor: [0.1, 0.8, 1],
      glowColor: isDark ? [1, 1, 1] : [0.85, 0.85, 0.85],
      opacity: isDark ? 0.8 : 0.9,
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [isDark]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[500px] w-full bg-background-secondary rounded-xl overflow-hidden border border-border p-6 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none" />

      {}
      <div className="flex-1 relative flex flex-col items-center justify-center min-h-[300px] order-2 md:order-1">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            style={{
              width: 600,
              height: 600,
              maxWidth: "100%",
              aspectRatio: 1,
            }}
            className="opacity-90 grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>

        <div className="z-10 mt-auto flex flex-wrap justify-center gap-4 p-4">
          {socialItems.map((item, i) => {
            const Icon = IconMap[item.icon] || IconMap["github"];
            return (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-full bg-background-tertiary border border-border hover:bg-primary/10 hover:scale-110 hover:border-primary/40 transition-all duration-300 shadow-sm"
                title={item.label}
              >
                <div
                  className="text-foreground-secondary group-hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {}
      <div className="flex-1 w-full max-w-md mx-auto z-10 flex flex-col justify-center order-1 md:order-2">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">Contact Me</h3>
          <p className="text-foreground-secondary text-sm">
            Have a question or want to work together? Send me a message!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-tertiary uppercase tracking-wider ml-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onInput={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-tertiary uppercase tracking-wider ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onInput={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-tertiary uppercase tracking-wider ml-1">
              Message
            </label>
            <textarea
              name="message"
              required
              value={formData.message}
              onInput={handleChange}
              rows={4}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`
                    w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-all duration-300
                    ${
                      status === "success"
                        ? "bg-success/15 text-success border border-success/40 cursor-default"
                        : "bg-foreground text-background hover:bg-primary hover:text-white border border-transparent shadow-sm"
                    }
                    ${status === "loading" ? "opacity-70 cursor-wait" : ""}
                `}
          >
            {status === "loading" && (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            )}
            {status === "success" && <CheckCircle2Icon className="w-5 h-5" />}
            {status === "error" && "Try Again"}
            {status === "idle" && (
              <>
                Send Message
                <SendIcon className="w-4 h-4" />
              </>
            )}
            {status === "success" && "Message Sent!"}
          </button>

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-sm mt-2 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertCircleIcon className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SocialCanvas;
