import { NavLink, Outlet } from 'react-router';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Listing Cases', path: '/listing-cases' },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 p-6 text-white">
        <h1 className="mb-8 text-2xl font-bold">Recam</h1>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm transition ${
                  isActive
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b bg-white px-8 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Frontend Management System</p>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}