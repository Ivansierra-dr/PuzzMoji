import { useState } from 'react';
import '../styles/LandingPage.css';
import puzzmojiLogo from '../assets/puzzmoji-logo.svg';

const LandingPage = ({ onStartGame }) => {
  const [showFeatures, setShowFeatures] = useState(false);

  const features = [
    {
      emoji: "🎭",
      title: "Un nuevo puzzle cada día",
      description: "Desafíos frescos diariamente con películas y series famosas"
    },
    {
      emoji: "🧠",
      title: "Ejercita tu mente",
      description: "Pon a prueba tu conocimiento de entretenimiento popular"
    },
    {
      emoji: "📱",
      title: "Comparte tus resultados",
      description: "Presume tus éxitos en redes sociales sin spoilers"
    },
    {
      emoji: "🏆",
      title: "Sistema de rachas",
      description: "Mantén tu racha diaria y conviértete en un experto"
    }
  ];

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <img src={puzzmojiLogo} alt="PuzzMoji" className="hero-logo" />
          </div>
          
          <h1 className="hero-title">
            <span className="gradient-text">PuzzMoji</span>
          </h1>
          
          <p className="hero-subtitle">
            ¿Puedes adivinar la película o serie por sus emojis?
          </p>
          
          <div className="emoji-preview">
            <span className="preview-emoji">🐰</span>
            <span className="preview-emoji">⏰</span>
            <span className="preview-emoji">🕳️</span>
            <span className="preview-arrow">→</span>
            <span className="preview-answer">¿Alicia en el País de las Maravillas?</span>
          </div>
          
          <button 
            onClick={onStartGame}
            className="play-button"
          >
            🎮 ¡Jugar ahora!
          </button>
          
          <button 
            onClick={() => setShowFeatures(!showFeatures)}
            className="features-toggle"
          >
            {showFeatures ? 'Ocultar características' : 'Ver características'} 
            <span className={`arrow ${showFeatures ? 'up' : 'down'}`}>▼</span>
          </button>
        </div>
      </div>
      
      {showFeatures && (
        <div className="features-section">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-emoji">{feature.emoji}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="how-to-play" id="how-to-play">
        <h2>¿Cómo jugar?</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <p>Observa los emojis del día</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Adivina la película o serie</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>Tienes 6 intentos para acertar</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <p>Con cada fallo, se revelan más emojis</p>
          </div>
          <div className="step">
            <span className="step-number">5</span>
            <p>¡Comparte tu resultado!</p>
          </div>
        </div>
      </div>
      
      <footer className="landing-footer">
        <p>
          Inspirado en Wordle • Hecho con ❤️ para los amantes del entretenimiento
        </p>
        <div className="social-links">
          <span>Comparte PuzzMoji:</span>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'PuzzMoji - Juego diario de emojis',
                  text: '¿Puedes adivinar la película por sus emojis? ¡Juega PuzzMoji!',
                  url: 'https://playpuzzmoji.com'
                });
              } else {
                navigator.clipboard.writeText('¡Juega PuzzMoji! https://playpuzzmoji.com');
                alert('¡Enlace copiado!');
              }
            }}
            className="share-link-btn"
          >
            📤 Compartir
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
