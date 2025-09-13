import { useState } from 'react';
import '../styles/AboutPage.css';

const AboutPage = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('mission');

  return (
    <div className="about-page">
      <div className="about-container">
        <button className="back-button" onClick={onClose}>
          ← Volver al juego
        </button>

        <h1>Sobre PuzzMoji</h1>

        <div className="about-hero">
          <div className="emoji-decoration">🎬 🎮 🧩</div>
          <p className="tagline">
            El desafío diario que pone a prueba tu conocimiento del entretenimiento
          </p>
        </div>

        <div className="about-sections">
          <div className="section-tabs">
            <button
              className={activeSection === 'mission' ? 'active' : ''}
              onClick={() => setActiveSection('mission')}
            >
              Nuestra Misión
            </button>
            <button
              className={activeSection === 'story' ? 'active' : ''}
              onClick={() => setActiveSection('story')}
            >
              La Historia
            </button>
            <button
              className={activeSection === 'team' ? 'active' : ''}
              onClick={() => setActiveSection('team')}
            >
              El Equipo
            </button>
          </div>

          <div className="section-content">
            {activeSection === 'mission' && (
              <div className="mission-section">
                <h2>🎯 Nuestra Misión</h2>
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

            {activeSection === 'story' && (
              <div className="story-section">
                <h2>📖 La Historia</h2>
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

            {activeSection === 'team' && (
              <div className="team-section">
                <h2>👥 El Equipo</h2>
                <p>
                  PuzzMoji es desarrollado por un pequeño equipo apasionado por
                  los juegos y el entretenimiento. Trabajamos constantemente para
                  mejorar la experiencia y agregar nuevos puzzles desafiantes.
                </p>
                <div className="team-values">
                  <h3>Nuestros valores:</h3>
                  <ul>
                    <li>✨ <strong>Calidad sobre cantidad</strong> - Cada puzzle es cuidadosamente seleccionado</li>
                    <li>👂 <strong>Escuchamos a la comunidad</strong> - Tu feedback nos importa</li>
                    <li>🎯 <strong>Simplicidad</strong> - Fácil de jugar, difícil de dominar</li>
                    <li>♿ <strong>Accesibilidad</strong> - Para todos los jugadores</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="about-stats">
          <h3>📊 PuzzMoji en números</h3>
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

        <div className="contact-section">
          <h3>💌 Contacto</h3>
          <p>
            ¿Tienes sugerencias, encontraste un error o simplemente quieres saludar?
          </p>
          <p>
            Escríbenos a: <a href="mailto:puzzmoji.game@gmail.com">puzzmoji.game@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
