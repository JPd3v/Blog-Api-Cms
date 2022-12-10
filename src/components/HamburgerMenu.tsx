import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
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
    document.addEventListener('click', (event) => handleCloseMenu(event));
    return () => {
      document.removeEventListener('click', (event) => handleCloseMenu(event));
    };
  }, [ref]);
}

export default function HamburgerMenu({ children, handleClick }: Props) {
  const hamburgerMenuRef = useRef(null);

  closeMenu(hamburgerMenuRef, handleClick);

  return (
    <div className="hamburger-menu .menu-open">
      <div
        className="hamburger-menu__content hamburger-menu__content--menu-open"
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
