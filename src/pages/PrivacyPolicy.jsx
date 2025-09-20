import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const scrollTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('section-toggle')) {
          activeElement.blur();
        }
      }, 100);
    };

    const scrollContainer = document.querySelector('.legal-body');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <SEO
        title="Política de Privacidad - PuzzMoji"
        description="Política de privacidad de PuzzMoji. Información sobre cómo tratamos tus datos personales conforme al GDPR."
        url="https://playpuzzmoji.com/privacy-policy"
      />
      <div className="legal-modal">
        <div className="legal-content">
          <div className="legal-header">
            <h1>🔒 Política de Privacidad</h1>
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
              <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>
              <p>En PuzzMoji valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información.</p>
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'info' ? 'active' : ''}`}
                onClick={() => toggleSection('info')}
              >
                <span>📋 1. Información que Recopilamos</span>
                <span className="toggle-icon">{activeSection === 'info' ? '−' : '+'}</span>
              </button>
              {activeSection === 'info' && (
                <div className="section-content">
                  <h3>Información Local</h3>
                  <ul>
                    <li><strong>Progreso del juego:</strong> Tus respuestas, estadísticas y racha se guardan localmente en tu dispositivo</li>
                    <li><strong>Preferencias:</strong> Configuraciones de tema y preferencias de juego</li>
                    <li><strong>Datos técnicos:</strong> Información básica del navegador para optimizar la experiencia</li>
                  </ul>

                  <h3>Google AdSense</h3>
                  <p>Utilizamos Google AdSense para mostrar anuncios. Google puede recopilar:</p>
                  <ul>
                    <li>Información de cookies y tecnologías similares</li>
                    <li>Datos de interacción con anuncios</li>
                    <li>Información demográfica aproximada basada en intereses</li>
                  </ul>

                  <h3>No Recopilamos</h3>
                  <ul>
                    <li>❌ Información personal identificable</li>
                    <li>❌ Datos de contacto (email, teléfono)</li>
                    <li>❌ Localización precisa</li>
                    <li>❌ Datos bancarios o financieros</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'use' ? 'active' : ''}`}
                onClick={() => toggleSection('use')}
              >
                <span>⚙️ 2. Cómo Usamos tu Información</span>
                <span className="toggle-icon">{activeSection === 'use' ? '−' : '+'}</span>
              </button>
              {activeSection === 'use' && (
                <div className="section-content">
                  <ul>
                    <li><strong>Funcionalidad del juego:</strong> Guardar tu progreso y estadísticas</li>
                    <li><strong>Experiencia personalizada:</strong> Recordar tus preferencias</li>
                    <li><strong>Anuncios relevantes:</strong> Mostrar publicidad apropiada a través de Google AdSense</li>
                    <li><strong>Mejoras técnicas:</strong> Optimizar rendimiento y corregir errores</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'cookies' ? 'active' : ''}`}
                onClick={() => toggleSection('cookies')}
              >
                <span>🍪 3. Cookies y Tecnologías Similares</span>
                <span className="toggle-icon">{activeSection === 'cookies' ? '−' : '+'}</span>
              </button>
              {activeSection === 'cookies' && (
                <div className="section-content">
                  <h3>Cookies Esenciales</h3>
                  <ul>
                    <li><strong>localStorage:</strong> Para guardar tu progreso de juego (no se puede desactivar)</li>
                    <li><strong>sessionStorage:</strong> Para mantener el estado durante la sesión</li>
                  </ul>

                  <h3>Cookies de Terceros</h3>
                  <ul>
                    <li><strong>Google AdSense:</strong> Para personalizar anuncios y medir rendimiento</li>
                    <li>Puedes gestionar estas cookies a través del banner de consentimiento</li>
                  </ul>

                  <h3>Control de Cookies</h3>
                  <p>Puedes gestionar tus preferencias de cookies:</p>
                  <ul>
                    <li>A través de la configuración de tu navegador</li>
                    <li>Usando nuestro banner de consentimiento (UE)</li>
                    <li>Contactándonos en playpuzzmoji@gmail.com</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'sharing' ? 'active' : ''}`}
                onClick={() => toggleSection('sharing')}
              >
                <span>🤝 4. Compartir Información</span>
                <span className="toggle-icon">{activeSection === 'sharing' ? '−' : '+'}</span>
              </button>
              {activeSection === 'sharing' && (
                <div className="section-content">
                  <p><strong>No vendemos ni compartimos tu información personal.</strong></p>

                  <h3>Terceros Autorizados</h3>
                  <ul>
                    <li><strong>Google AdSense:</strong> Para mostrar anuncios relevantes</li>
                    <li><strong>Vercel:</strong> Nuestro proveedor de hosting (solo datos técnicos)</li>
                  </ul>

                  <h3>Casos Excepcionales</h3>
                  <p>Solo compartiremos información si es legalmente requerido:</p>
                  <ul>
                    <li>Por orden judicial o autoridad competente</li>
                    <li>Para proteger nuestros derechos legales</li>
                    <li>En caso de fusión o venta (con aviso previo)</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'security' ? 'active' : ''}`}
                onClick={() => toggleSection('security')}
              >
                <span>🛡️ 6. Seguridad</span>
                <span className="toggle-icon">{activeSection === 'security' ? '−' : '+'}</span>
              </button>
              {activeSection === 'security' && (
                <div className="section-content">
                  <ul>
                    <li><strong>HTTPS:</strong> Todas las conexiones están encriptadas</li>
                    <li><strong>Datos locales:</strong> Tu progreso se guarda solo en tu dispositivo</li>
                    <li><strong>Sin servidores:</strong> No almacenamos datos personales en nuestros servidores</li>
                    <li><strong>Terceros confiables:</strong> Solo trabajamos con proveedores que cumplen estándares de seguridad</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'rights' ? 'active' : ''}`}
                onClick={() => toggleSection('rights')}
              >
                <span>⚖️ 5. Tus Derechos (GDPR)</span>
                <span className="toggle-icon">{activeSection === 'rights' ? '−' : '+'}</span>
              </button>
              {activeSection === 'rights' && (
                <div className="section-content">
                  <p>Si eres residente de la UE, tienes derecho a:</p>
                  <ul>
                    <li><strong>Acceso:</strong> Conocer qué información tenemos sobre ti</li>
                    <li><strong>Rectificación:</strong> Corregir información incorrecta</li>
                    <li><strong>Supresión:</strong> Solicitar borrado de tus datos</li>
                    <li><strong>Portabilidad:</strong> Obtener copia de tus datos</li>
                    <li><strong>Oposición:</strong> Oponerte al procesamiento de datos</li>
                    <li><strong>Limitación:</strong> Limitar el uso de tus datos</li>
                  </ul>

                  <p><strong>Para ejercer tus derechos:</strong> playpuzzmoji@gmail.com</p>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'children' ? 'active' : ''}`}
                onClick={() => toggleSection('children')}
              >
                <span>👶 7. Menores de Edad</span>
                <span className="toggle-icon">{activeSection === 'children' ? '−' : '+'}</span>
              </button>
              {activeSection === 'children' && (
                <div className="section-content">
                  <p>PuzzMoji es apto para todas las edades, incluyendo menores de 13 años.</p>
                  <ul>
                    <li><strong>No recopilamos</strong> información personal de menores</li>
                    <li><strong>Los datos del juego</strong> se almacenan localmente en el dispositivo</li>
                    <li><strong>Contenido apropiado:</strong> Todos los puzzles son familiares y educativos</li>
                    <li><strong>Anuncios seguros:</strong> Google AdSense filtra contenido inapropiado</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'changes' ? 'active' : ''}`}
                onClick={() => toggleSection('changes')}
              >
                <span>🔄 8. Cambios en esta Política</span>
                <span className="toggle-icon">{activeSection === 'changes' ? '−' : '+'}</span>
              </button>
              {activeSection === 'changes' && (
                <div className="section-content">
                  <p>Podemos actualizar esta política ocasionalmente. Cuando lo hagamos:</p>
                  <ul>
                    <li>Actualizaremos la fecha de "Última actualización"</li>
                    <li>Los cambios importantes se notificarán en el juego</li>
                    <li>Tendrás 30 días para revisar los cambios</li>
                    <li>Continuar usando PuzzMoji implica aceptar los cambios</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-footer">
              <div className="contact-info">
                <h3>📧 Contacto</h3>
                <p>Para consultas sobre privacidad y protección de datos:</p>
                <p><strong>playpuzzmoji@gmail.com</strong></p>
                <p>Tiempo de respuesta: Máximo 30 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;