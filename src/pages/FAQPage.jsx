import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

const FAQPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const faqItems = [
    {
      id: 1,
      category: 'general',
      question: '¿Qué es PuzzMoji?',
      answer: 'PuzzMoji es un juego diario de adivinanzas donde debes identificar películas, series, libros o canciones representadas mediante emojis. Cada día hay un nuevo puzzle que desafía tu conocimiento del entretenimiento.'
    },
    {
      id: 2,
      category: 'general',
      question: '¿Es PuzzMoji gratis?',
      answer: 'Sí, PuzzMoji es completamente gratuito. Puedes jugar todos los días sin costo alguno.'
    },
    {
      id: 3,
      category: 'gameplay',
      question: '¿Cuántos intentos tengo por día?',
      answer: 'Tienes 4 intentos para adivinar el puzzle del día. Con cada intento fallido, se revela un emoji adicional para ayudarte.'
    },
    {
      id: 4,
      category: 'gameplay',
      question: '¿Puedo jugar puzzles anteriores?',
      answer: 'Actualmente solo está disponible el puzzle del día. Estamos trabajando en un archivo de puzzles anteriores que estará disponible próximamente.'
    },
    {
      id: 5,
      category: 'gameplay',
      question: '¿A qué hora se actualiza el puzzle diario?',
      answer: 'El nuevo puzzle se activa cada día a las 00:00 hora local (España). Asegúrate de volver cada día para mantener tu racha.'
    },
    {
      id: 6,
      category: 'technical',
      question: '¿Puedo jugar en mi móvil?',
      answer: 'Sí, PuzzMoji está optimizado para dispositivos móviles. Puedes jugar desde cualquier navegador o instalar nuestra aplicación web progresiva (PWA) para una mejor experiencia.'
    },
    {
      id: 7,
      category: 'technical',
      question: '¿Cómo instalo PuzzMoji en mi teléfono?',
      answer: 'En iOS: Abre Safari, visita playpuzzmoji.com, toca el botón compartir y selecciona "Añadir a pantalla de inicio". En Android: Abre Chrome, visita el sitio y selecciona "Instalar aplicación" cuando aparezca el mensaje.'
    },
    {
      id: 8,
      category: 'stats',
      question: '¿Cómo funcionan las estadísticas?',
      answer: 'Tus estadísticas incluyen: partidas jugadas, porcentaje de victorias, racha actual y distribución de intentos. Se guardan localmente en tu dispositivo.'
    },
    {
      id: 9,
      category: 'stats',
      question: '¿Puedo recuperar mis estadísticas si cambio de dispositivo?',
      answer: 'Actualmente las estadísticas se guardan localmente. Estamos trabajando en un sistema de cuentas para sincronizar tu progreso entre dispositivos.'
    },
    {
      id: 10,
      category: 'sharing',
      question: '¿Cómo comparto mis resultados?',
      answer: 'Después de completar el puzzle, puedes compartir tu resultado en redes sociales. El sistema genera automáticamente una cuadrícula con emojis que muestra tus intentos sin revelar la respuesta.'
    },
    {
      id: 11,
      category: 'sharing',
      question: '¿Por qué mi resultado compartido solo muestra cuadrados?',
      answer: 'Los cuadrados verdes (✅) y rojos (❌) representan tus intentos correctos e incorrectos sin revelar la respuesta, permitiendo que otros jueguen sin spoilers.'
    },
    {
      id: 12,
      category: 'content',
      question: '¿De dónde vienen los puzzles?',
      answer: 'Nuestro equipo crea cuidadosamente cada puzzle, seleccionando películas, series y libros populares que sean reconocibles a través de emojis.'
    },
    {
      id: 13,
      category: 'content',
      question: '¿Puedo sugerir un puzzle?',
      answer: 'Sí, nos encanta recibir sugerencias. Puedes enviarnos tus ideas a través de nuestra página de contacto o en nuestras redes sociales.'
    },
    {
      id: 14,
      category: 'issues',
      question: '¿Por qué no carga el juego?',
      answer: 'Si el juego no carga, intenta: 1) Refrescar la página, 2) Limpiar el caché del navegador, 3) Verificar tu conexión a internet, 4) Probar con otro navegador.'
    },
    {
      id: 15,
      category: 'issues',
      question: '¿Qué hago si mi respuesta correcta no es aceptada?',
      answer: 'Asegúrate de escribir el título exacto. Aceptamos algunas variaciones comunes, pero intenta con el título oficial en español. Si crees que hay un error, contáctanos.'
    }
  ];

  const categories = {
    general: { name: 'General', emoji: '❓' },
    gameplay: { name: 'Jugabilidad', emoji: '🎮' },
    technical: { name: 'Técnico', emoji: '🔧' },
    stats: { name: 'Estadísticas', emoji: '📊' },
    sharing: { name: 'Compartir', emoji: '📤' },
    content: { name: 'Contenido', emoji: '📝' },
    issues: { name: 'Problemas', emoji: '🆘' }
  };

  const getItemsByCategory = (category) => {
    return faqItems.filter(item => item.category === category);
  };

  return (
    <>
      <SEO
        title="Preguntas Frecuentes - PuzzMoji"
        description="Encuentra respuestas a las preguntas más comunes sobre PuzzMoji, el juego diario de emojis."
        url="https://playpuzzmoji.com/faq"
      />
      <div className="legal-modal">
        <div className="legal-content">
          <div className="legal-header">
            <h1>❓ Preguntas Frecuentes</h1>
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
            <p>Todo lo que necesitas saber sobre PuzzMoji. Despliega las secciones para ver las preguntas y respuestas.</p>
          </div>

          {Object.entries(categories).map(([categoryKey, categoryData]) => {
            const categoryItems = getItemsByCategory(categoryKey);
            return (
              <div key={categoryKey} className="legal-section">
                <button
                  className={`section-toggle ${activeSection === categoryKey ? 'active' : ''}`}
                  onClick={() => toggleSection(categoryKey)}
                >
                  <span>{categoryData.emoji} {categoryData.name}</span>
                  <span className="toggle-icon">{activeSection === categoryKey ? '−' : '+'}</span>
                </button>
                {activeSection === categoryKey && (
                  <div className="section-content">
                    <div className="faq-list">
                      {categoryItems.map((item) => (
                        <details key={item.id}>
                          <summary>{item.question}</summary>
                          <p>{item.answer}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="legal-footer">
            <div className="contact-section">
              <h3>¿No encuentras lo que buscas?</h3>
              <p>
                Si tu pregunta no está aquí, no dudes en contactarnos.
                Estamos aquí para ayudarte.
              </p>
              <button className="contact-btn" onClick={() => navigate('/contact')}>
                📧 Contactar Soporte
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;