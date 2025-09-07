import '../styles/LegalFooter.css';

const LegalFooter = ({ 
  onPrivacyClick, 
  onTermsClick, 
  onContactClick, 
  onLegalClick 
}) => {
  return (
    <footer className="legal-footer-bar">
      <div className="legal-links">
        <button 
          className="legal-link"
          onClick={onPrivacyClick}
          aria-label="Ver política de privacidad"
        >
          🔒 Privacidad
        </button>
        
        <span className="link-separator">|</span>
        
        <button 
          className="legal-link"
          onClick={onTermsClick}
          aria-label="Ver términos de servicio"
        >
          📋 Términos
        </button>
        
        <span className="link-separator">|</span>
        
        <button 
          className="legal-link"
          onClick={onContactClick}
          aria-label="Ver página de contacto"
        >
          📧 Contacto
        </button>
        
        <span className="link-separator">|</span>
        
        <button 
          className="legal-link"
          onClick={onLegalClick}
          aria-label="Ver aviso legal"
        >
          ⚖️ Legal
        </button>
      </div>
      
      <div className="footer-info">
        <span className="copyright">© 2025 PuzzMoji</span>
        <span className="made-with">
          Hecho con ❤️ para amantes de películas, series y cultura
        </span>
      </div>
    </footer>
  );
};

export default LegalFooter;