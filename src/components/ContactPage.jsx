import { useState } from 'react';
import '../styles/LegalPages.css';

const ContactPage = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleEmailClick = () => {
    window.open('mailto:playpuzzmoji@gmail.com?subject=Contacto PuzzMoji&body=Hola,%0D%0A%0D%0ATengo una consulta sobre PuzzMoji:%0D%0A%0D%0A', '_blank');
  };

  return (
    <div className="legal-modal">
      <div className="legal-content">
        <div className="legal-header">
          <h1>📧 Contacto</h1>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="legal-body">
          <div className="legal-intro">
            <p>¿Tienes preguntas, sugerencias o necesitas ayuda? ¡Nos encanta saber de nuestros jugadores!</p>
          </div>

          <div className="contact-main">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h2>Email Principal</h2>
              <div className="contact-email">
                <button 
                  className="email-button"
                  onClick={handleEmailClick}
                  aria-label="Enviar email"
                >
                  playpuzzmoji@gmail.com
                </button>
              </div>
              <p className="contact-note">Haz clic para abrir tu cliente de email</p>
            </div>
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => toggleSection('support')}
            >
              <span>🆘 Soporte y Ayuda</span>
              <span className="toggle-icon">{activeSection === 'support' ? '−' : '+'}</span>
            </button>
            {activeSection === 'support' && (
              <div className="section-content">
                <h3>¿Necesitas ayuda técnica?</h3>
                <p><strong>Incluye esta información en tu email:</strong></p>
                <ul>
                  <li><strong>Dispositivo:</strong> iPhone, Android, PC, Mac...</li>
                  <li><strong>Navegador:</strong> Chrome, Safari, Firefox, Edge...</li>
                  <li><strong>Problema:</strong> Describe lo que ocurre paso a paso</li>
                  <li><strong>Captura:</strong> Si es posible, adjunta una imagen</li>
                </ul>
                
                <h3>Problemas Comunes</h3>
                <div className="faq-list">
                  <details>
                    <summary>🔄 ¿Se borró mi progreso?</summary>
                    <p>Tu progreso se guarda localmente. Puede perderse si:</p>
                    <ul>
                      <li>Borras los datos del navegador</li>
                      <li>Cambias de dispositivo</li>
                      <li>Usas modo incógnito</li>
                    </ul>
                    <p><strong>Solución:</strong> Lamentablemente no podemos recuperar datos locales perdidos.</p>
                  </details>

                  <details>
                    <summary>📱 ¿Cómo instalar en móvil?</summary>
                    <p><strong>Android/Chrome:</strong> Abre el menú → "Instalar aplicación"</p>
                    <p><strong>iPhone/Safari:</strong> Botón compartir → "Añadir a inicio"</p>
                  </details>

                  <details>
                    <summary>🚫 ¿No cargan los anuncios?</summary>
                    <p>Es normal en las primeras horas. Si persiste:</p>
                    <ul>
                      <li>Desactiva bloqueadores de anuncios</li>
                      <li>Actualiza el navegador</li>
                      <li>Prueba en modo incógnito</li>
                    </ul>
                  </details>

                  <details>
                    <summary>⏰ ¿A qué hora sale el puzzle nuevo?</summary>
                    <p>Los puzzles se actualizan a las <strong>00:00 UTC</strong> (medianoche GMT)</p>
                    <p>En España: 01:00 (invierno) o 02:00 (verano)</p>
                  </details>
                </div>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'suggestions' ? 'active' : ''}`}
              onClick={() => toggleSection('suggestions')}
            >
              <span>💡 Sugerencias y Ideas</span>
              <span className="toggle-icon">{activeSection === 'suggestions' ? '−' : '+'}</span>
            </button>
            {activeSection === 'suggestions' && (
              <div className="section-content">
                <p>¡Tus ideas hacen que PuzzMoji sea mejor! Nos interesa tu opinión sobre:</p>
                
                <h3>Nuevos Contenidos</h3>
                <ul>
                  <li>🎬 Películas que deberíamos incluir</li>
                  <li>📺 Series populares que faltan</li>
                  <li>📚 Libros clásicos o modernos</li>
                  <li>🎵 ¿Música? ¿Canciones famosas?</li>
                  <li>🍕 ¿Comidas típicas por países?</li>
                </ul>
                
                <h3>Nuevas Características</h3>
                <ul>
                  <li>🏆 Sistema de logros o medallas</li>
                  <li>👥 Modo multijugador o competitivo</li>
                  <li>📊 Estadísticas más detalladas</li>
                  <li>🎨 Nuevos temas visuales</li>
                  <li>🔊 Efectos de sonido</li>
                </ul>
                
                <h3>Categorías Temáticas</h3>
                <ul>
                  <li>🎭 Obras de teatro famosas</li>
                  <li>🎪 Espectáculos y musicales</li>
                  <li>🏛️ Historia y personajes históricos</li>
                  <li>🌍 Lugares famosos del mundo</li>
                  <li>🔬 Ciencia y descubrimientos</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'business' ? 'active' : ''}`}
              onClick={() => toggleSection('business')}
            >
              <span>💼 Colaboraciones y Negocio</span>
              <span className="toggle-icon">{activeSection === 'business' ? '−' : '+'}</span>
            </button>
            {activeSection === 'business' && (
              <div className="section-content">
                <h3>Colaboraciones</h3>
                <p>¿Representas una marca, productora o editorial? Hablemos sobre:</p>
                <ul>
                  <li>🎬 Promoción de estrenos cinematográficos</li>
                  <li>📺 Marketing de nuevas series</li>
                  <li>📚 Lanzamientos de libros</li>
                  <li>🎮 Gamificación de contenidos</li>
                  <li>📱 Integración en otras apps</li>
                </ul>
                
                <h3>Patrocinios</h3>
                <p>Ofrecemos espacios publicitarios premium:</p>
                <ul>
                  <li>🎯 Puzzles patrocinados</li>
                  <li>🏷️ Branded challenges</li>
                  <li>📊 Métricas y analytics detallados</li>
                  <li>🌍 Alcance internacional</li>
                </ul>
                
                <h3>Prensa y Media</h3>
                <p>¿Eres periodista o influencer? Contacta para:</p>
                <ul>
                  <li>📰 Material de prensa</li>
                  <li>📊 Estadísticas de usuario</li>
                  <li>💬 Entrevistas con el equipo</li>
                  <li>🎥 Demos y screenshots</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'legal-contact' ? 'active' : ''}`}
              onClick={() => toggleSection('legal-contact')}
            >
              <span>⚖️ Asuntos Legales</span>
              <span className="toggle-icon">{activeSection === 'legal-contact' ? '−' : '+'}</span>
            </button>
            {activeSection === 'legal-contact' && (
              <div className="section-content">
                <h3>Derechos de Autor</h3>
                <p>Si crees que algún contenido infringe tus derechos:</p>
                <ul>
                  <li><strong>Asunto del email:</strong> "DMCA - Infracción de derechos de autor"</li>
                  <li><strong>Incluye:</strong> Identificación del contenido protegido</li>
                  <li><strong>Especifica:</strong> Qué contenido de PuzzMoji lo infringe</li>
                  <li><strong>Proporciona:</strong> Tu información de contacto</li>
                  <li><strong>Declara:</strong> Que tienes autoridad legal para actuar</li>
                </ul>
                
                <h3>Privacidad y GDPR</h3>
                <p>Para ejercer tus derechos bajo GDPR:</p>
                <ul>
                  <li><strong>Acceso:</strong> Solicitar copia de tus datos</li>
                  <li><strong>Rectificación:</strong> Corregir información incorrecta</li>
                  <li><strong>Supresión:</strong> Borrado de datos personales</li>
                  <li><strong>Portabilidad:</strong> Transferir tus datos</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento</li>
                </ul>
                
                <h3>Reportar Abuso</h3>
                <p>Para reportar contenido inapropiado:</p>
                <ul>
                  <li><strong>Asunto:</strong> "Reporte de Abuso"</li>
                  <li><strong>Describe:</strong> El problema específico</li>
                  <li><strong>Incluye:</strong> Captura o descripción del contenido</li>
                  <li><strong>Especifica:</strong> Por qué es problemático</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'response' ? 'active' : ''}`}
              onClick={() => toggleSection('response')}
            >
              <span>⏱️ Tiempos de Respuesta</span>
              <span className="toggle-icon">{activeSection === 'response' ? '−' : '+'}</span>
            </button>
            {activeSection === 'response' && (
              <div className="section-content">
                <h3>Prioridad de Respuesta</h3>
                <div className="response-times">
                  <div className="response-item urgent">
                    <span className="priority-icon">🚨</span>
                    <div className="response-details">
                      <strong>URGENTE (24h)</strong>
                      <p>Problemas de seguridad, fallos críticos, DMCA</p>
                    </div>
                  </div>
                  
                  <div className="response-item high">
                    <span className="priority-icon">🔴</span>
                    <div className="response-details">
                      <strong>ALTA (3-5 días)</strong>
                      <p>Bugs que impiden jugar, problemas técnicos graves</p>
                    </div>
                  </div>
                  
                  <div className="response-item normal">
                    <span className="priority-icon">🟡</span>
                    <div className="response-details">
                      <strong>NORMAL (1 semana)</strong>
                      <p>Sugerencias, preguntas generales, colaboraciones</p>
                    </div>
                  </div>
                  
                  <div className="response-item low">
                    <span className="priority-icon">🟢</span>
                    <div className="response-details">
                      <strong>BAJA (2-3 semanas)</strong>
                      <p>Ideas de contenido, mejoras menores</p>
                    </div>
                  </div>
                </div>
                
                <h3>Factores que Aceleran la Respuesta</h3>
                <ul>
                  <li>✅ Asunto claro y específico</li>
                  <li>✅ Información completa en el primer email</li>
                  <li>✅ Capturas de pantalla cuando sea relevante</li>
                  <li>✅ Pasos para reproducir el problema</li>
                  <li>✅ Información técnica (dispositivo, navegador)</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-footer">
            <div className="contact-summary">
              <h3>🎯 Resumen de Contacto</h3>
              <div className="contact-grid">
                <div className="contact-type">
                  <strong>🆘 Soporte:</strong>
                  <span>playpuzzmoji@gmail.com</span>
                </div>
                <div className="contact-type">
                  <strong>💡 Sugerencias:</strong>
                  <span>playpuzzmoji@gmail.com</span>
                </div>
                <div className="contact-type">
                  <strong>💼 Negocios:</strong>
                  <span>playpuzzmoji@gmail.com</span>
                </div>
                <div className="contact-type">
                  <strong>⚖️ Legal:</strong>
                  <span>playpuzzmoji@gmail.com</span>
                </div>
              </div>
              
              <div className="social-note">
                <p><strong>📱 Redes Sociales:</strong> Próximamente en TikTok, Instagram y Twitter</p>
                <p><strong>🌐 Idiomas:</strong> Español (principal), English (próximamente)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;