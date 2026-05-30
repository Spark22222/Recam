import { NavLink, useNavigate } from 'react-router';
import { clearAuthData } from '../../utils/authStorage';
import logo from '../../assets/logo.jpg';

const navItems = [
  { label: 'Orders', path: '/orders' },
  { label: 'Clients', path: '/clients' },
  { label: 'Staff', path: '/staff' },
];

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  return (
    <header className="h-14 bg-[#0085CA] text-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <NavLink to="/dashboard" className="flex items-center">
            <img
              src={logo}
              alt="Recam logo"
              className="h-7 w-auto object-contain"
            />
          </NavLink>

          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-white' : 'text-white/50 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md p-2 transition hover:bg-sky-700"
          aria-label="logout"
        >
          <svg
            className="h-6 w-6"
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
  );
}