import { getCurrentUser } from '../utils/authStorage';

export default function DashboardPage() {
  const currentUser = getCurrentUser();

  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <h1 className="text-4xl font-semibold text-slate-900">
        Hi, {currentUser?.name || 'User'}!
      </h1>
    </section>
  );
}