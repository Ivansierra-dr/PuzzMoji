import { useState, useEffect } from 'react';
import EmojiPuzzle from './components/EmojiPuzzle';
import Statistics from './components/Statistics';
import LandingPage from './components/LandingPage';
import PWAPrompt from './components/PWAPrompt';
import AdBanner from './components/AdBanner';
import LegalFooter from './components/LegalFooter';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactPage from './components/ContactPage';
import LegalNotice from './components/LegalNotice';
import { usePWA } from './hooks/usePWA';
import puzzmojiLogo from './assets/puzzmoji-logo.svg';
import './App.css';

// Dev tools solo en desarrollo
if (import.meta.env.DEV) {
  // Cargar dev tools inmediatamente
  import('./utils/devTools.js').then(() => {
    console.log('✅ Dev tools loaded');
  });
}

function App() {
  const [showStats, setShowStats] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const { isInstallable, updateAvailable, installApp, updateApp } = usePWA();

  useEffect(() => {
    // Verificar si el usuario ha jugado antes
    const hasPlayed = localStorage.getItem('puzzmoji_gameState') || 
                     localStorage.getItem('puzzmoji_stats');
    
    // Si no ha jugado antes, mostrar landing page
    if (!hasPlayed) {
      setShowLanding(true);
    }
  }, []);

  const startGame = () => {
    setShowLanding(false);
  };

  const showLandingPage = () => {
    setShowLanding(true);
  };

  if (showLanding) {
    return <LandingPage onStartGame={startGame} />;
  }

  return (
    <div className="app content-with-bottom-ad">
      <header className="app-header">
        <div className="app-title">
          <img 
            src={puzzmojiLogo} 
            alt="PuzzMoji Logo" 
            className="app-logo"
            onClick={showLandingPage}
            style={{ cursor: 'pointer' }}
            title="Volver al inicio"
          />
        </div>
        <div className="header-buttons">
          <button 
            className="info-button"
            onClick={showLandingPage}
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
      
      {/* Footer legal */}
      <LegalFooter
        onPrivacyClick={() => setShowPrivacy(true)}
        onTermsClick={() => setShowTerms(true)}
        onContactClick={() => setShowContact(true)}
        onLegalClick={() => setShowLegal(true)}
      />
      
      {/* Modales legales */}
      {showPrivacy && (
        <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
      )}
      
      {showTerms && (
        <TermsOfService onClose={() => setShowTerms(false)} />
      )}
      
      {showContact && (
        <ContactPage onClose={() => setShowContact(false)} />
      )}
      
      {showLegal && (
        <LegalNotice onClose={() => setShowLegal(false)} />
      )}
    </div>
  );
}

export default App
