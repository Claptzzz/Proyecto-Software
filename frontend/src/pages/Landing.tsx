import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ucnShield from '../assets/LogoUCN_acentuado.png';
import ucnLogoFull from '../assets/UCN_y_texto.png';
import iciLogo from '../assets/LogoICI.svg';
import itiLogo from '../assets/LogoITI.svg';
import icciLogo from '../assets/LogoICCI.svg';
import escuelaLogo from '../assets/Logo Escuela Ingeniería.svg';
import acreditacionColor from '../assets/acreditacion-color-horizontal.png';
import acreditacionBlanco from '../assets/acreditacion-blanco-horizontal.png';

// UCN Brand colors (Guía de Normas Gráficas):
// Pantone 652 C → #7E9BC0  (azul institucional)
// Pantone 471 C → #AC6D33  (terra / cobre)
// Terra 60%     → #CAA987  (terra claro)

const testimonials = [
  {
    name: 'Valentina Mora',
    role: 'Estudiante de Ing. Civil Informática',
    text: 'Encontré y postulé a una ayudantía de Cálculo en menos de 5 minutos. El proceso fue muy claro y recibí respuesta rápida del profesor.',
    rating: 5,
  },
  {
    name: 'Rodrigo Fuentes',
    role: 'Estudiante de Ingeniería Mecánica',
    text: 'Antes tenía que preguntar en persona a cada departamento. Ahora veo todas las oportunidades disponibles en un solo lugar.',
    rating: 5,
  },
  {
    name: 'Dr. Carlos Pizarro',
    role: 'Profesor, Depto. de Computación e Informática',
    text: 'Gestionar las postulaciones de mis ayudantías nunca fue tan eficiente. Reviso perfiles, notas y asigno roles desde una sola interfaz.',
    rating: 5,
  },
  {
    name: 'Dra. Ana Torres',
    role: 'Profesora, Depto. de Matemáticas',
    text: 'Antes recibía CVs por correo y era un caos. Ahora el proceso es ordenado y los estudiantes ven el estado de su postulación en tiempo real.',
    rating: 5,
  },
];

const features = [
  {
    color: 'from-[#7E9BC0] to-[#4A7BA7]',
    tag: 'Para Estudiantes',
    title: 'Busca Ayudantías',
    desc: 'Explora todas las posiciones disponibles en la UCN, filtra por ramo, departamento o semestre y encuentra la oportunidad perfecta.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    ),
  },
  {
    color: 'from-[#4A7BA7] to-[#2B5C8A]',
    tag: 'Para Estudiantes',
    title: 'Postula Fácilmente',
    desc: 'Completa tu perfil académico, agrega tu experiencia y envía tu postulación con carta de presentación directamente desde la plataforma.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    ),
  },
  {
    color: 'from-[#2B5C8A] to-[#1A3F6A]',
    tag: 'Para Estudiantes',
    title: 'Haz Seguimiento',
    desc: 'Revisa el estado de tus postulaciones en tiempo real. Sin incertidumbre ni esperas innecesarias.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
    ),
  },
  {
    color: 'from-[#AC6D33] to-[#8B5226]',
    tag: 'Para Profesores',
    title: 'Crea Posiciones',
    desc: 'Publica ayudantías para tus ramos con descripción, requisitos específicos y el número de plazas disponibles.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
    ),
  },
  {
    color: 'from-[#8B5226] to-[#6B3C1A]',
    tag: 'Para Profesores',
    title: 'Revisa Candidatos',
    desc: 'Accede al perfil completo de cada postulante: historial académico, promedio, experiencia previa y carta de presentación.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
    ),
  },
  {
    color: 'from-[#CAA987] to-[#AC6D33]',
    tag: 'Para Profesores',
    title: 'Gestiona tu Equipo',
    desc: 'Acepta o rechaza postulaciones, asigna roles de ayudante o coordinador y administra tu equipo desde un panel centralizado.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    ),
  },
];

const benefits = [
  {
    color: 'from-[#7E9BC0] to-[#2B5C8A]',
    title: 'Proceso Simplificado',
    desc: 'Olvídate de formularios físicos y correos interminables. Desde la publicación hasta la asignación, todo ocurre en minutos.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>,
  },
  {
    color: 'from-[#4A7BA7] to-[#1A3F6A]',
    title: 'Transparencia Total',
    desc: 'Estudiantes y profesores ven el estado de cada postulación en tiempo real. Sin incertidumbre ni esperas.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>,
  },
  {
    color: 'from-[#AC6D33] to-[#6B3C1A]',
    title: 'Gestión Centralizada',
    desc: 'Un solo panel para gestionar todos tus ramos, ayudantías y equipos. Sin herramientas dispersas ni información perdida.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>,
  },
  {
    color: 'from-[#CAA987] to-[#AC6D33]',
    title: 'Perfil Académico Completo',
    desc: 'Presenta tu mejor versión: promedio, experiencia, proyectos, voluntariados y habilidades en un perfil estructurado.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>,
  },
];

const navLinks = [
  ['#como-funciona', 'Cómo Funciona'],
  ['#sobre', 'La Plataforma'],
  ['#beneficios', 'Beneficios'],
  ['#testimonios', 'Testimonios'],
] as const;

const NAV_SECTION_IDS = ['como-funciona', 'sobre', 'beneficios', 'testimonios'];

export default function Landing() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navBtnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setShowScrollTop(y > 500);

      // Determina la sección activa según qué tan lejos está del top
      const trigger = y + window.innerHeight * 0.35;
      let active = '';
      for (const id of NAV_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= trigger) active = '#' + id;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent(p => (p + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    document.querySelectorAll('.observe-animate, .stagger-children').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Recalcula la posición del indicador cuando la sección activa cambia
  // o cuando el navbar transiciona (scrolled cambia el padding).
  useEffect(() => {
    const btn = navBtnRefs.current.get(activeSection);
    if (btn) {
      setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [activeSection, scrolled]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenu(false);
  };

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/92 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
              <img
                src={ucnShield}
                alt="UCN"
                className="w-11 h-11 object-contain transition-transform group-hover:scale-110 duration-300"
              />
              <div className="flex flex-col leading-tight">
                <span className={`text-[10px] font-semibold tracking-widest uppercase transition-colors ${
                  scrolled ? 'text-gray-400' : 'text-white/50'
                }`}>
                  Universidad Católica del Norte
                </span>
                <span className={`text-base font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                  Plataforma de <span className="text-[#7E9BC0]">Ayudantías</span>
                </span>
              </div>
            </button>

            <div
              ref={navContainerRef}
              className="hidden md:flex items-center gap-8 relative pb-2"
            >
              {navLinks.map(([href, label]) => (
                <button
                  key={href}
                  ref={el => { if (el) navBtnRefs.current.set(href, el); }}
                  onClick={() => scrollTo(href)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === href
                      ? scrolled
                        ? 'text-[#2B5C8A] font-semibold'
                        : 'text-white font-semibold'
                      : scrolled
                        ? 'text-gray-500 hover:text-[#2B5C8A]'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
              <Link
                to="/login"
                className="px-6 py-2.5 bg-[#AC6D33] text-white text-sm font-semibold rounded-full hover:bg-[#8B5226] transition-all hover:shadow-lg hover:shadow-[#AC6D33]/30 hover:-translate-y-0.5"
              >
                Iniciar Sesión
              </Link>

              {/* Indicador deslizante */}
              <span
                className="absolute bottom-0 h-[2px] rounded-full pointer-events-none transition-all duration-350 ease-out"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: activeSection ? 1 : 0,
                  background: 'linear-gradient(90deg, #7E9BC0, #CAA987)',
                  boxShadow: '0 0 8px rgba(126,155,192,0.7)',
                }}
              />
            </div>

            <button
              onClick={() => setMobileMenu(m => !m)}
              className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {mobileMenu ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl mt-2 mx-4 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <img src={ucnShield} alt="UCN" className="w-8 h-8 object-contain" />
              <span className="text-xs text-gray-500 font-medium">Universidad Católica del Norte</span>
            </div>
            <div className="flex flex-col gap-4">
              {navLinks.map(([href, label]) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-gray-700 font-medium py-2 hover:text-[#7E9BC0] transition-colors text-left"
                >
                  {label}
                </button>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="px-6 py-3 bg-[#AC6D33] text-white text-center font-semibold rounded-full hover:bg-[#8B5226] transition-all"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0B1629] via-[#102040] to-[#081420] overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7E9BC0]/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#AC6D33]/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7E9BC0]/4 rounded-full blur-3xl animate-pulse" />

        {[
          { top: '15%', left: '20%', delay: '0s' },
          { top: '25%', left: '75%', delay: '-1s' },
          { top: '60%', left: '15%', delay: '-2s' },
          { top: '70%', left: '85%', delay: '-3s' },
          { top: '40%', left: '50%', delay: '-4s' },
          { top: '80%', left: '40%', delay: '-2.5s' },
        ].map((p, i) => (
          <div key={i} className="particle" style={{ top: p.top, left: p.left, animationDelay: p.delay }} />
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="text-center lg:text-left">
              <div className="animate-fade-in-down">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#7E9BC0] text-sm font-semibold mb-8">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Plataforma oficial UCN
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Conecta con tu
                <span className="gradient-text"> Ayudantía </span>
                Ideal en la
                <span className="gradient-text"> UCN</span>
              </h1>

              <p
                className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                La plataforma que une a estudiantes con oportunidades de ayudantía y a profesores con los mejores talentos de la universidad.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
                style={{ animationDelay: '0.6s' }}
              >
                <Link
                  to="/login"
                  className="group px-8 py-4 bg-[#AC6D33] text-white font-semibold rounded-full hover:bg-[#8B5226] transition-all hover:shadow-2xl hover:shadow-[#AC6D33]/30 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Comenzar Ahora
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
                <button
                  onClick={() => scrollTo('#como-funciona')}
                  className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/15 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Cómo Funciona
                </button>
              </div>

              <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <p className="text-gray-500 text-sm mb-4">Usada por toda la comunidad UCN</p>
                <div className="flex items-center gap-8 justify-center lg:justify-start opacity-60">
                  <span className="text-white font-semibold">Ingeniería</span>
                  <span className="text-white font-semibold">Ciencias</span>
                  <span className="text-white font-semibold">Arquitectura</span>
                  <span className="text-white font-semibold hidden sm:block">Derecho</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-center animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="w-96 h-96 glass rounded-3xl p-8 glow animate-float">
                  <div className="w-full h-full bg-gradient-to-br from-[#7E9BC0]/15 to-[#AC6D33]/15 rounded-2xl flex flex-col items-center justify-center gap-5">
                    <div className="flex items-center gap-4">
                      <img src={ucnShield} alt="UCN" className="w-16 h-16 object-contain" />
                      <div className="leading-snug">
                        <p className="text-white font-light text-lg">Universidad</p>
                        <p className="text-white font-light text-lg">Católica del Norte</p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-white/20" />
                    <p className="text-[#7E9BC0] font-semibold text-sm tracking-widest uppercase">
                      Plataforma de Ayudantías
                    </p>
                    <div className="w-full bg-black/30 rounded-xl p-4 font-mono text-xs space-y-1.5">
                      <p><span className="text-[#7E9BC0]">estado:</span> <span className="text-green-400">"activo"</span></p>
                      <p><span className="text-[#CAA987]">ayudantías:</span> <span className="text-white">60+</span></p>
                      <p><span className="text-gray-500">{'>'}</span> <span className="text-green-400">postulación enviada ✓</span></p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 px-4 py-3 glass rounded-2xl animate-bounce-gentle" style={{ animationDelay: '-1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">Postulación Aceptada</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-8 px-4 py-3 glass rounded-2xl animate-bounce-gentle" style={{ animationDelay: '-2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#7E9BC0]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#7E9BC0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">+120 Estudiantes</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/40 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ──────────────────────────────────── */}
      <section id="como-funciona" className="py-24 lg:py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 observe-animate">
            <span className="inline-block px-4 py-1.5 bg-[#7E9BC0]/15 text-[#2B5C8A] text-sm font-semibold rounded-full mb-4">Cómo Funciona</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Todo lo que necesitas <span className="gradient-text">en un lugar</span>
            </h2>
            <p className="text-gray-500 text-lg">Un flujo claro para estudiantes que buscan ayudantías y para profesores que gestionan su equipo.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {features.map((f, i) => (
              <div key={i} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:shadow-[#7E9BC0]/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{f.icon}</svg>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    f.tag === 'Para Estudiantes'
                      ? 'bg-[#7E9BC0]/15 text-[#2B5C8A]'
                      : 'bg-[#AC6D33]/15 text-[#8B5226]'
                  }`}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE LA PLATAFORMA ────────────────────────────── */}
      <section id="sobre" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7E9BC0]/8 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#AC6D33]/6 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="observe-animate">
              <div className="bg-gradient-to-br from-[#7E9BC0] to-[#2B5C8A] rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8 lg:p-12">
                  <div className="bg-[#0B1629] rounded-2xl p-6 font-mono text-sm overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-gray-500 text-xs ml-2">ayudantias-ucn.ts</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-[#CAA987]">class</span> <span className="text-[#7E9BC0]">AyudantiasUCN</span> <span className="text-white">{'{'}</span></p>
                      <p className="pl-4"><span className="text-[#CAA987]">async</span> <span className="text-[#7E9BC0]">conectar</span><span className="text-white">() {'{'}</span></p>
                      <p className="pl-8"><span className="text-[#CAA987]">const</span> <span className="text-gray-300">estudiantes</span> <span className="text-white">=</span> <span className="text-[#AC6D33]">120</span><span className="text-white">;</span></p>
                      <p className="pl-8"><span className="text-[#CAA987]">const</span> <span className="text-gray-300">profesores</span> <span className="text-white">=</span> <span className="text-[#AC6D33]">45</span><span className="text-white">;</span></p>
                      <p className="pl-8"><span className="text-[#CAA987]">const</span> <span className="text-gray-300">ayudantias</span> <span className="text-white">=</span> <span className="text-green-400">"activas"</span><span className="text-white">;</span></p>
                      <p className="pl-8"><span className="text-[#CAA987]">return</span> <span className="text-[#7E9BC0]">éxitoAcadémico</span><span className="text-white">;</span></p>
                      <p className="pl-4"><span className="text-white">{'}'}</span></p>
                      <p><span className="text-white">{'}'}</span></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[['60+', 'Ayudantías'], ['120+', 'Estudiantes'], ['45+', 'Profesores']].map(([n, l]) => (
                      <div key={l} className="text-center p-4 bg-[#7E9BC0]/10 rounded-xl">
                        <p className="text-2xl font-bold text-[#2B5C8A]">{n}</p>
                        <p className="text-xs text-gray-500 mt-1">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="observe-animate" style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center gap-6 mb-6">
                <img src={ucnLogoFull} alt="Universidad Católica del Norte" className="h-10 object-contain" />
                <div className="w-px h-8 bg-gray-200" />
                <img src={acreditacionColor} alt="Acreditación Institucional UCN" className="h-10 object-contain" />
              </div>
              <span className="inline-block px-4 py-1.5 bg-[#7E9BC0]/15 text-[#2B5C8A] text-sm font-semibold rounded-full mb-4">Sobre la Plataforma</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Modernizando la gestión de <span className="gradient-text">Ayudantías UCN</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Desarrollada para la Universidad Católica del Norte, esta plataforma nació para eliminar el caos de procesos manuales y correos interminables, reemplazándolos por un sistema centralizado, transparente y eficiente.
              </p>
              <p className="text-gray-500 leading-relaxed mb-10">
                Tanto estudiantes como profesores tienen acceso a perfiles detallados, historial de postulaciones y herramientas de gestión, todo diseñado para facilitar la conexión entre talento y oportunidad dentro del campus.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  ['Proceso 100% Digital', 'Sin papeles ni correos. Todo desde la plataforma.'],
                  ['Perfiles Académicos Completos', 'GPA, experiencia, proyectos y más.'],
                  ['Gestión en Tiempo Real', 'Actualizaciones instantáneas para ambos roles.'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#7E9BC0]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#2B5C8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{title}</h4>
                      <p className="text-gray-500 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#AC6D33] text-white font-semibold rounded-full hover:bg-[#8B5226] transition-all hover:shadow-lg hover:shadow-[#AC6D33]/25 hover:-translate-y-1"
              >
                Acceder a la Plataforma
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ─────────────────────────────────────── */}
      <section id="beneficios" className="py-24 lg:py-32 bg-gradient-to-br from-[#0B1629] via-[#102040] to-[#081420] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#7E9BC0]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#AC6D33]/6 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 observe-animate">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-[#7E9BC0] text-sm font-semibold rounded-full mb-4">¿Por qué elegirnos?</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Diseñado para la <span className="gradient-text">Comunidad UCN</span>
            </h2>
            <p className="text-gray-400 text-lg">Un sistema pensado para las necesidades reales de estudiantes y profesores universitarios.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 stagger-children">
            {benefits.map((b, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:bg-white/12 transition-all duration-500 group">
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 bg-gradient-to-br ${b.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{b.icon}</svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ────────────────────────────────────── */}
      <section id="testimonios" className="pt-24 lg:pt-32 pb-16 lg:pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 observe-animate">
            <span className="inline-block px-4 py-1.5 bg-[#7E9BC0]/15 text-[#2B5C8A] text-sm font-semibold rounded-full mb-4">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Lo que dice la <span className="gradient-text">Comunidad UCN</span>
            </h2>
            <p className="text-gray-500 text-lg">Experiencias reales de estudiantes y profesores que ya usan la plataforma.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((t, i) => (
              (i === current || i === (current + 1) % testimonials.length) && (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 animate-slide-up">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#7E9BC0] to-[#2B5C8A] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-gray-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  current === i ? 'bg-[#7E9BC0] w-8' : 'bg-gray-300 hover:bg-[#7E9BC0]/40 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7E9BC0]/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#AC6D33] via-[#8B5226] to-[#6B3C1A] rounded-3xl p-8 sm:p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#AC6D33]/30 rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div className="observe-animate">
                <div className="flex items-center gap-3 mb-6">
                  <img src={ucnShield} alt="UCN" className="h-10 w-10 object-contain opacity-90" />
                  <div className="leading-tight">
                    <p className="text-white/80 font-light text-sm">Universidad Católica del Norte</p>
                    <p className="text-[#CAA987] text-xs tracking-widest uppercase font-semibold">Plataforma de Ayudantías</p>
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  ¿Listo para comenzar tu <span className="text-[#CAA987]">experiencia</span>?
                </h2>
                <p className="text-orange-100 text-lg leading-relaxed mb-8">
                  Únete a la plataforma de ayudantías de la UCN. Encuentra tu próxima oportunidad o el ayudante ideal para tu ramo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/login"
                    className="group px-8 py-4 bg-white text-[#8B5226] font-bold rounded-full hover:bg-orange-50 transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Soy Estudiante
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all hover:-translate-y-1 flex items-center justify-center"
                  >
                    Soy Profesor
                  </Link>
                </div>
              </div>

              <div className="observe-animate" style={{ transitionDelay: '0.2s' }}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['60+', 'Ayudantías Activas'],
                    ['120+', 'Estudiantes Inscritos'],
                    ['45+', 'Profesores Registrados'],
                    ['95%', 'Satisfacción General'],
                  ].map(([num, label]) => (
                    <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                      <p className="text-3xl font-black text-white">{num}</p>
                      <p className="text-orange-200 text-sm mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-gradient-to-br from-[#0B1629] via-[#102040] to-[#081420] text-gray-400">

        {/* Links grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid md:grid-cols-3 gap-10">

            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7E9BC0] inline-block" />
                Para Estudiantes
              </h4>
              <ul className="space-y-3">
                {['Buscar Ayudantías', 'Mi Perfil', 'Mis Postulaciones', 'Dashboard'].map(item => (
                  <li key={item}>
                    <Link to="/login" className="hover:text-[#7E9BC0] transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AC6D33] inline-block" />
                Para Profesores
              </h4>
              <ul className="space-y-3">
                {['Mis Ramos', 'Crear Ayudantía', 'Gestionar Equipo', 'Dashboard'].map(item => (
                  <li key={item}>
                    <Link to="/login" className="hover:text-[#7E9BC0] transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CAA987] inline-block" />
                Acceso Rápido
              </h4>
              <Link
                to="/login"
                className="block px-5 py-3 bg-[#AC6D33] text-white text-center font-semibold rounded-xl hover:bg-[#8B5226] transition-colors text-sm"
              >
                Iniciar Sesión
              </Link>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Acceso exclusivo para la comunidad UCN mediante correo institucional.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Franja institucional */}
        <div className="border-t border-white/8 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              {/* Marca UCN — escudo con texto (sin filtros que rompan) */}
              <div className="flex items-center gap-4">
                <img src={ucnShield} alt="UCN" className="h-14 w-14 object-contain flex-shrink-0" />
                <div className="leading-snug">
                  <p className="text-white font-light text-xl tracking-wide">Universidad</p>
                  <p className="text-white font-light text-xl tracking-wide">Católica del Norte</p>
                  <p className="text-[#7E9BC0] text-xs font-semibold tracking-widest uppercase mt-1">
                    Plataforma de Ayudantías
                  </p>
                </div>
              </div>

              {/* Logos departamentales */}
              <div className="flex items-center gap-5">
                <img
                  src={escuelaLogo}
                  alt="Escuela de Ingeniería UCN"
                  className="h-12 object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
                <div className="w-px h-12 bg-white/20" />
                <img
                  src={iciLogo}
                  alt="Ingeniería Civil Informática UCN"
                  className="h-9 object-contain brightness-0 invert opacity-55 hover:opacity-85 transition-opacity"
                />
                <img
                  src={icciLogo}
                  alt="Departamento ICCI UCN"
                  className="h-9 object-contain brightness-0 invert opacity-55 hover:opacity-85 transition-opacity"
                />
                <img
                  src={itiLogo}
                  alt="Ingeniería en Tecnologías de la Información UCN"
                  className="h-9 object-contain brightness-0 invert opacity-55 hover:opacity-85 transition-opacity"
                />
              </div>

              {/* Acreditación */}
              <div className="flex-shrink-0">
                <img
                  src={acreditacionBlanco}
                  alt="Acreditación Institucional UCN 2025"
                  className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-xs">
              &copy; 2026 Plataforma de Ayudantías UCN — Universidad Católica del Norte
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 text-xs hover:text-[#7E9BC0] transition-colors">Privacidad</a>
              <a href="#" className="text-gray-600 text-xs hover:text-[#7E9BC0] transition-colors">Términos de Uso</a>
            </div>
          </div>
        </div>

      </footer>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#AC6D33] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#8B5226] hover:-translate-y-1 transition-all z-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </button>
      )}
    </div>
  );
}
