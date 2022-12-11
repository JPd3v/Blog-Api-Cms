import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useMountTransition from '../hooks/useMountTransition';

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  isOpen: boolean;
}

function closeMenu(ref: React.MutableRefObject<any>, callBack: () => void) {
  useEffect(() => {
    function handleCloseMenu(event: MouseEvent) {
      if (
        ref.current &&
        ref.current.contains(event.target) &&
        ref.current !== event.target
      ) {
        callBack();
      }
    }
    document.addEventListener('mousedown', (event) => handleCloseMenu(event));
    return () => {
      document.removeEventListener('mousedown', (event) =>
        handleCloseMenu(event)
      );
    };
  }, [ref]);
}

export default function HamburgerMenu({
  children,
  handleClick,
  isOpen,
}: Props) {
  const hamburgerMenuRef = useRef(null);
  const hasTransitionedIn = useMountTransition(isOpen, 1);
  closeMenu(hamburgerMenuRef, handleClick);

  return (
    <div
      className={`hamburger-menu ${
        isOpen && hasTransitionedIn ? 'hamburger-menu--open' : ''
      }`}
    >
      <div
        className={`hamburger-menu__content ${
          isOpen && hasTransitionedIn
            ? 'hamburger-menu__content--menu-open'
            : ''
        }`}
        ref={hamburgerMenuRef}
      >
        {children}
        <button
          type="button"
          className="hamburger-menu__close-button"
          aria-label="close navigation menu"
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}
