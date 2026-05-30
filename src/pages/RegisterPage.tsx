import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { register } from '../services/authService';
import { saveAuthData } from '../utils/authStorage';
import type { RegisterRole } from '../types/auth';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RegisterRole>('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    if (!name.trim()) {
      setError('Full name is required.');
      return;
    }

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    if (!confirmPassword.trim()) {
      setError('Please confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = register({
        name,
        email,
        password,
        role,
      });

      if (!result) {
        setError('Email already exists.');
        return;
      }

      saveAuthData(result);

      if (result.user.role === 'photographyCompany') {
        navigate('/orders');
      } else {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-950">
          Create your account
        </h1>

        <p className="mt-4 text-base text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
            Sign in
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
          <label htmlFor="name" className="mb-2 block text-base font-medium text-slate-700">
            Full name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            disabled={loading}
            onChange={(event) => setName(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="email" className="mb-2 block text-base font-medium text-slate-700">
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={email}
            disabled={loading}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="role" className="mb-2 block text-base font-medium text-slate-700">
            Account type
          </label>

          <select
            id="role"
            value={role}
            disabled={loading}
            onChange={(event) => setRole(event.target.value as RegisterRole)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          >
            <option value="user">User</option>
            <option value="photographyCompany">Photography Company</option>
          </select>
        </div>

        <div className="mt-6">
          <label htmlFor="password" className="mb-2 block text-base font-medium text-slate-700">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            disabled={loading}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-base font-medium text-slate-700"
          >
            Confirm password
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            disabled={loading}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 h-12 w-full rounded-md bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </section>
  );
}