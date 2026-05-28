import { Link, Outlet, useNavigate } from 'react-router';
import { clearAuthData } from '../utils/authStorage';

export default function AuthLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="h-20 bg-[#0085CA] text-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
          <div className="flex items-center gap-16">
            <Link to="/dashboard" className="text-2xl font-bold tracking-tight">
              recam
            </Link>

            <nav>
              <Link to="/listing-cases" className="text-base font-semibold">
                Listing Cases
              </Link>
            </nav>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md p-2 transition hover:bg-sky-700"
            aria-label="logout"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12h8.25m0 0l-3-3m3 3l-3 3"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="px-4 py-16">
        <Outlet />
      </main>
    </div>
  );
}