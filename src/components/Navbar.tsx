import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogOutButton from './LogOutButton';

export default function NavBar() {
  const { userToken } = useAuth();

  return (
    <nav className="Navbar">
      <div className="Navbar__left-side">
        <Link to="/">Blog-Cms</Link>
      </div>
      {userToken ? (
        <div className="Navbar__right-side">
          <Link to="/">My articles</Link>
          <Link to="/article/new-article">Create article</Link>
          <LogOutButton />
        </div>
      ) : (
        <div className="Navbar__right-side">
          <Link to="/log-in">Log in</Link>
          <Link to="/sign-up">Sign up</Link>
        </div>
      )}
    </nav>
  );
}
