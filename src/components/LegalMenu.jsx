import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LegalMenu.css';

const LegalMenu = () => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/legal');
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