import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { saveAuthData } from '../utils/authStorage';
import { login } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = login({ email, password });

      if (!result) {
        setError('Please check email or password.');
        return;
      }

      saveAuthData(result);

      if (result.user.role === 'photographyCompany') {
        navigate('/listing-cases');
      } else {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl mt-50">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-950">
          Sign in to your account
        </h1>

        <p className="mt-4 text-base text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
            Register
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white px-12 py-10 shadow-sm"
      >
        {error && (
          <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-base font-medium text-slate-700"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-8">
          <label
            htmlFor="password"
            className="mb-2 block text-base font-medium text-slate-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <label className="flex items-center gap-3 text-base text-slate-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-5 w-5 rounded border-slate-300 accent-slate-800"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-base font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          className="mt-8 h-12 w-full rounded-md bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}