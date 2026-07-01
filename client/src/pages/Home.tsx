/**
 * StallBug Landing Page
 * Design: Claridad Empresarial Colombiana
 * Primary: #E31C23 (Red) | WhatsApp CTA: #25D366 | Orange accent: #FF6B35
 * Typography: Montserrat (headings) + Inter (body)
 * Goal: Convert Facebook Ads traffic into WhatsApp conversations
 */

import { useEffect, useRef, useState } from "react";
import {
  Clock,
  CheckCircle,
  TrendingUp,
  Smartphone,
  ShoppingCart,
  Calculator,
  Globe,
  Zap,
  Users,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Star,
  BarChart3,
  Shield,
  Headphones,
  FileText,
  Menu,
  X,
} from "lucide-react";

// ── WhatsApp config ────────────────────────────────────────────────────────────
const WA_NUMBER = "573215535197"; // Replace with real number
const WA_MESSAGE = encodeURIComponent(
  "Hola StallBug! Me interesa conocer más sobre sus soluciones de software para mi negocio."
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// ── Intersection Observer hook ─────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Animated counter ───────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── WhatsApp Icon SVG ──────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── CTA Button ─────────────────────────────────────────────────────────────────
function CTAButton({ text = "Enviar mensaje por WhatsApp", size = "default", microcopy = "" }: {
  text?: string; size?: "default" | "large"; microcopy?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-whatsapp inline-flex items-center gap-3 font-bold text-white shadow-lg ${
          size === "large"
            ? "px-8 py-5 text-lg"
            : "px-6 py-4 text-base"
        }`}
      >
        <WhatsAppIcon size={size === "large" ? 26 : 22} />
        {text}
      </a>
      {microcopy && (
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
          {microcopy}
        </p>
      )}
    </div>
  );
}

// ── Floating WhatsApp Button ───────────────────────────────────────────────────
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`floating-whatsapp text-white transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      title="Chatea con nosotros"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}

// ── Section wrapper with fade-in ───────────────────────────────────────────────
function Section({ children, className = "", id = "", style }: {
  children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      style={style}
      className={`fade-in-up ${inView ? "visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

// ── FAQ Item ───────────────────────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left font-semibold text-gray-800 hover:text-blue-600 transition-colors"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <span>{question}</span>
        {open ? <ChevronUp size={20} className="text-blue-600 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-gray-600 leading-relaxed px-1">{answer}</p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-scrolled" : "bg-transparent"
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="StallBug Logo"
                className="w-10 h-10 object-contain"
              />
              <span
                className={`font-black text-xl tracking-tight transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Stall<span className="text-red-600">Bug</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: "Servicios", id: "servicios" },
                { label: "Proceso", id: "proceso" },
                { label: "Casos de Éxito", id: "casos" },
                { label: "FAQ", id: "faq" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`font-semibold text-sm transition-colors hover:text-red-400 ${
                    scrolled ? "text-gray-700" : "text-white/90"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-5 py-2.5 text-sm font-bold text-white inline-flex items-center gap-2"
              >
                <WhatsAppIcon size={16} />
                Contáctanos
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container py-4 flex flex-col gap-3">
              {[
                { label: "Servicios", id: "servicios" },
                { label: "Proceso", id: "proceso" },
                { label: "Casos de Éxito", id: "casos" },
                { label: "FAQ", id: "faq" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left py-3 px-2 font-semibold text-gray-700 border-b border-gray-100 hover:text-blue-600 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-5 py-3 text-sm font-bold text-white inline-flex items-center justify-center gap-2 mt-2"
              >
                <WhatsAppIcon size={18} />
                Chatea con nosotros
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #5a0a0f 0%, #8b0f18 50%, #E31C23 100%)",
        }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(/manus-storage/stallbug-hero_7aa34494.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/60 to-transparent" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-red-400/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-red-300/10 blur-2xl" />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-red-100">Software hecho en Valledupar</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ¿Pierdes tiempo con{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-300">
                  papeleo y errores
                </span>{" "}
                manuales?
              </h1>

              <p className="text-lg md:text-xl text-red-100 mb-4 leading-relaxed">
                Desarrollamos <strong className="text-white">software a medida para negocios</strong> del Cesar. Automatiza tus procesos, elimina errores y haz crecer tu negocio.
              </p>

              <p className="text-base text-red-200 mb-8">
                Aplicaciones web y móviles para facturación, inventarios, puntos de venta y más — <strong className="text-white">hechas aquí en Valledupar.</strong>
              </p>

              <CTAButton
                text="Agenda tu consulta GRATIS"
                size="large"
                microcopy="Respuesta en minutos · Sin compromiso"
              />

              {/* Social proof mini stats */}
              <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/20">
                {[
                  { value: "50+", label: "Proyectos entregados" },
                  { value: "98%", label: "Clientes satisfechos" },
                  { value: "3 años", label: "En el mercado" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-red-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboard mockup */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-3xl" />
                <img
                  src="/manus-storage/stallbug-dashboard_5b836e9c.jpg"
                  alt="Software StallBug en acción"
                  className="relative z-10 rounded-2xl shadow-2xl border border-white/20 w-full"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <TrendingUp size={20} className="text-red-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Eficiencia promedio</div>
                      <div className="font-black text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>+60%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0 80L1440 80L1440 20C1200 70 960 0 720 30C480 60 240 10 0 40L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── PROBLEMAS ──────────────────────────────────────────────────────── */}
      <Section id="problemas" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest">¿Te identificas?</span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Los problemas que frenan tu negocio
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Si alguno de estos te suena familiar, tenemos la solución exacta para tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <FileText size={24} className="text-red-500" />,
                title: "Procesos manuales que consumen horas",
                desc: "Facturas en Excel, inventarios en papel, reportes que tardan días en generarse. Tu tiempo vale demasiado para eso.",
                color: "bg-red-50 border-red-200",
              },
              {
                icon: <BarChart3 size={24} className="text-orange-500" />,
                title: "Errores contables que afectan tus finanzas",
                desc: "Un número mal digitado puede costar millones. Los procesos manuales multiplican el riesgo de errores críticos.",
                color: "bg-orange-50 border-orange-200",
              },
              {
                icon: <Users size={24} className="text-purple-500" />,
                title: "Información dispersa entre departamentos",
                desc: "Ventas no sabe qué hay en bodega, contabilidad no tiene los datos de ventas. Todo desconectado, todo lento.",
                color: "bg-purple-50 border-purple-200",
              },
              {
                icon: <Clock size={24} className="text-blue-500" />,
                title: "Pérdida de tiempo en tareas repetitivas",
                desc: "Tus vendedores gastan más tiempo digitando que vendiendo. Tus gerentes más tiempo en reportes que en estrategia.",
                color: "bg-blue-50 border-blue-200",
              },
              {
                icon: <TrendingUp size={24} className="text-green-500" />,
                title: "No ves el crecimiento real de tu negocio",
                desc: "Sin datos en tiempo real, tomas decisiones a ciegas. No sabes dónde está el dinero ni dónde invertir.",
                color: "bg-green-50 border-green-200",
              },
              {
                icon: <Shield size={24} className="text-red-600" />,
                title: "Riesgo de pérdida de información",
                desc: "Archivos en Excel, carpetas compartidas, sin respaldos. Un accidente y pierdes años de datos de tu negocio.",
                color: "bg-red-100 border-red-300",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border-2 p-4 md:p-6 ${item.color} transition-all duration-200 hover:-translate-y-1`}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3
                  className="font-bold text-gray-900 text-lg mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── BENEFICIOS ─────────────────────────────────────────────────────── */}
      <Section
        id="beneficios"
        className="py-20"
        style={{ backgroundColor: "#F7F8FC" } as React.CSSProperties}
      >
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Resultados reales</span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Lo que ganas con StallBug
            </h2>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-4xl mx-auto">
            {[
              { value: 50, suffix: "%", label: "Más tiempo disponible" },
              { value: 0, suffix: " errores", label: "Críticos en tu sistema" },
              { value: 30, suffix: "%", label: "Más crecimiento" },
              { value: 80, suffix: "%", label: "Menos papeleo" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="stat-number">
                  +<AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefit cards */}
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: <Clock size={24} className="text-blue-600" />,
                title: "Automatiza tareas repetitivas",
                desc: "Facturación automática, reportes programados, alertas de inventario. Tu equipo se enfoca en lo que realmente importa.",
              },
              {
                icon: <CheckCircle size={24} className="text-blue-600" />,
                title: "Cero errores críticos",
                desc: "Validaciones automáticas, auditoría de cambios y respaldos diarios. Tu información siempre segura y confiable.",
              },
              {
                icon: <TrendingUp size={24} className="text-blue-600" />,
                title: "Decisiones con datos en tiempo real",
                desc: "Dashboards actualizados al instante. Sabe exactamente cómo va tu negocio en cualquier momento.",
              },
              {
                icon: <Smartphone size={24} className="text-blue-600" />,
                title: "Accede desde cualquier dispositivo",
                desc: "Web, móvil o tablet. Tu negocio en la palma de tu mano, desde cualquier lugar del Cesar.",
              },
            ].map((item, i) => (
              <div key={i} className="benefit-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900 text-lg mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA INTERMEDIO ─────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #A01418 0%, #E31C23 100%)",
        }}
      >
        <div className="container text-center">
          <h2
            className="text-2xl md:text-3xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ¿Listo para transformar tu empresa?
          </h2>
          <p className="text-blue-200 mb-8 text-lg">
            Cuéntanos tu problema y te damos una solución en minutos.
          </p>
          <CTAButton
            text="Solicita tu cotización gratis"
            size="large"
            microcopy="Responde en minutos · Sin compromiso"
          />
        </div>
      </section>

      {/* ── SERVICIOS ──────────────────────────────────────────────────────── */}
      <Section id="servicios" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Qué ofrecemos</span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Soluciones a medida para tu negocio
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Desarrollamos exactamente lo que tu empresa necesita, sin soluciones genéricas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Calculator size={24} className="text-red-600" />,
                title: "Sistemas de Facturación",
                desc: "Control de pagos y cartera, reportes automáticos, gestión de clientes. Software robusto para tu negocio.",
                tag: "Más solicitado",
              },
              {
                icon: <ShoppingCart size={24} className="text-red-600" />,
                title: "Gestión de Inventarios",
                desc: "Controla stock en tiempo real, alertas de mínimos, trazabilidad de productos y movimientos. Nunca más te quedes sin mercancía.",
                tag: "",
              },
              {
                icon: <Smartphone size={24} className="text-red-600" />,
                title: "Aplicaciones Móviles",
                desc: "Apps para Android e iOS que conectan a tu equipo de campo con la oficina. Pedidos, despachos y reportes desde el celular.",
                tag: "",
              },
              {
                icon: <Globe size={24} className="text-red-600" />,
                title: "Landing Pages y Sitios Web",
                desc: "Páginas web profesionales, landing pages optimizadas para conversión y sitios empresariales. Diseño moderno y funcional.",
                tag: "",
              },
              {
                icon: <Zap size={24} className="text-red-600" />,
                title: "Automatizaciones",
                desc: "Automatiza procesos repetitivos: envío de emails, sincronización de datos, reportes programados y más. Ahorra tiempo.",
                tag: "",
              },
              {
                icon: <Headphones size={24} className="text-red-600" />,
                title: "Soporte y Mantenimiento",
                desc: "Acompañamiento continuo, actualizaciones, capacitación a tu equipo y soporte técnico cuando lo necesites.",
                tag: "",
              },
            ].map((service, i) => (
              <div key={i} className="service-card bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm relative">
                {service.tag && (
                  <span className="absolute -top-3 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                )}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3
                  className="font-bold text-gray-900 text-base md:text-lg mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PROCESO ────────────────────────────────────────────────────────── */}
      <Section
        id="proceso"
        className="py-20"
        style={{ backgroundColor: "#F7F8FC" } as React.CSSProperties}
      >
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Cómo trabajamos</span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Tu proyecto en 4 pasos claros
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Sabes exactamente qué esperar en cada etapa. Sin sorpresas, sin retrasos.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  step: 1,
                  title: "Análisis de Necesidades",
                  desc: "Entrevistamos a tu equipo, entendemos tus procesos actuales y definimos exactamente qué necesitas. Sin tecnicismos, en tu idioma.",
                  time: "1-2 días",
                  icon: <Users size={20} className="text-white" />,
                },
                {
                  step: 2,
                  title: "Diseño y Prototipo",
                  desc: "Preparamos prototipos visuales de tu sistema antes de programar. Tú apruebas cómo se verá y funcionará todo.",
                  time: "3-5 días",
                  icon: <FileText size={20} className="text-white" />,
                },
                {
                  step: 3,
                  title: "Desarrollo",
                  desc: "Codificamos la solución aprobada con estándares de calidad. Recibes avances semanales para seguir el progreso.",
                  time: "2-8 semanas",
                  icon: <Zap size={20} className="text-white" />,
                },
                {
                  step: 4,
                  title: "Capacitación y Soporte",
                  desc: "Entrenamos a tu equipo en el uso del sistema y te damos soporte continuo. No te dejamos solo después de entregar.",
                  time: "Continuo",
                  icon: <Headphones size={20} className="text-white" />,
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="step-badge">{item.step}</div>
                    {i < 3 && <div className="w-0.5 flex-1 bg-blue-100 hidden md:block" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className="font-bold text-gray-900 text-lg"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.title}
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── CASOS DE ÉXITO ─────────────────────────────────────────────────── */}
      <Section id="casos" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Prueba social</span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Empresas del Cesar que ya crecen con StallBug
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
            {[
              {
                quote: "Antes tardábamos 3 horas en cerrar la caja. Ahora son 15 minutos. StallBug transformó nuestra operación completamente.",
                name: "Carlos Martínez",
                role: "Gerente General",
                company: "Distribuidora El Cesar",
                stat: "+60% eficiencia",
                color: "text-blue-600",
              },
              {
                quote: "Los errores en inventario nos costaban millones al año. Con el sistema de StallBug, llevamos 8 meses sin un solo descuadre.",
                name: "Laura Jiménez",
                role: "Administradora",
                company: "Ferretería Central Valledupar",
                stat: "0 errores en 8 meses",
                color: "text-green-600",
              },
              {
                quote: "Pensé que el software era solo para grandes empresas. StallBug nos hizo uno a nuestra medida y al precio justo.",
                name: "Pedro Orozco",
                role: "Propietario",
                company: "Restaurante La Guajira",
                stat: "+40% en ventas",
                color: "text-orange-600",
              },
            ].map((t, i) => (
              <div key={i} className="testimonial-card p-6 pt-8">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500">{t.role} · {t.company}</div>
                  </div>
                  <span className={`text-xs font-bold ${t.color} bg-gray-50 px-2 py-1 rounded-full`}>
                    {t.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Team image */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/manus-storage/stallbug-team_99a262bf.jpg"
              alt="Equipo StallBug"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="bg-blue-600 text-white text-center py-4 px-6">
              <p className="font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Nuestro equipo en Valledupar, listo para transformar tu empresa
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section
        id="faq"
        className="py-20"
        style={{ backgroundColor: "#F7F8FC" } as React.CSSProperties}
      >
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Tus dudas resueltas</span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Preguntas frecuentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {[
              {
                q: "¿Cuánto tiempo tarda en entregarse un proyecto?",
                a: "Depende del alcance. Un sistema básico de facturación puede estar listo en 3-4 semanas. Un ERP completo puede tomar 2-3 meses. En la primera reunión te damos un cronograma exacto.",
              },
              {
                q: "¿Cuál es la inversión mínima?",
                a: "La inversión depende completamente de lo que tu negocio necesite. Cada empresa es diferente, así que el presupuesto se pacta al hablar por WhatsApp. Analizamos tus requerimientos y te presentamos opciones que se adapten a tu capacidad.",
              },
              {
                q: "¿Incluye capacitación para mi equipo?",
                a: "Sí, siempre. Incluimos capacitación presencial o virtual para todos los usuarios del sistema. También entregamos manuales y videos de uso.",
              },
              {
                q: "¿Qué pasa si necesito cambios después de entregar el proyecto?",
                a: "Ofrecemos contratos de mantenimiento mensual que incluyen ajustes, mejoras y soporte técnico. También puedes solicitar cambios puntuales con cotización independiente.",
              },
              {
                q: "¿El software funciona sin internet?",
                a: "Depende de la solución. Podemos desarrollar sistemas que funcionen offline y se sincronicen cuando haya conexión. Esto se define en la etapa de análisis.",
              },
              {
                q: "¿Trabajan solo en Valledupar?",
                a: "Trabajamos de forma remota para empresas en todo el Cesar y Colombia. Las reuniones de análisis pueden ser por WhatsApp, videollamada o presenciales si lo prefieres.",
              },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: <Shield size={20} className="text-red-600" />, text: "Datos 100% seguros" },
              { icon: <CheckCircle size={20} className="text-red-600" />, text: "Satisfacción garantizada" },
              { icon: <Headphones size={20} className="text-red-600" />, text: "Soporte continuo" },
              { icon: <Star size={20} className="text-red-600" />, text: "Calidad certificada" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white rounded-full px-5 py-3 shadow-sm border border-gray-100">
                {badge.icon}
                <span className="text-sm font-semibold text-gray-700">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #5a0a0f 0%, #8b0f18 50%, #E31C23 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(/manus-storage/stallbug-hero_7aa34494.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-300/10 blur-2xl" />

        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-red-100">Disponibles ahora mismo</span>
            </div>

            <h2
              className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ¿Listo para optimizar tu empresa?
            </h2>
            <p className="text-xl text-red-200 mb-10">
              Escríbenos por WhatsApp y recibe una asesoría gratuita. Sin compromisos, sin tecnicismos.
            </p>

            <CTAButton
              text="¡Escríbenos por WhatsApp ahora!"
              size="large"
              microcopy="Respuesta en minutos · Consulta 100% gratuita"
            />

            <p className="text-red-300 text-sm mt-6">
              🔒 Protegemos tus datos personales · No compartimos tu información con terceros
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="StallBug"
                className="w-8 h-8 object-contain"
              />
              <span
                className="font-black text-xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Stall<span className="text-red-600">Bug</span>
              </span>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Software empresarial a medida · Valledupar, Cesar, Colombia
              </p>
              <p className="text-gray-500 text-xs mt-1">
                © {new Date().getFullYear()} StallBug. Todos los derechos reservados.
              </p>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-5 py-3 text-sm font-bold text-white inline-flex items-center gap-2"
            >
              <WhatsAppIcon size={18} />
              Contáctanos
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-600 text-xs">
              Al contactarnos, aceptas nuestra{" "}
              <span className="text-gray-500 hover:text-gray-400 cursor-pointer">política de privacidad</span>.
              No compartimos tus datos con terceros.
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ──────────────────────────────────────────────── */}
      <FloatingWhatsApp />
    </div>
  );
}
