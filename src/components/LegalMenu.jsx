import { useState } from 'react';
import '../styles/LegalMenu.css';

const LegalMenu = ({
  onPrivacyClick,
  onTermsClick,
  onContactClick,
  onLegalClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="legal-menu-container">
      <button
        className={`legal-menu-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú legal"
        title="Información legal"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="legal-menu-overlay"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="legal-menu-dropdown">
            <div className="legal-menu-header">
              <span>📋 Información Legal</span>
            </div>
            
            <div className="legal-menu-items">
              <button
                className="legal-menu-item"
                onClick={() => handleMenuClick(onPrivacyClick)}
                aria-label="Ver política de privacidad"
              >
                <span className="menu-icon">🔒</span>
                <div className="menu-text">
                  <span className="menu-title">Privacidad</span>
                  <span className="menu-subtitle">GDPR y cookies</span>
                </div>
              </button>

              <button
                className="legal-menu-item"
                onClick={() => handleMenuClick(onTermsClick)}
                aria-label="Ver términos de servicio"
              >
                <span className="menu-icon">📋</span>
                <div className="menu-text">
                  <span className="menu-title">Términos</span>
                  <span className="menu-subtitle">Condiciones de uso</span>
                </div>
              </button>

              <button
                className="legal-menu-item"
                onClick={() => handleMenuClick(onContactClick)}
                aria-label="Ver página de contacto"
              >
                <span className="menu-icon">📧</span>
                <div className="menu-text">
                  <span className="menu-title">Contacto</span>
                  <span className="menu-subtitle">Soporte y ayuda</span>
                </div>
              </button>

              <button
                className="legal-menu-item"
                onClick={() => handleMenuClick(onLegalClick)}
                aria-label="Ver aviso legal"
              >
                <span className="menu-icon">⚖️</span>
                <div className="menu-text">
                  <span className="menu-title">Aviso Legal</span>
                  <span className="menu-subtitle">Responsabilidad</span>
                </div>
              </button>
            </div>

            <div className="legal-menu-footer">
              <span>© 2025 PuzzMoji</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LegalMenu;