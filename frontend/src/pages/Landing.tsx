import { Link } from 'react-router-dom';
import { GraduationCap, Users, ClipboardList, Star, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  { icon: GraduationCap, title: 'Perfil Universitario', desc: 'Tu información académica, experiencia laboral, voluntariados y proyectos en un solo lugar para destacar ante los profesores.' },
  { icon: ClipboardList, title: 'Postula con Facilidad', desc: 'Explora las ayudantías disponibles, filtra por ramo y envía tu postulación con una carta de presentación personalizada.' },
  { icon: Users, title: 'Gestión para Profesores', desc: 'Revisa postulaciones, acepta o rechaza candidatos y asigna un coordinador cuando tu equipo tenga tres o más ayudantes.' },
  { icon: Star, title: 'Coordinador de Ayudantía', desc: 'En equipos de tres o más, el profesor puede asignar un coordinador que lidera y organiza al grupo de ayudantes.' },
];

const steps = [
  'Inicia sesión con tu cuenta universitaria UCN',
  'Completa tu perfil con tu información académica y experiencia',
  'Explora ayudantías abiertas y postula a las que te interesan',
  'El profesor revisa tu perfil y carta, y te notifica la decisión',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
              <GraduationCap size={17} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">UCN Ayudantías</span>
          </div>
          <Link
            to="/login"
            className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-28 text-center relative">
          <span
            style={{ animationDelay: '0s' }}
            className="inline-block text-xs font-semibold bg-blue-500/30 border border-blue-400/30 text-blue-100 px-3 py-1 rounded-full mb-6 tracking-wide uppercase animate-slide-up"
          >
            Universidad Católica del Norte
          </span>
          <h1
            style={{ animationDelay: '0.08s' }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl mx-auto animate-slide-up"
          >
            La plataforma de ayudantías de tu universidad
          </h1>
          <p
            style={{ animationDelay: '0.16s' }}
            className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up"
          >
            Conecta a estudiantes con los ramos que más dominan y a profesores con los mejores candidatos.
            Gestiona postulaciones, perfiles y equipos de ayudantes en un solo lugar.
          </p>
          <div
            style={{ animationDelay: '0.24s' }}
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          >
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-all duration-150 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Iniciar sesión <ArrowRight size={17} />
            </Link>
          </div>

          {/* Demo credentials */}
          <div
            style={{ animationDelay: '0.32s' }}
            className="mt-12 inline-block bg-blue-800/50 border border-blue-600/50 rounded-2xl px-6 py-4 text-left text-sm text-blue-100 animate-slide-up"
          >
            <p className="font-semibold text-white mb-2">Cuentas de prueba</p>
            <p><span className="text-blue-300">Estudiante:</span> juan.rodriguez@alumnos.ucn.cl</p>
            <p><span className="text-blue-300">Profesor:</span> carlos.perez@ucn.cl</p>
            <p className="mt-1 text-blue-300">Contraseña: <span className="text-white font-mono">password123</span></p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Todo lo que necesitas</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Una plataforma diseñada para simplificar el proceso completo de gestión de ayudantías.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                style={{ animationDelay: `${idx * 0.07}s` }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-200 animate-fade-in group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors duration-200">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">¿Cómo funciona?</h2>
            <p className="text-gray-500">Cuatro pasos simples para comenzar.</p>
          </div>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li
                key={i}
                style={{ animationDelay: `${i * 0.08}s` }}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 animate-fade-in"
              >
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-sm">
                  {i + 1}
                </span>
                <div className="flex items-center gap-3 flex-1">
                  <CheckCircle size={17} className="text-blue-400 shrink-0" />
                  <p className="text-gray-700">{step}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="text-center mt-12">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-150 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Iniciar sesión <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>© 2025 UCN Ayudantías — Universidad Católica del Norte</p>
      </footer>
    </div>
  );
}
