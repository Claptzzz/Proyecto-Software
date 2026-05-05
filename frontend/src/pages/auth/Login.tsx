import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowLeft, GraduationCap, BookOpen } from 'lucide-react';
import { useStore } from '../../store';
import type { UserRole } from '../../types';
import ucnShield from '../../assets/LogoUCN_acentuado.png';
import escuelaLogo from '../../assets/Logo Escuela Ingeniería.svg';
import acreditacionBlanco from '../../assets/acreditacion-blanco-horizontal.png';

// UCN Brand colors (Guía de Normas Gráficas):
// Pantone 652 C → #7E9BC0  (azul institucional)
// Pantone 471 C → #AC6D33  (terra / cobre)
// Terra 60%     → #CAA987  (terra claro)

function GoogleGIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );
}

export default function Login() {
  const login = useStore(s => s.login);
  const loginWithGoogle = useStore(s => s.loginWithGoogle);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState<UserRole | null>(null);

  function goToDashboard() {
    const user = useStore.getState().currentUser;
    if (user?.role === 'student') navigate('/student/dashboard');
    else if (user?.role === 'professor') navigate('/profesor/dashboard');
    else if (user?.role === 'admin') navigate('/admin/dashboard');
    else navigate('/');
  }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = login(email, password);
    setLoading(false);
    if (!ok) {
      setError('Correo o contraseña incorrectos.');
      return;
    }
    goToDashboard();
  }

  function handleGoogle(role: UserRole) {
    setError('');
    setGoogleLoading(role);
    // Simulación de OAuth — en producción aquí se invoca el flujo de Google
    setTimeout(() => {
      const ok = loginWithGoogle(role);
      setGoogleLoading(null);
      if (!ok) {
        setError(`No se encontró una cuenta de ${role === 'student' ? 'estudiante' : 'profesor'} asociada.`);
        return;
      }
      goToDashboard();
    }, 600);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">

      {/* ── Panel institucional (izquierda en desktop) ───────── */}
      <aside className="relative hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0B1629] via-[#102040] to-[#081420] text-white p-12">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#7E9BC0]/12 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-10 w-96 h-96 bg-[#AC6D33]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-12 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-4 mb-10">
            <img src={ucnShield} alt="Universidad Católica del Norte" className="h-16 w-16 object-contain" />
            <div className="leading-snug">
              <p className="text-white font-light text-xl">Universidad</p>
              <p className="text-white font-light text-xl">Católica del Norte</p>
              <p className="text-[#7E9BC0] text-[10px] font-semibold tracking-[0.2em] uppercase mt-1">
                Plataforma de Ayudantías
              </p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            Bienvenido/a a la <span className="bg-gradient-to-r from-[#7E9BC0] to-[#CAA987] bg-clip-text text-transparent">comunidad UCN</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-md">
            Accede con tu cuenta institucional para gestionar ayudantías, postulaciones y conectar con la comunidad académica.
          </p>

          <div className="mt-12 space-y-4 max-w-md">
            {[
              ['Acceso institucional', 'Solo correos @ucn.cl y @alumnos.ucn.cl'],
              ['Datos protegidos', 'Conexión cifrada según norma UCN'],
              ['Disponible 24/7', 'Postula y gestiona desde cualquier lugar'],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={16} className="text-[#7E9BC0]" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4 pt-10 border-t border-white/10">
          <img src={escuelaLogo} alt="Escuela de Ingeniería UCN" className="h-10 object-contain brightness-0 invert opacity-70" />
          <img src={acreditacionBlanco} alt="Acreditación Institucional UCN 2025" className="h-12 object-contain opacity-80" />
        </div>
      </aside>

      {/* ── Formulario (derecha) ─────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-10 lg:py-14 bg-gradient-to-br from-white via-gray-50/40 to-[#7E9BC0]/5">
        <div className="w-full max-w-md">

          {/* Header móvil */}
          <div className="lg:hidden mb-8 animate-slide-up">
            <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#2B5C8A] text-sm mb-6 transition-colors">
              <ArrowLeft size={15} />
              Volver al inicio
            </Link>
            <div className="flex items-center gap-3">
              <img src={ucnShield} alt="UCN" className="h-12 w-12 object-contain" />
              <div className="leading-tight">
                <p className="text-gray-500 text-[10px] font-semibold tracking-widest uppercase">
                  Universidad Católica del Norte
                </p>
                <p className="text-gray-900 font-bold text-base">
                  Plataforma de <span className="text-[#7E9BC0]">Ayudantías</span>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900">Iniciar sesión</h1>
            <p className="text-gray-500 text-sm mt-1.5">Usa tu cuenta universitaria UCN para continuar</p>
          </div>
          <div className="lg:hidden mb-7 animate-slide-up">
            <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
            <p className="text-gray-500 text-sm mt-1">Usa tu cuenta universitaria UCN para continuar</p>
          </div>

          {/* Botones de Google diferenciados por rol */}
          <div className="space-y-3 animate-scale-in">
            <button
              type="button"
              onClick={() => handleGoogle('student')}
              disabled={googleLoading !== null || loading}
              className="group relative w-full flex items-center gap-3 bg-white border border-gray-200 hover:border-[#7E9BC0] hover:shadow-md hover:shadow-[#7E9BC0]/10 disabled:opacity-60 disabled:cursor-not-allowed text-gray-700 font-medium py-3 px-4 rounded-xl transition-all"
            >
              <span className="w-9 h-9 rounded-lg bg-[#7E9BC0]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7E9BC0]/15 transition-colors">
                <GraduationCap size={18} className="text-[#2B5C8A]" />
              </span>
              <span className="flex-1 text-left">
                <span className="block text-sm font-semibold text-gray-900">
                  {googleLoading === 'student' ? 'Conectando…' : 'Continuar como Estudiante'}
                </span>
                <span className="block text-[11px] text-gray-500 mt-0.5">Acceso con Google · @alumnos.ucn.cl</span>
              </span>
              <GoogleGIcon className="w-5 h-5 flex-shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => handleGoogle('professor')}
              disabled={googleLoading !== null || loading}
              className="group relative w-full flex items-center gap-3 bg-white border border-gray-200 hover:border-[#AC6D33] hover:shadow-md hover:shadow-[#AC6D33]/10 disabled:opacity-60 disabled:cursor-not-allowed text-gray-700 font-medium py-3 px-4 rounded-xl transition-all"
            >
              <span className="w-9 h-9 rounded-lg bg-[#AC6D33]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#AC6D33]/15 transition-colors">
                <BookOpen size={18} className="text-[#8B5226]" />
              </span>
              <span className="flex-1 text-left">
                <span className="block text-sm font-semibold text-gray-900">
                  {googleLoading === 'professor' ? 'Conectando…' : 'Continuar como Profesor'}
                </span>
                <span className="block text-[11px] text-gray-500 mt-0.5">Acceso con Google · @ucn.cl</span>
              </span>
              <GoogleGIcon className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">o con tu correo</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Formulario tradicional */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-scale-in" style={{ animationDelay: '0.05s' }}>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 tracking-wide">Correo institucional</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E9BC0]/40 focus:border-[#7E9BC0] bg-gray-50/60 focus:bg-white transition-all"
                  placeholder="tu.correo@ucn.cl"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 tracking-wide">Contraseña</label>
                <button
                  type="button"
                  className="text-[11px] text-[#2B5C8A] hover:text-[#7E9BC0] hover:underline font-medium"
                  onClick={() => setError('Para recuperar tu contraseña contacta a soporte UCN.')}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E9BC0]/40 focus:border-[#7E9BC0] bg-gray-50/60 focus:bg-white transition-all"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 animate-slide-up">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading !== null}
              className="w-full bg-[#AC6D33] hover:bg-[#8B5226] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-lg hover:shadow-[#AC6D33]/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-6 justify-center">
            <ShieldCheck size={13} className="text-[#7E9BC0]" />
            <span>Acceso restringido a la comunidad UCN</span>
          </div>
        </div>
      </main>
    </div>
  );
}
