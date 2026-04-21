import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, AlertCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store';

export default function Login() {
  const login = useStore(s => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    const user = useStore.getState().currentUser;
    navigate(user?.role === 'student' ? '/student/dashboard' : '/profesor/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 items-center justify-center mb-4 shadow-lg shadow-blue-200">
            <GraduationCap size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido/a</h1>
          <p className="text-gray-500 text-sm mt-1">Usa tu cuenta universitaria UCN para ingresar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-gray-50 focus:bg-white transition-all"
                placeholder="tu@ucn.cl"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-gray-50 focus:bg-white transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 animate-slide-up">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-all duration-150 text-sm shadow-sm hover:shadow-md"
            >
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs text-gray-400 mt-6 justify-center">
            <ShieldCheck size={13} />
            <span>Acceso restringido a la comunidad UCN</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link to="/" className="hover:text-gray-600 hover:underline transition-colors">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}
