import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <h2 className="text-3xl font-bold text-slate-900">404</h2>
      <p className="mt-2 text-slate-500">Page not found.</p>

      <Link className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-white" to="/dashboard">
        Back to Dashboard
      </Link>
    </main>
  );
}