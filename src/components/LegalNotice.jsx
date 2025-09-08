import { useState, useEffect, useRef } from 'react';
import '../styles/LegalPages.css';

const LegalNotice = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(null);
  const scrollTimeoutRef = useRef(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Remove focus from any focused element after scroll stops
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

  return (
    <div className="legal-modal">
      <div className="legal-content">
        <div className="legal-header">
          <h1>⚖️ Aviso Legal</h1>
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
            <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>
            <p>Este aviso legal regula el uso del servicio PuzzMoji, accesible en playpuzzmoji.com</p>
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'identification' ? 'active' : ''}`}
              onClick={() => toggleSection('identification')}
            >
              <span>🏢 1. Identificación del Responsable</span>
              <span className="toggle-icon">{activeSection === 'identification' ? '−' : '+'}</span>
            </button>
            {activeSection === 'identification' && (
              <div className="section-content">
                <h3>Datos del Servicio</h3>
                <div className="business-info">
                  <div className="info-item">
                    <strong>Denominación:</strong> PuzzMoji
                  </div>
                  <div className="info-item">
                    <strong>Actividad:</strong> Servicios de entretenimiento digital y juegos online
                  </div>
                  <div className="info-item">
                    <strong>Dominio:</strong> playpuzzmoji.com
                  </div>
                  <div className="info-item">
                    <strong>Email de contacto:</strong> playpuzzmoji@gmail.com
                  </div>
                  <div className="info-item">
                    <strong>Jurisdicción:</strong> España, Unión Europea
                  </div>
                </div>
                
                <h3>Registro de Dominio</h3>
                <p>El dominio playpuzzmoji.com está registrado bajo las leyes españolas e internacionales aplicables al registro de dominios de internet.</p>
                
                <h3>Naturaleza del Servicio</h3>
                <p>PuzzMoji es un proyecto personal de entretenimiento digital que ofrece juegos de adivinanza basados en emojis, sin ánimo de lucro directo, financiado a través de publicidad no intrusiva.</p>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'object' ? 'active' : ''}`}
              onClick={() => toggleSection('object')}
            >
              <span>🎯 2. Objeto y Finalidad</span>
              <span className="toggle-icon">{activeSection === 'object' ? '−' : '+'}</span>
            </button>
            {activeSection === 'object' && (
              <div className="section-content">
                <h3>Objeto del Servicio</h3>
                <p>PuzzMoji tiene por objeto proporcionar entretenimiento educativo a través de:</p>
                <ul>
                  <li><strong>Juegos diarios:</strong> Puzzles de adivinanza con emojis</li>
                  <li><strong>Contenido cultural:</strong> Referencias a películas, series y cultura general</li>
                  <li><strong>Estadísticas personales:</strong> Seguimiento de progreso individual</li>
                  <li><strong>Experiencia social:</strong> Compartir resultados sin spoilers</li>
                </ul>
                
                <h3>Finalidad Educativa y Cultural</h3>
                <p>Nuestro servicio promueve:</p>
                <ul>
                  <li>🎓 <strong>Aprendizaje:</strong> Conocimiento de obras culturales</li>
                  <li>🧠 <strong>Memoria:</strong> Ejercitación de la memoria y asociación</li>
                  <li>🎨 <strong>Creatividad:</strong> Interpretación simbólica de emojis</li>
                  <li>🌍 <strong>Cultura general:</strong> Divulgación de obras universales</li>
                  <li>👥 <strong>Socialización:</strong> Actividad compartible y familiar</li>
                </ul>
                
                <h3>Público Objetivo</h3>
                <p>PuzzMoji está diseñado para usuarios de todas las edades, con especial atención a:</p>
                <ul>
                  <li>Familias que buscan entretenimiento compartido</li>
                  <li>Estudiantes interesados en cultura general</li>
                  <li>Entusiastas de películas, series y literatura</li>
                  <li>Usuarios que disfrutan de puzzles y acertijos</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'users' ? 'active' : ''}`}
              onClick={() => toggleSection('users')}
            >
              <span>👥 3. Usuarios y Condiciones de Acceso</span>
              <span className="toggle-icon">{activeSection === 'users' ? '−' : '+'}</span>
            </button>
            {activeSection === 'users' && (
              <div className="section-content">
                <h3>Acceso Libre y Gratuito</h3>
                <p>El acceso a PuzzMoji es:</p>
                <ul>
                  <li>✅ <strong>Gratuito:</strong> Sin costes para el usuario</li>
                  <li>✅ <strong>Sin registro:</strong> No requiere cuenta ni datos personales</li>
                  <li>✅ <strong>Universal:</strong> Accesible desde cualquier dispositivo con navegador</li>
                  <li>✅ <strong>24/7:</strong> Disponible las 24 horas</li>
                  <li>✅ <strong>Sin límites geográficos:</strong> Accesible mundialmente</li>
                </ul>
                
                <h3>Requisitos Técnicos Mínimos</h3>
                <ul>
                  <li><strong>Navegador:</strong> Versión moderna con soporte JavaScript</li>
                  <li><strong>Conexión:</strong> Internet básica (el contenido se carga localmente)</li>
                  <li><strong>Dispositivo:</strong> Smartphone, tablet, ordenador o smart TV</li>
                  <li><strong>Almacenamiento:</strong> Espacio mínimo para datos locales (menos de 1MB)</li>
                </ul>
                
                <h3>Restricciones de Uso</h3>
                <p>Los usuarios se comprometen a:</p>
                <ul>
                  <li>❌ <strong>No automatizar:</strong> Usar bots o scripts para jugar automáticamente</li>
                  <li>❌ <strong>No interferir:</strong> Con el funcionamiento técnico del servicio</li>
                  <li>❌ <strong>No revelar respuestas:</strong> Antes de 24 horas del puzzle</li>
                  <li>❌ <strong>No realizar ingeniería inversa:</strong> Del código o algoritmos</li>
                  <li>❌ <strong>No usar para fines comerciales:</strong> Sin autorización previa</li>
                </ul>
                
                <h3>Menores de Edad</h3>
                <p>PuzzMoji es apropiado para menores, pero recomendamos:</p>
                <ul>
                  <li>Supervisión parental para menores de 13 años</li>
                  <li>Configurar apropiadamente los controles parentales del navegador</li>
                  <li>Revisar la configuración de cookies y anuncios</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'content' ? 'active' : ''}`}
              onClick={() => toggleSection('content')}
            >
              <span>📚 4. Contenido y Propiedad Intelectual</span>
              <span className="toggle-icon">{activeSection === 'content' ? '−' : '+'}</span>
            </button>
            {activeSection === 'content' && (
              <div className="section-content">
                <h3>Contenido Original</h3>
                <p>PuzzMoji es titular de los derechos sobre:</p>
                <ul>
                  <li><strong>Diseño y código:</strong> Interfaz, algoritmos y funcionalidades</li>
                  <li><strong>Selección de puzzles:</strong> Curación y combinación de emojis</li>
                  <li><strong>Metodología de juego:</strong> Mecánicas y reglas específicas</li>
                  <li><strong>Marca y logo:</strong> Identidad visual y denominación "PuzzMoji"</li>
                  <li><strong>Textos originales:</strong> Descripciones, ayudas e interfaz</li>
                </ul>
                
                <h3>Uso de Referencias Culturales</h3>
                <p>Las referencias a obras culturales se realizan bajo los principios de:</p>
                <ul>
                  <li><strong>Fair Use / Uso Legítimo:</strong> Finalidad educativa y cultural</li>
                  <li><strong>Transformación:</strong> Interpretación simbólica a través de emojis</li>
                  <li><strong>No comercialización:</strong> Sin explotación comercial directa de las obras</li>
                  <li><strong>Promoción cultural:</strong> Divulgación y homenaje a las obras</li>
                  <li><strong>Respeto por autores:</strong> No desvalorización ni parodia maliciosa</li>
                </ul>
                
                <h3>Emojis y Elementos Gráficos</h3>
                <ul>
                  <li><strong>Emojis:</strong> Estándar Unicode, de dominio público</li>
                  <li><strong>Iconos:</strong> Propios o con licencia apropiada</li>
                  <li><strong>Fuentes:</strong> Tipografías con licencia web</li>
                  <li><strong>Imágenes:</strong> Recursos libres o de producción propia</li>
                </ul>
                
                <h3>Derechos de los Usuarios</h3>
                <p>Los usuarios conservan los derechos sobre:</p>
                <ul>
                  <li>Sus estadísticas y progreso personal</li>
                  <li>Sus publicaciones en redes sociales</li>
                  <li>Sus ideas y sugerencias enviadas voluntariamente</li>
                </ul>
                
                <h3>Licencia de Uso para Usuarios</h3>
                <p>Se concede a los usuarios una licencia no exclusiva para:</p>
                <ul>
                  <li>Usar PuzzMoji para entretenimiento personal</li>
                  <li>Compartir capturas del resultado final (sin spoilers)</li>
                  <li>Recomendar el servicio a terceros</li>
                  <li>Instalar como PWA en dispositivos personales</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'liability' ? 'active' : ''}`}
              onClick={() => toggleSection('liability')}
            >
              <span>⚖️ 5. Responsabilidad y Limitaciones</span>
              <span className="toggle-icon">{activeSection === 'liability' ? '−' : '+'}</span>
            </button>
            {activeSection === 'liability' && (
              <div className="section-content">
                <h3>Limitaciones de Responsabilidad</h3>
                <p>PuzzMoji, en la máxima medida permitida por la ley:</p>
                <ul>
                  <li><strong>No garantiza disponibilidad continua</strong> del servicio</li>
                  <li><strong>No se responsabiliza de pérdidas de datos locales</strong> almacenados en el navegador</li>
                  <li><strong>No garantiza compatibilidad</strong> con todos los dispositivos o navegadores</li>
                  <li><strong>No controla el contenido publicitario</strong> de terceros (Google AdSense)</li>
                  <li><strong>No se hace responsable de interpretaciones</strong> personales del contenido</li>
                </ul>
                
                <h3>Exclusión de Garantías</h3>
                <p>El servicio se presta "tal como es", sin garantías implícitas de:</p>
                <ul>
                  <li>Comerciabilidad o idoneidad para un propósito particular</li>
                  <li>Ausencia completa de errores o interrupciones</li>
                  <li>Seguridad absoluta frente a vulnerabilidades</li>
                  <li>Exactitud total en las referencias culturales</li>
                </ul>
                
                <h3>Responsabilidades de los Usuarios</h3>
                <p>Los usuarios son responsables de:</p>
                <ul>
                  <li><strong>Configuración de privacidad:</strong> Ajustes de cookies y datos</li>
                  <li><strong>Seguridad del dispositivo:</strong> Actualizaciones y antivirus</li>
                  <li><strong>Uso apropiado:</strong> Cumplimiento de términos y condiciones</li>
                  <li><strong>Supervisión parental:</strong> En caso de uso por menores</li>
                  <li><strong>Backup de datos:</strong> Copias de seguridad si es relevante</li>
                </ul>
                
                <h3>Fuerza Mayor</h3>
                <p>No seremos responsables por interrupciones causadas por:</p>
                <ul>
                  <li>Fallos de infraestructura de internet</li>
                  <li>Mantenimientos de proveedores externos (Vercel, Google)</li>
                  <li>Cambios en políticas de terceros</li>
                  <li>Circunstancias extraordinarias fuera de nuestro control</li>
                </ul>
                
                <h3>Limitación Económica</h3>
                <p>En caso de daños reclamables, nuestra responsabilidad económica máxima será de <strong>10 euros</strong>, reflejando la naturaleza gratuita del servicio.</p>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'modifications' ? 'active' : ''}`}
              onClick={() => toggleSection('modifications')}
            >
              <span>🔄 6. Modificaciones y Actualizaciones</span>
              <span className="toggle-icon">{activeSection === 'modifications' ? '−' : '+'}</span>
            </button>
            {activeSection === 'modifications' && (
              <div className="section-content">
                <h3>Derecho a Modificación</h3>
                <p>Nos reservamos el derecho de:</p>
                <ul>
                  <li><strong>Actualizar el contenido:</strong> Nuevos puzzles, categorías o funciones</li>
                  <li><strong>Mejorar la tecnología:</strong> Optimizaciones y correcciones de errores</li>
                  <li><strong>Modificar la interfaz:</strong> Cambios de diseño y usabilidad</li>
                  <li><strong>Ajustar las políticas:</strong> Adaptación a nuevas regulaciones</li>
                  <li><strong>Cambiar proveedores:</strong> Hosting, publicidad u otros servicios</li>
                </ul>
                
                <h3>Notificación de Cambios</h3>
                <ul>
                  <li><strong>Cambios técnicos menores:</strong> Sin notificación previa</li>
                  <li><strong>Nuevas funcionalidades:</strong> Anuncio en el juego</li>
                  <li><strong>Cambios legales importantes:</strong> Notificación 15 días antes</li>
                  <li><strong>Cambios en privacidad:</strong> Notificación 30 días antes</li>
                  <li><strong>Discontinuación:</strong> Aviso 90 días antes</li>
                </ul>
                
                <h3>Continuidad del Servicio</h3>
                <p>Nuestro compromiso es mantener:</p>
                <ul>
                  <li>La esencia del juego (puzzles diarios de emojis)</li>
                  <li>El acceso gratuito al contenido principal</li>
                  <li>La compatibilidad con datos existentes</li>
                  <li>Los principios de privacidad establecidos</li>
                </ul>
                
                <h3>Feedback y Participación</h3>
                <p>Valoramos las opiniones de usuarios para:</p>
                <ul>
                  <li>Priorizar nuevas características</li>
                  <li>Mejorar la experiencia de usuario</li>
                  <li>Detectar y corregir problemas</li>
                  <li>Mantener el contenido relevante y actualizado</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'jurisdiction' ? 'active' : ''}`}
              onClick={() => toggleSection('jurisdiction')}
            >
              <span>🏛️ 7. Jurisdicción y Ley Aplicable</span>
              <span className="toggle-icon">{activeSection === 'jurisdiction' ? '−' : '+'}</span>
            </button>
            {activeSection === 'jurisdiction' && (
              <div className="section-content">
                <h3>Legislación Aplicable</h3>
                <p>Este aviso legal y el uso de PuzzMoji se rigen por:</p>
                <ul>
                  <li><strong>Legislación española:</strong> Ley de Servicios de la Sociedad de la Información (LSSI)</li>
                  <li><strong>Normativa europea:</strong> GDPR, Directiva de Comercio Electrónico</li>
                  <li><strong>Convenios internacionales:</strong> Derechos de autor y propiedad intelectual</li>
                  <li><strong>Regulación digital:</strong> Normativas aplicables a servicios digitales</li>
                </ul>
                
                <h3>Jurisdicción Competente</h3>
                <p>Para la resolución de controversias relacionadas con PuzzMoji:</p>
                <ul>
                  <li><strong>Primera instancia:</strong> Negociación directa (playpuzzmoji@gmail.com)</li>
                  <li><strong>Mediación:</strong> Servicios de mediación en línea de la UE</li>
                  <li><strong>Arbitraje:</strong> Si ambas partes están de acuerdo</li>
                  <li><strong>Tribunales:</strong> Juzgados y Tribunales de España</li>
                </ul>
                
                <h3>Usuarios Internacionales</h3>
                <p>Para usuarios fuera de la UE:</p>
                <ul>
                  <li>Se aplicará la legislación española en lo que no contradiga sus leyes locales</li>
                  <li>Se respetarán los derechos fundamentales de cada jurisdicción</li>
                  <li>En caso de conflicto normativo, prevalecerá la protección más favorable al usuario</li>
                </ul>
                
                <h3>Resolución Alternativa de Disputas</h3>
                <p>Promovemos la resolución amistosa mediante:</p>
                <ul>
                  <li>Comunicación directa y transparente</li>
                  <li>Plataformas de mediación online</li>
                  <li>Buena fe en las negociaciones</li>
                  <li>Búsqueda de soluciones mutuamente beneficiosas</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-section">
            <button 
              className={`section-toggle ${activeSection === 'contact-legal' ? 'active' : ''}`}
              onClick={() => toggleSection('contact-legal')}
            >
              <span>📞 8. Contacto y Comunicaciones</span>
              <span className="toggle-icon">{activeSection === 'contact-legal' ? '−' : '+'}</span>
            </button>
            {activeSection === 'contact-legal' && (
              <div className="section-content">
                <h3>Información de Contacto</h3>
                <div className="contact-details">
                  <div className="contact-method">
                    <strong>📧 Email principal:</strong>
                    <span>playpuzzmoji@gmail.com</span>
                  </div>
                  <div className="contact-method">
                    <strong>🌐 Sitio web:</strong>
                    <span>https://playpuzzmoji.com</span>
                  </div>
                  <div className="contact-method">
                    <strong>📱 Redes sociales:</strong>
                    <span>Próximamente en TikTok e Instagram</span>
                  </div>
                </div>
                
                <h3>Procedimiento de Comunicación</h3>
                <p>Para comunicaciones formales o legales:</p>
                <ul>
                  <li><strong>Idioma:</strong> Español o inglés</li>
                  <li><strong>Formato:</strong> Email con asunto claro</li>
                  <li><strong>Identificación:</strong> Proporcionar datos relevantes del caso</li>
                  <li><strong>Documentación:</strong> Adjuntar evidencia si es necesario</li>
                  <li><strong>Plazo de respuesta:</strong> Máximo 30 días naturales</li>
                </ul>
                
                <h3>Tipos de Consulta</h3>
                <ul>
                  <li><strong>🔒 Privacidad y GDPR:</strong> Ejercicio de derechos</li>
                  <li><strong>⚖️ Legal:</strong> Cuestiones jurídicas y reclamaciones</li>
                  <li><strong>©️ Propiedad intelectual:</strong> DMCA y derechos de autor</li>
                  <li><strong>🛠️ Técnico:</strong> Problemas de funcionamiento</li>
                  <li><strong>💡 Sugerencias:</strong> Mejoras y nuevas ideas</li>
                </ul>
                
                <h3>Idiomas Disponibles</h3>
                <ul>
                  <li><strong>🇪🇸 Español:</strong> Idioma principal, respuesta completa</li>
                  <li><strong>🇬🇧 English:</strong> Soporte básico disponible</li>
                  <li><strong>🇫🇷 Français:</strong> Comprensión básica, respuesta en español/inglés</li>
                  <li><strong>Otros idiomas:</strong> Uso de traductores automáticos cuando sea posible</li>
                </ul>
                
                <h3>Horario de Atención</h3>
                <p>Al ser un proyecto personal:</p>
                <ul>
                  <li><strong>No hay horario fijo</strong> de atención</li>
                  <li><strong>Respuesta típica:</strong> 24-72 horas</li>
                  <li><strong>Emergencias:</strong> Máximo 24 horas</li>
                  <li><strong>Consultas complejas:</strong> Hasta 30 días</li>
                </ul>
              </div>
            )}
          </div>

          <div className="legal-footer">
            <div className="legal-summary">
              <h3>📋 Resumen Ejecutivo</h3>
              <p>PuzzMoji es un servicio gratuito de entretenimiento educativo que respeta tu privacidad, cumple con las normativas aplicables y busca proporcionar una experiencia positiva y enriquecedora a todos los usuarios.</p>
              
              <div className="key-points">
                <div className="point">✅ Servicio gratuito y sin registro</div>
                <div className="point">✅ Cumplimiento GDPR y normativa española</div>
                <div className="point">✅ Contenido apropiado para todas las edades</div>
                <div className="point">✅ Contacto directo para cualquier consulta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
