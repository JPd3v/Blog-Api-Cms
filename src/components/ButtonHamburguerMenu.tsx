import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

interface IButtonHamburguerMenu {
  handleClick: () => void;
  isOpen: boolean;
}

export default function ButtonHamburguerMenu({
  handleClick,
  isOpen,
}: IButtonHamburguerMenu) {
  return (
    <button
      type="button"
      className="hamburger-button"
      onClick={() => handleClick()}
      aria-label={isOpen ? 'close navigation menu' : 'open navigation menu'}
    >
      {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
    </button>
  );
}
