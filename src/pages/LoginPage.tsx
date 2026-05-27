import { Link } from 'react-router';

export default function LoginPage() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900">Login</h2>
      <p className="mb-6 text-sm text-slate-500">
        Login UI will be implemented in the next task.
      </p>

      <Link className="text-sm font-medium text-blue-600" to="/register">
        Go to Register
      </Link>
    </div>
  );
}