import '../styles/LegalPages.css';

const LegalMenuPage = ({
  onPrivacyClick,
  onTermsClick,
  onContactClick,
  onLegalClick,
  onClose
}) => {
  const handleMenuClick = (action) => {
    action();
  };

  return (
    <div className="legal-page">
      <div className="legal-page-header">
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Cerrar"
          title="Volver al juego"
        >
          ✕
        </button>
        <h1>📋 Información Legal</h1>
        <p>Accede a toda la información legal y de contacto de PuzzMoji</p>
      </div>

      <div className="legal-page-content">
        <div className="legal-menu-grid">
          <button
            className="legal-menu-card"
            onClick={() => handleMenuClick(onPrivacyClick)}
            aria-label="Ver política de privacidad"
          >
            <div className="menu-card-icon">🔒</div>
            <div className="menu-card-content">
              <h3>Política de Privacidad</h3>
              <p>Información sobre el tratamiento de datos personales conforme al GDPR</p>
            </div>
          </button>

          <button
            className="legal-menu-card"
            onClick={() => handleMenuClick(onTermsClick)}
            aria-label="Ver términos de servicio"
          >
            <div className="menu-card-icon">📋</div>
            <div className="menu-card-content">
              <h3>Términos de Servicio</h3>
              <p>Condiciones de uso y términos legales de la aplicación</p>
            </div>
          </button>

          <button
            className="legal-menu-card"
            onClick={() => handleMenuClick(onContactClick)}
            aria-label="Ver página de contacto"
          >
            <div className="menu-card-icon">📧</div>
            <div className="menu-card-content">
              <h3>Contacto</h3>
              <p>Información de contacto, soporte técnico y consultas</p>
            </div>
          </button>

          <button
            className="legal-menu-card"
            onClick={() => handleMenuClick(onLegalClick)}
            aria-label="Ver aviso legal"
          >
            <div className="menu-card-icon">⚖️</div>
            <div className="menu-card-content">
              <h3>Aviso Legal</h3>
              <p>Información sobre responsabilidad legal y jurisdicción</p>
            </div>
          </button>
        </div>

        <div className="legal-page-footer">
          <p>© 2025 PuzzMoji - Todos los derechos reservados</p>
          <p>Desarrollado con ❤️ para amantes de los puzzles</p>
        </div>
      </div>
    </div>
  );
};

export default LegalMenuPage;