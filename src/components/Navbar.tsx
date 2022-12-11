import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import LogOutButton from './LogOutButton';
import HamburgerMenu from './HamburgerMenu';
import ButtonHamburguerMenu from './ButtonHamburguerMenu';
import useMountTransition from '../hooks/useMountTransition';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken } = useAuth();
  const hasTransitionedIn = useMountTransition(isOpen, 600);

  function handleOpenMEnu() {
    setIsOpen(true);
  }
  function handleCloseMEnu() {
    setIsOpen(false);
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
            handleClick={() => handleOpenMEnu()}
            isOpen={isOpen}
          />
          {(hasTransitionedIn || isOpen) && (
            <HamburgerMenu
              handleClick={() => handleCloseMEnu()}
              isOpen={isOpen}
            >
              <Link to="/">My articles</Link>
              <Link to="/article/new-article">Create article</Link>
              <LogOutButton />
            </HamburgerMenu>
          )}
        </>
      ) : (
        <>
          <div className="Navbar__right-side">
            <Link to="/log-in">Log in</Link>
            <Link to="/sign-up">Sign up</Link>
          </div>
          <ButtonHamburguerMenu
            handleClick={() => handleOpenMEnu()}
            isOpen={isOpen}
          />
          {(isOpen || hasTransitionedIn) && (
            <HamburgerMenu
              handleClick={() => handleCloseMEnu()}
              isOpen={isOpen}
            >
              <Link to="/log-in">Log in</Link>
              <Link to="/sign-up">Sign up</Link>
            </HamburgerMenu>
          )}
        </>
      )}
    </nav>
  );
}
