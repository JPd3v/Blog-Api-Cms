import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import LogOutButton from './LogOutButton';
import HamburgerMenu from './HamburgerMenu';
import ButtonHamburguerMenu from './ButtonHamburguerMenu';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken } = useAuth();

  function handleclick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav className="Navbar">
      <div className="Navbar__left-side">
        <Link to="/">Blog-Cms</Link>
      </div>
      {userToken ? (
        <>
          <div className="Navbar__right-side">
            <Link to="/">My articles</Link>
            <Link to="/article/new-article">Create article</Link>
            <LogOutButton />
          </div>
          <ButtonHamburguerMenu
            handleClick={() => handleclick()}
            isOpen={isOpen}
          />
          {isOpen ? (
            <HamburgerMenu handleClick={() => handleclick()}>
              <Link to="/">My articles</Link>
              <Link to="/article/new-article">Create article</Link>
              <LogOutButton />
            </HamburgerMenu>
          ) : null}
        </>
      ) : (
        <>
          <div className="Navbar__right-side">
            <Link to="/log-in">Log in</Link>
            <Link to="/sign-up">Sign up</Link>
          </div>
          <ButtonHamburguerMenu
            handleClick={() => handleclick()}
            isOpen={isOpen}
          />
          {isOpen ? (
            <HamburgerMenu handleClick={() => handleclick()}>
              <Link to="/log-in">Log in</Link>
              <Link to="/sign-up">Sign up</Link>
            </HamburgerMenu>
          ) : null}
        </>
      )}
    </nav>
  );
}
