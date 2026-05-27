import { Link } from 'react-router';

export default function RegisterPage() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900">Register</h2>
      <p className="mb-6 text-sm text-slate-500">
        Registration UI will be implemented later.
      </p>

      <Link className="text-sm font-medium text-blue-600" to="/login">
        Back to Login
      </Link>
    </div>
  );
}