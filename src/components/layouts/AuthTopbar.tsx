import { Link } from 'react-router';
import logo from '../../assets/logo.jpg';

export default function AuthTopbar() {
  return (
    <header className="h-14 bg-[#0085CA] text-white">
      <div className="mx-auto flex h-full max-w-7xl items-center px-4">
        <Link to="/login" className="flex items-center">
          <img
            src={logo}
            alt="Recam logo"
            className="h-7 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}