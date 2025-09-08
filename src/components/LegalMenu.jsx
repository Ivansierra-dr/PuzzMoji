import { useRef } from 'react';
import '../styles/LegalMenu.css';

const LegalMenu = ({
  onMenuPageClick
}) => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    onMenuPageClick();
    // Remove focus from button after clicking
    if (buttonRef.current) {
      setTimeout(() => {
        buttonRef.current.blur();
      }, 100);
    }
  };

  return (
    <div className="legal-menu-container">
      <button
        ref={buttonRef}
        className="legal-menu-button"
        onClick={handleClick}
        aria-label="Menú legal"
        title="Información legal"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

export default LegalMenu;