import { useState } from 'react';
import '../styles/TriviaBlog.css';

const TriviaBlog = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Curiosidades - Agregar más cada semana
  const triviaItems = [
    {
      id: 1,
      date: '2025-09-13',
      category: 'cinema',
      emoji: '🎬',
      title: 'El origen de los créditos post-escena de Marvel',
      content: 'Nick Fury apareció por primera vez después de los créditos en Iron Man (2008), iniciando una tradición que cambió el cine para siempre. Desde entonces, los fans nunca abandonan la sala hasta el final.',
      tags: ['Marvel', 'MCU', 'Cine']
    },
    {
      id: 2,
      date: '2025-09-13',
      category: 'records',
      emoji: '🏆',
      title: 'La película más taquillera de todos los tiempos',
      content: 'Avatar (2009) mantuvo el récord durante una década hasta que Avengers: Endgame la superó brevemente. Sin embargo, Avatar recuperó el primer lugar tras su reestreno en China en 2021.',
      tags: ['Avatar', 'Taquilla', 'Récords']
    },
    {
      id: 3,
      date: '2025-09-13',
      category: 'curiosity',
      emoji: '🦈',
      title: 'El tiburón mecánico que creó un género',
      content: 'El tiburón mecánico de "Tiburón" (1975) funcionaba tan mal que Spielberg decidió mostrarlo menos. Esta limitación técnica creó más suspenso y revolucionó el cine de terror.',
      tags: ['Spielberg', 'Terror', 'Clásicos']
    },
    {
      id: 4,
      date: '2025-09-12',
      category: 'series',
      emoji: '📺',
      title: 'El episodio perdido de Los Simpson',
      content: 'Existe un episodio de Los Simpson tan polémico que solo se emitió una vez. "Dead Bart" es considerado una leyenda urbana, pero Matt Groening nunca ha confirmado ni negado su existencia.',
      tags: ['Simpson', 'TV', 'Misterios']
    },
    {
      id: 5,
      date: '2025-09-12',
      category: 'cinema',
      emoji: '🚀',
      title: 'Star Wars casi nunca existió',
      content: 'George Lucas fue rechazado por todos los estudios excepto Fox. Incluso ellos pensaban que sería un fracaso. El propio Lucas apostó con Spielberg que E.T. ganaría más dinero.',
      tags: ['Star Wars', 'Lucas', 'Historia']
    },
    {
      id: 6,
      date: '2025-09-11',
      category: 'animation',
      emoji: '🧸',
      title: 'El secreto oscuro de Toy Story',
      content: 'Toy Story 3 casi tuvo un final donde los juguetes aceptaban su destino en el incinerador. Los ejecutivos de Pixar lloraron en la primera proyección de prueba.',
      tags: ['Pixar', 'Animación', 'Disney']
    },
    {
      id: 7,
      date: '2025-09-11',
      category: 'curiosity',
      emoji: '💍',
      title: 'El anillo único tiene dueño real',
      content: 'El anillo usado en El Señor de los Anillos se vendió por $3 millones. Pero hay 9 anillos "oficiales" usados durante el rodaje, cada uno con diferentes tamaños para las distintas escalas.',
      tags: ['LOTR', 'Props', 'Coleccionables']
    },
    {
      id: 8,
      date: '2025-09-10',
      category: 'records',
      emoji: '⏱️',
      title: 'La película más larga comercialmente exhibida',
      content: 'La película "Ambiancé" dura 720 horas (30 días). Se proyectó una sola vez en 2020. Los espectadores podían entrar y salir, con camas disponibles en el cine.',
      tags: ['Récords', 'Cine Experimental', 'Arte']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', emoji: '🎭' },
    { id: 'cinema', name: 'Cine', emoji: '🎬' },
    { id: 'series', name: 'Series', emoji: '📺' },
    { id: 'animation', name: 'Animación', emoji: '🎨' },
    { id: 'records', name: 'Récords', emoji: '🏆' },
    { id: 'curiosity', name: 'Curiosidades', emoji: '🤔' }
  ];

  const filteredTrivia = selectedCategory === 'all'
    ? triviaItems
    : triviaItems.filter(item => item.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <div className="trivia-blog">
      <div className="trivia-container">
        <button className="back-button" onClick={onClose}>
          ← Volver al juego
        </button>

        <header className="trivia-header">
          <h1>🎬 Curiosidades del Entretenimiento</h1>
          <p className="subtitle">
            Datos fascinantes, récords increíbles y secretos del mundo del cine y la TV
          </p>
        </header>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-name">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="trivia-grid">
          {filteredTrivia.map(item => (
            <article key={item.id} className="trivia-card">
              <div className="trivia-card-header">
                <span className="trivia-emoji">{item.emoji}</span>
                <span className="trivia-date">{formatDate(item.date)}</span>
              </div>
              <h2 className="trivia-title">{item.title}</h2>
              <p className="trivia-content">{item.content}</p>
              <div className="trivia-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="trivia-footer">
          <div className="update-notice">
            <span className="update-icon">🔄</span>
            <p>
              <strong>Nuevas curiosidades cada semana</strong><br/>
              Vuelve pronto para descubrir más secretos del entretenimiento
            </p>
          </div>

          <div className="suggestion-box">
            <h3>💡 ¿Conoces una curiosidad increíble?</h3>
            <p>
              Compártela con nosotros en{' '}
              <a href="mailto:puzzmoji.game@gmail.com?subject=Curiosidad para PuzzMoji">
                puzzmoji.game@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="social-share">
          <p>Comparte estas curiosidades:</p>
          <button
            onClick={() => {
              const text = `¡Descubre curiosidades increíbles del cine y TV en PuzzMoji! 🎬\n\nJuega en: playpuzzmoji.com`;
              if (navigator.share) {
                navigator.share({ text });
              } else {
                navigator.clipboard.writeText(text);
                alert('¡Texto copiado al portapapeles!');
              }
            }}
            className="share-button"
          >
            📤 Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriviaBlog;