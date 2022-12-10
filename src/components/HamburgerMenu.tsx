import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
}

export default function HamburgerMenu({ children, handleClick }: Props) {
  return (
    <div className="hamburger-menu">
      <div className="hamburger-menu__content">
        {children}
        <button
          type="button"
          className="hamburger-menu__close-button"
          onClick={() => handleClick()}
          aria-label="close navigation menu"
        >
          <AiOutlineClose />{' '}
        </button>
      </div>
    </div>
  );
}
