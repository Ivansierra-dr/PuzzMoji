import '../styles/LegalMenu.css';

const LegalMenu = ({
  onMenuPageClick
}) => {
  return (
    <div className="legal-menu-container">
      <button
        className="legal-menu-button"
        onClick={() => onMenuPageClick()}
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