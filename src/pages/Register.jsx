import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    setError('');
    setLoading(true);

    try {
      await signup(email, password, name);
      navigate('/dashboard'); // Redirige al panel después del registro exitoso
    } catch (err) {
      console.error("Error detallado al crear la cuenta:", err);
      // Manejo de errores de Firebase más específico
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está en uso.');
          break;
        case 'auth/invalid-email':
          setError('El formato del correo electrónico no es válido.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil (mínimo 6 caracteres).');
          break;
        default:
          setError('Ocurrió un error al crear la cuenta.');
          break;
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
            <UserPlus className="mr-3 h-8 w-8 text-pink-500" />
            Crear una Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una?{' '}
            <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
              Inicia sesión
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-center">{error}</p>}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" placeholder="Tu nombre"/>
            </div>
            <div>
              <label htmlFor="email-address">Correo electrónico</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" placeholder="Correo electrónico"/>
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input id="password" name="password" type="password" required minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" placeholder="Contraseña (mín. 6 caracteres)"/>
            </div>
            <div>
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <input id="confirm-password" name="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" placeholder="Confirma tu contraseña"/>
            </div>
          </div>

          <div>
            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-gray-400">
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
