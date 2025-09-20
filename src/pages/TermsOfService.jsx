import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

const TermsOfService = () => {
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
        title="Términos de Servicio - PuzzMoji"
        description="Términos y condiciones de uso de PuzzMoji. Conoce las reglas y condiciones para jugar."
        url="https://playpuzzmoji.com/terms-of-service"
      />
      <div className="legal-modal">
        <div className="legal-content">
          <div className="legal-header">
            <h1>📋 Términos de Servicio</h1>
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
              <p>Al usar PuzzMoji, aceptas estos términos. Por favor, léelos cuidadosamente.</p>
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'service' ? 'active' : ''}`}
                onClick={() => toggleSection('service')}
              >
                <span>🎮 1. Descripción del Servicio</span>
                <span className="toggle-icon">{activeSection === 'service' ? '−' : '+'}</span>
              </button>
              {activeSection === 'service' && (
                <div className="section-content">
                  <p>PuzzMoji es un juego web gratuito donde los usuarios adivinan películas y series representadas por emojis.</p>

                  <h3>Características del Servicio</h3>
                  <ul>
                    <li><strong>Puzzle diario:</strong> Un nuevo desafío cada día</li>
                    <li><strong>Estadísticas:</strong> Seguimiento de tu progreso y racha</li>
                    <li><strong>Compartir:</strong> Comparte tus resultados sin spoilers</li>
                    <li><strong>PWA:</strong> Instalable como aplicación móvil</li>
                    <li><strong>Gratuito:</strong> Acceso completo sin pagos</li>
                  </ul>

                  <h3>Financiación</h3>
                  <p>El servicio se mantiene a través de publicidad no intrusiva proporcionada por Google AdSense.</p>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'acceptance' ? 'active' : ''}`}
                onClick={() => toggleSection('acceptance')}
              >
                <span>✅ 2. Aceptación de Términos</span>
                <span className="toggle-icon">{activeSection === 'acceptance' ? '−' : '+'}</span>
              </button>
              {activeSection === 'acceptance' && (
                <div className="section-content">
                  <p><strong>Al acceder o usar PuzzMoji, aceptas automáticamente estos términos.</strong></p>

                  <h3>Capacidad Legal</h3>
                  <ul>
                    <li>Debes tener al menos 13 años para usar el servicio independientemente</li>
                    <li>Los menores de 13 años pueden usar el servicio con supervisión parental</li>
                    <li>Si no estás de acuerdo con algún término, debes dejar de usar el servicio</li>
                  </ul>

                  <h3>Aceptación Continua</h3>
                  <p>Tu uso continuado del servicio constituye aceptación de cualquier actualización de estos términos.</p>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'usage' ? 'active' : ''}`}
                onClick={() => toggleSection('usage')}
              >
                <span>👤 3. Uso Aceptable</span>
                <span className="toggle-icon">{activeSection === 'usage' ? '−' : '+'}</span>
              </button>
              {activeSection === 'usage' && (
                <div className="section-content">
                  <h3>Permitido</h3>
                  <ul>
                    <li>✅ Jugar el puzzle diario</li>
                    <li>✅ Compartir tus resultados en redes sociales</li>
                    <li>✅ Instalar como PWA en tu dispositivo</li>
                    <li>✅ Usar en dispositivos múltiples</li>
                    <li>✅ Discutir puzzles después de 24 horas</li>
                  </ul>

                  <h3>Prohibido</h3>
                  <ul>
                    <li>❌ Hacer trampa o usar bots automatizados</li>
                    <li>❌ Compartir respuestas antes de 24 horas</li>
                    <li>❌ Intentar piratear o romper el servicio</li>
                    <li>❌ Usar el servicio para actividades ilegales</li>
                    <li>❌ Crear cuentas múltiples para manipular estadísticas</li>
                    <li>❌ Hacer ingeniería inversa del código</li>
                  </ul>

                  <h3>Consecuencias</h3>
                  <p>El uso no autorizado puede resultar en la suspensión del acceso al servicio.</p>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'content' ? 'active' : ''}`}
                onClick={() => toggleSection('content')}
              >
                <span>📚 4. Contenido e Propiedad Intelectual</span>
                <span className="toggle-icon">{activeSection === 'content' ? '−' : '+'}</span>
              </button>
              {activeSection === 'content' && (
                <div className="section-content">
                  <h3>Nuestro Contenido</h3>
                  <p>Todo el contenido de PuzzMoji (puzzles, diseño, código) es propiedad intelectual de PuzzMoji.</p>
                  <ul>
                    <li><strong>Puzzles:</strong> Creados originalmente por nuestro equipo</li>
                    <li><strong>Referencias culturales:</strong> Uso educativo y de entretenimiento (fair use)</li>
                    <li><strong>Marca:</strong> "PuzzMoji" y el logo son marcas registradas</li>
                  </ul>

                  <h3>Tu Contenido</h3>
                  <p>Cuando compartes resultados:</p>
                  <ul>
                    <li>Mantienes la propiedad de tus publicaciones</li>
                    <li>Nos concedes licencia para mostrar estadísticas generales</li>
                    <li>No recopilamos ni almacenamos tus publicaciones en redes sociales</li>
                  </ul>

                  <h3>Respeto por la Propiedad Intelectual</h3>
                  <p>Respetamos los derechos de autor. Si crees que algún contenido infringe tus derechos, contacta: playpuzzmoji@gmail.com</p>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'availability' ? 'active' : ''}`}
                onClick={() => toggleSection('availability')}
              >
                <span>🌐 5. Disponibilidad del Servicio</span>
                <span className="toggle-icon">{activeSection === 'availability' ? '−' : '+'}</span>
              </button>
              {activeSection === 'availability' && (
                <div className="section-content">
                  <h3>Disponibilidad</h3>
                  <ul>
                    <li><strong>24/7:</strong> Nos esforzamos por mantener el servicio disponible siempre</li>
                    <li><strong>Mantenimiento:</strong> Puede haber interrupciones ocasionales para mejoras</li>
                    <li><strong>Sin garantías:</strong> No garantizamos disponibilidad del 100%</li>
                  </ul>

                  <h3>Actualizaciones</h3>
                  <ul>
                    <li>Podemos actualizar el juego en cualquier momento</li>
                    <li>Las mejoras se despliegan automáticamente</li>
                    <li>Los datos locales se preservan durante las actualizaciones</li>
                  </ul>

                  <h3>Discontinuación</h3>
                  <p>Si decidimos discontinuar PuzzMoji:</p>
                  <ul>
                    <li>Te avisaremos con 30 días de antelación</li>
                    <li>Podrás exportar tus estadísticas</li>
                    <li>El código fuente podría hacerse público</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'privacy' ? 'active' : ''}`}
                onClick={() => toggleSection('privacy')}
              >
                <span>🔒 6. Privacidad y Datos</span>
                <span className="toggle-icon">{activeSection === 'privacy' ? '−' : '+'}</span>
              </button>
              {activeSection === 'privacy' && (
                <div className="section-content">
                  <p>Tu privacidad es importante para nosotros. Ver nuestra <strong>Política de Privacidad</strong> completa.</p>

                  <h3>Resumen de Datos</h3>
                  <ul>
                    <li><strong>Almacenamiento local:</strong> Tu progreso se guarda en tu dispositivo</li>
                    <li><strong>No hay cuentas:</strong> No requieres registro</li>
                    <li><strong>Anónimo:</strong> No recopilamos información personal</li>
                    <li><strong>AdSense:</strong> Google puede usar cookies para anuncios personalizados</li>
                  </ul>

                  <h3>Control de Datos</h3>
                  <ul>
                    <li>Puedes borrar todos tus datos desde el navegador</li>
                    <li>Puedes desactivar cookies de terceros</li>
                    <li>Tienes control total sobre tu información</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'disclaimers' ? 'active' : ''}`}
                onClick={() => toggleSection('disclaimers')}
              >
                <span>⚠️ 7. Limitación de Responsabilidad</span>
                <span className="toggle-icon">{activeSection === 'disclaimers' ? '−' : '+'}</span>
              </button>
              {activeSection === 'disclaimers' && (
                <div className="section-content">
                  <h3>Exención de Garantías</h3>
                  <p>PuzzMoji se proporciona "tal como es", sin garantías de ningún tipo:</p>
                  <ul>
                    <li>No garantizamos que esté libre de errores</li>
                    <li>No garantizamos disponibilidad ininterrumpida</li>
                    <li>No garantizamos que satisfaga tus expectativas específicas</li>
                  </ul>

                  <h3>Limitación de Responsabilidad</h3>
                  <p>En la máxima medida permitida por la ley:</p>
                  <ul>
                    <li>No somos responsables de daños indirectos o consecuenciales</li>
                    <li>Nuestra responsabilidad total no excederá 10€</li>
                    <li>No somos responsables de la pérdida de datos locales</li>
                  </ul>

                  <h3>Uso bajo tu Propia Responsabilidad</h3>
                  <p>Usas PuzzMoji bajo tu propia responsabilidad. Recomendamos hacer copias de seguridad de tus datos importantes.</p>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'termination' ? 'active' : ''}`}
                onClick={() => toggleSection('termination')}
              >
                <span>🚪 8. Terminación</span>
                <span className="toggle-icon">{activeSection === 'termination' ? '−' : '+'}</span>
              </button>
              {activeSection === 'termination' && (
                <div className="section-content">
                  <h3>Terminación por tu Parte</h3>
                  <ul>
                    <li>Puedes dejar de usar PuzzMoji en cualquier momento</li>
                    <li>Puedes borrar todos tus datos locales</li>
                    <li>No hay penalizaciones ni cargos</li>
                  </ul>

                  <h3>Terminación por Nuestra Parte</h3>
                  <p>Podemos terminar tu acceso si:</p>
                  <ul>
                    <li>Violas estos términos de servicio</li>
                    <li>Usas el servicio de manera abusiva</li>
                    <li>Participas en actividades ilegales</li>
                  </ul>

                  <h3>Efectos de la Terminación</h3>
                  <ul>
                    <li>Tu acceso al servicio cesará inmediatamente</li>
                    <li>Los datos locales permanecen en tu dispositivo</li>
                    <li>Las disposiciones legales siguen siendo válidas</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'legal' ? 'active' : ''}`}
                onClick={() => toggleSection('legal')}
              >
                <span>⚖️ 9. Disposiciones Legales</span>
                <span className="toggle-icon">{activeSection === 'legal' ? '−' : '+'}</span>
              </button>
              {activeSection === 'legal' && (
                <div className="section-content">
                  <h3>Ley Aplicable</h3>
                  <p>Estos términos se rigen por las leyes de España y la Unión Europea.</p>

                  <h3>Resolución de Disputas</h3>
                  <ul>
                    <li><strong>Primera instancia:</strong> Contacto directo (playpuzzmoji@gmail.com)</li>
                    <li><strong>Mediación:</strong> Servicios de mediación online de la UE</li>
                    <li><strong>Tribunales:</strong> Tribunales de España en caso necesario</li>
                  </ul>

                  <h3>Separabilidad</h3>
                  <p>Si alguna disposición de estos términos es inválida, el resto permanece en vigor.</p>

                  <h3>Cesión</h3>
                  <p>No puedes transferir tus derechos bajo estos términos. Nosotros podemos cederlos con notificación previa.</p>
                </div>
              )}
            </div>

            <div className="legal-section">
              <button
                className={`section-toggle ${activeSection === 'changes' ? 'active' : ''}`}
                onClick={() => toggleSection('changes')}
              >
                <span>🔄 10. Cambios en los Términos</span>
                <span className="toggle-icon">{activeSection === 'changes' ? '−' : '+'}</span>
              </button>
              {activeSection === 'changes' && (
                <div className="section-content">
                  <h3>Actualizaciones</h3>
                  <p>Podemos modificar estos términos ocasionalmente para:</p>
                  <ul>
                    <li>Reflejar cambios en el servicio</li>
                    <li>Cumplir con nuevas regulaciones legales</li>
                    <li>Mejorar la claridad y comprensión</li>
                  </ul>

                  <h3>Notificación de Cambios</h3>
                  <ul>
                    <li><strong>Cambios menores:</strong> Actualización de fecha, sin notificación</li>
                    <li><strong>Cambios importantes:</strong> Notificación en el juego con 15 días de antelación</li>
                    <li><strong>Cambios legales:</strong> Email a usuarios registrados (si aplicable)</li>
                  </ul>

                  <h3>Aceptación de Cambios</h3>
                  <p>Continuar usando PuzzMoji después de los cambios constituye aceptación de los nuevos términos.</p>
                </div>
              )}
            </div>

            <div className="legal-footer">
              <div className="contact-info">
                <h3>📧 Contacto</h3>
                <p>Para cualquier consulta sobre estos términos, puedes contactarnos en:</p>
                <p><strong>playpuzzmoji@gmail.com</strong></p>
                <p>Tiempo de respuesta: Máximo 15 días hábiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;