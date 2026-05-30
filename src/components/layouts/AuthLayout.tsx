import { Outlet } from 'react-router';
import AuthTopbar from './AuthTopbar';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AuthTopbar />

      <main className="px-4 py-16">
        <Outlet />
      </main>
    </div>
  );
}