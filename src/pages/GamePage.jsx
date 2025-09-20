import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import EmojiPuzzle from '../components/EmojiPuzzle';
import Statistics from '../components/Statistics';
import PWAPrompt from '../components/PWAPrompt';
import AdBanner from '../components/AdBanner';
import LegalMenu from '../components/LegalMenu';
import { usePWA } from '../hooks/usePWA';
import puzzmojiLogo from '../assets/puzzmoji-logo.svg';
import '../App.css';

function GamePage() {
  const [showStats, setShowStats] = useState(false);
  const navigate = useNavigate();
  const { isInstallable, updateAvailable, installApp, updateApp } = usePWA();

  const handleLogoClick = () => {
    navigate('/');
  };

  const showHowToPlay = () => {
    navigate('/?howtoplay=true');
  };

  return (
    <>
      <SEO
        title="Jugar PuzzMoji - Puzzle del día"
        description="Juega al puzzle de emojis del día. Adivina la película o serie. 4 intentos para ganar."
        url="https://playpuzzmoji.com/game"
      />
      <div className="app content-with-bottom-ad">
      <header className="app-header">
        <div className="app-title">
          <img
            src={puzzmojiLogo}
            alt="PuzzMoji Logo"
            className="app-logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
            title="Volver al inicio"
          />
        </div>
        <div className="header-buttons">
          <button
            className="info-button"
            onClick={showHowToPlay}
            aria-label="Información del juego"
            title="¿Cómo jugar?"
          >
            ℹ️
          </button>
          <button
            className="stats-button"
            onClick={() => setShowStats(true)}
            aria-label="Ver estadísticas"
            title="Mis estadísticas"
          >
            📊
          </button>
          <LegalMenu />
        </div>
      </header>

      <main className="app-main">
        <EmojiPuzzle />
      </main>

      {/* Banner inferior fijo */}
      <AdBanner
        slot="8303646094"
        format="auto"
        className="ad-banner--bottom"
      />

      <Statistics
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />

      <PWAPrompt
        isInstallable={isInstallable}
        updateAvailable={updateAvailable}
        onInstall={installApp}
        onUpdate={updateApp}
      />
      </div>
    </>
  );
}

export default GamePage;