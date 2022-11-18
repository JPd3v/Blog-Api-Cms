import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton';

export default function NavBar() {
  return (
    <nav className="Navbar">
      <Link to="/">Blog-Cms</Link>
      <Link to="/log-in">Log in</Link>
      <Link to="/sign-up">Sign up</Link>
      <LogOutButton />
    </nav>
  );
}
