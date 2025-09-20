import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      <SEO
        title="Sobre PuzzMoji - Conoce nuestro juego"
        description="Descubre la historia detrás de PuzzMoji, el juego diario de emojis inspirado en Wordle."
        url="https://playpuzzmoji.com/about"
      />
      <div className="legal-modal">
        <div className="legal-content">
          <div className="legal-header">
            <h1>👥 Sobre PuzzMoji</h1>
            <button
              className="close-button"
              onClick={handleClose}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="legal-body">
          <div className="legal-intro">
            <div className="about-hero">
              <div className="emoji-decoration">🎬 🎮 🧩</div>
              <p className="tagline">
                El desafío diario que pone a prueba tu conocimiento del entretenimiento
              </p>
            </div>
          </div>

          <div className="legal-section">
            <button
              className={`section-toggle ${activeSection === 'mission' ? 'active' : ''}`}
              onClick={() => toggleSection('mission')}
            >
              <span>🎯 Nuestra Misión</span>
              <span className="toggle-icon">{activeSection === 'mission' ? '−' : '+'}</span>
            </button>
            {activeSection === 'mission' && (
              <div className="section-content">
                <p>
                  En PuzzMoji creemos que el entretenimiento une a las personas.
                  Nuestro objetivo es crear un momento diario de diversión y desafío
                  que puedas compartir con amigos y familia.
                </p>
                <ul>
                  <li>🎮 <strong>Juego diario gratuito</strong> - Siempre accesible para todos</li>
                  <li>🌍 <strong>Universal</strong> - Los emojis trascienden idiomas</li>
                  <li>🧠 <strong>Desafiante pero justo</strong> - Puzzles cuidadosamente seleccionados</li>
                  <li>📱 <strong>Social</strong> - Comparte sin spoilers</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button
              className={`section-toggle ${activeSection === 'story' ? 'active' : ''}`}
              onClick={() => toggleSection('story')}
            >
              <span>📖 La Historia</span>
              <span className="toggle-icon">{activeSection === 'story' ? '−' : '+'}</span>
            </button>
            {activeSection === 'story' && (
              <div className="section-content">
                <p>
                  PuzzMoji nació en 2025 como un proyecto apasionante para crear
                  el próximo juego viral. Inspirados por el éxito de
                  los juegos diarios, decidimos combinar dos cosas que todos amamos:
                  los emojis y las películas.
                </p>
                <div className="timeline">
                  <div className="timeline-item">
                    <span className="date">Septiembre 2025</span>
                    <p>💡 La idea original surge</p>
                  </div>
                  <div className="timeline-item">
                    <span className="date">Septiembre 2025</span>
                    <p>🚀 Lanzamiento de la versión beta</p>
                  </div>
                  <div className="timeline-item">
                    <span className="date">Futuro</span>
                    <p>🌟 Nuevas categorías y modos de juego</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button
              className={`section-toggle ${activeSection === 'team' ? 'active' : ''}`}
              onClick={() => toggleSection('team')}
            >
              <span>👥 El Equipo</span>
              <span className="toggle-icon">{activeSection === 'team' ? '−' : '+'}</span>
            </button>
            {activeSection === 'team' && (
              <div className="section-content">
                <p>
                  PuzzMoji es desarrollado por un pequeño equipo apasionado por
                  los juegos y el entretenimiento. Trabajamos constantemente para
                  mejorar la experiencia y agregar nuevos puzzles desafiantes.
                </p>
                <h3>Nuestros valores:</h3>
                <ul>
                  <li>✨ <strong>Calidad sobre cantidad</strong> - Cada puzzle es cuidadosamente seleccionado</li>
                  <li>👂 <strong>Escuchamos a la comunidad</strong> - Tu feedback nos importa</li>
                  <li>🎯 <strong>Simplicidad</strong> - Fácil de jugar, difícil de dominar</li>
                  <li>♿ <strong>Accesibilidad</strong> - Para todos los jugadores</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button
              className={`section-toggle ${activeSection === 'stats' ? 'active' : ''}`}
              onClick={() => toggleSection('stats')}
            >
              <span>📊 PuzzMoji en números</span>
              <span className="toggle-icon">{activeSection === 'stats' ? '−' : '+'}</span>
            </button>
            {activeSection === 'stats' && (
              <div className="section-content">
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Puzzles únicos</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">365</span>
                    <span className="stat-label">Días de diversión</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Posibilidades</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="legal-footer">
            <div className="contact-section">
              <h3>💌 Contacto</h3>
              <p>
                ¿Tienes sugerencias, encontraste un error o simplemente quieres saludar?
              </p>
              <p>
                Escríbenos a: <a href="mailto:playpuzzmoji@gmail.com">playpuzzmoji@gmail.com</a>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;