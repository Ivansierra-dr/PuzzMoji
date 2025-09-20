import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';
import '../styles/BlogNews.css';

const BlogNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedArticle, setExpandedArticle] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const toggleArticle = (articleId) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  const newsArticles = [
    {
      id: 1,
      date: '2025-09-16',
      category: 'streaming',
      emoji: '🎬',
      title: 'Netflix anuncia nueva estrategia de contenido para 2025',
      excerpt: 'La plataforma de streaming revela planes ambiciosos para el año con más de 100 producciones originales.',
      content: `Netflix ha anunciado su estrategia más ambiciosa hasta la fecha para 2025, con planes de lanzar más de 100 producciones originales incluyendo series, películas y documentales.

      La compañía planea invertir 17 mil millones de dólares en contenido original, enfocándose especialmente en producciones internacionales. Entre los proyectos más esperados se encuentran nuevas temporadas de series exitosas como Stranger Things y The Witcher.

      Ted Sarandos, co-CEO de Netflix, destacó que la estrategia incluye una mayor inversión en contenido interactivo y experiencias inmersivas, siguiendo el éxito de Black Mirror: Bandersnatch. También se espera un mayor enfoque en contenido deportivo en vivo y eventos especiales.`,
      tags: ['Netflix', 'Streaming', 'Series 2025'],
      image: '🎭'
    },
    {
      id: 2,
      date: '2025-09-15',
      category: 'cine',
      emoji: '🏆',
      title: 'Premios Oscar 2025: Favoritos y predicciones tempranas',
      excerpt: 'Las primeras proyecciones apuntan a una competencia reñida en las categorías principales.',
      content: `A medida que nos acercamos a la temporada de premios, los expertos comienzan a señalar los primeros favoritos para los Oscar 2025. Las películas que han generado mayor buzz en festivales internacionales ya se perfilan como contendientes serios.

      En la categoría de Mejor Película, títulos como "Dune: Part Three" y "Oppenheimer" lideran las apuestas tempranas. Christopher Nolan podría finalmente llevarse su primer Oscar como Mejor Director, mientras que en las categorías de actuación, nombres como Margot Robbie y Joaquin Phoenix suenan con fuerza.

      La Academia ha implementado nuevos cambios en las reglas de votación, incluyendo una mayor representación internacional en el comité de selección. Esto podría resultar en nominaciones más diversas y sorpresivas este año.`,
      tags: ['Oscars', 'Premios', 'Cine'],
      image: '🏆'
    },
    {
      id: 3,
      date: '2025-09-14',
      category: 'series',
      emoji: '📺',
      title: 'HBO Max y Discovery+ completan su fusión: Lo que significa para los usuarios',
      excerpt: 'La nueva plataforma unificada promete el catálogo más completo del mercado.',
      content: `La tan esperada fusión entre HBO Max y Discovery+ finalmente se ha completado, creando una de las plataformas de streaming más grandes del mundo. La nueva plataforma, simplemente llamada "Max", combina el prestigioso contenido de HBO con la amplia biblioteca de reality shows y documentales de Discovery.

      Los suscriptores existentes de ambas plataformas serán migrados automáticamente al nuevo servicio, con planes que comienzan desde 9.99€ al mes. La compañía promete mantener todo el contenido existente mientras añade nuevas funcionalidades como perfiles mejorados y recomendaciones potenciadas por IA.

      David Zaslav, CEO de Warner Bros. Discovery, aseguró que la fusión permitirá producir contenido de mayor calidad y variedad, compitiendo directamente con Netflix y Disney+ en el mercado global.`,
      tags: ['HBO', 'Streaming', 'Discovery'],
      image: '📺'
    },
    {
      id: 4,
      date: '2025-09-13',
      category: 'industria',
      emoji: '🎮',
      title: 'Videojuegos al cine: La nueva tendencia que domina Hollywood',
      excerpt: 'Tras el éxito de The Last of Us y Super Mario Bros, más adaptaciones están en camino.',
      content: `Hollywood ha encontrado su nueva mina de oro en las adaptaciones de videojuegos. Después del rotundo éxito de "The Last of Us" en HBO y "Super Mario Bros: La Película" en cines, los estudios están acelerando la producción de nuevas adaptaciones.

      Entre los proyectos confirmados se encuentran series basadas en God of War, Horizon Zero Dawn, y una película de The Legend of Zelda producida por Nintendo. PlayStation Productions y Xbox Entertainment están trabajando activamente con los principales estudios para llevar sus franquicias más populares a la pantalla.

      Los expertos atribuyen este nuevo éxito a un cambio de enfoque: en lugar de crear películas genéricas de acción, los estudios están contratando a fans de los juegos como directores y guionistas, respetando el material original mientras lo adaptan para nuevas audiencias.`,
      tags: ['Videojuegos', 'Adaptaciones', 'Hollywood'],
      image: '🎮'
    },
    {
      id: 5,
      date: '2025-09-12',
      category: 'tecnologia',
      emoji: '🤖',
      title: 'IA en el cine: Cómo está transformando la producción audiovisual',
      excerpt: 'La inteligencia artificial revoluciona desde los efectos especiales hasta el guión.',
      content: `La inteligencia artificial está transformando radicalmente la industria cinematográfica. Desde la preproducción hasta la postproducción, las herramientas de IA están optimizando procesos que antes tomaban meses en cuestión de días.

      En efectos visuales, compañías como ILM están usando IA para crear escenas complejas con multitudes, eliminar cables y objetos no deseados, y mejorar la calidad de imagen en películas clásicas remasterizadas. En el área de guión, herramientas de IA ayudan a analizar estructuras narrativas y predecir el éxito comercial de diferentes finales.

      Sin embargo, el uso de IA también genera controversia. Los sindicatos de actores y guionistas han expresado preocupaciones sobre el reemplazo de trabajadores humanos, llevando a nuevas regulaciones sobre el uso ético de la tecnología en la industria.`,
      tags: ['IA', 'Tecnología', 'Cine'],
      image: '🤖'
    },
    {
      id: 6,
      date: '2025-09-11',
      category: 'streaming',
      emoji: '🌍',
      title: 'El auge del contenido internacional: K-dramas y series latinas conquistan el mundo',
      excerpt: 'Las producciones no anglosajonas dominan los rankings globales de streaming.',
      content: `El contenido internacional está experimentando un boom sin precedentes en las plataformas de streaming globales. Los K-dramas surcoreanos y las series latinoamericanas están superando consistentemente a las producciones estadounidenses en visualizaciones.

      Series como "Squid Game", "La Casa de Papel" y "Betty la Fea" han demostrado que el idioma ya no es una barrera para el éxito global. Netflix reporta que el 60% de sus suscriptores ahora ven regularmente contenido con subtítulos o doblado, un aumento del 200% en los últimos tres años.

      Este fenómeno está llevando a las plataformas a invertir masivamente en producciones locales. Amazon Prime Video anunció planes para producir 40 series originales en América Latina, mientras que Disney+ está duplicando su inversión en contenido asiático para 2025.`,
      tags: ['K-Drama', 'Series Latinas', 'Streaming Global'],
      image: '🌍'
    },
    {
      id: 7,
      date: '2025-09-10',
      category: 'cine',
      emoji: '🦸',
      title: 'El futuro del MCU: Marvel revela su plan para la Fase 6',
      excerpt: 'Kevin Feige presenta la hoja de ruta para los próximos cinco años del universo Marvel.',
      content: `Marvel Studios ha revelado oficialmente sus planes para la Fase 6 del MCU, prometiendo "el evento más ambicioso en la historia del cine de superhéroes". La fase culminará con dos películas de Avengers que se filmarán simultáneamente.

      Entre los proyectos confirmados se encuentran el reinicio de X-Men dentro del MCU, una nueva trilogía de Spider-Man con Tom Holland, y el tan esperado debut de los Cuatro Fantásticos. Feige también confirmó que varios personajes de las series de Disney+ tendrán papeles principales en las próximas películas.

      La estrategia incluye un enfoque renovado en la calidad sobre la cantidad, con Marvel reduciendo su producción anual de 4 a 3 películas y limitando las series a 2 por año. Esta decisión viene después de críticas sobre la "fatiga de superhéroes" y resultados mixtos en taquilla recientes.`,
      tags: ['Marvel', 'MCU', 'Superhéroes'],
      image: '🦸'
    },
    {
      id: 8,
      date: '2025-09-09',
      category: 'industria',
      emoji: '💰',
      title: 'El impacto económico del entretenimiento post-pandemia',
      excerpt: 'La industria alcanza cifras récord mientras se adapta a nuevos modelos de consumo.',
      content: `La industria del entretenimiento ha alcanzado niveles de ingresos sin precedentes en 2024, superando los 2.8 billones de dólares globalmente. Este crecimiento viene impulsado por la diversificación de plataformas y nuevos modelos de monetización.

      El streaming representa ahora el 65% de los ingresos totales, mientras que las salas de cine han encontrado su nicho con experiencias premium como IMAX y 4DX. Los eventos en vivo, desde conciertos hasta proyecciones especiales, han aumentado un 150% desde 2020.

      Los analistas predicen que para 2026, la realidad virtual y el metaverso representarán el 15% de los ingresos de entretenimiento, con compañías como Meta y Apple invirtiendo fuertemente en contenido inmersivo. El gaming continúa siendo el segmento de mayor crecimiento, superando al cine y la música combinados.`,
      tags: ['Economía', 'Industria', 'Tendencias'],
      image: '💰'
    }
  ];

  const categories = {
    all: { name: 'Todos', emoji: '📰' },
    streaming: { name: 'Streaming', emoji: '📺' },
    cine: { name: 'Cine', emoji: '🎬' },
    series: { name: 'Series TV', emoji: '📱' },
    industria: { name: 'Industria', emoji: '🏭' },
    tecnologia: { name: 'Tecnología', emoji: '🤖' }
  };

  const filteredArticles = selectedCategory === 'all'
    ? newsArticles
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <>
      <SEO
        title="Noticias - PuzzMoji"
        description="Las últimas noticias del mundo del entretenimiento en PuzzMoji."
        url="https://playpuzzmoji.com/blog"
      />
      <div className="legal-modal">
        <div className="legal-content">
          <div className="legal-header">
            <h1>📰 PuzzMoji News</h1>
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
            <p>Las últimas noticias del mundo del entretenimiento. Filtra por categoría o explora todas.</p>
          </div>

          <div className="category-nav">
            {Object.entries(categories).map(([categoryKey, categoryData]) => (
              <button
                key={categoryKey}
                className={`category-btn ${selectedCategory === categoryKey ? 'active' : ''}`}
                onClick={() => setSelectedCategory(categoryKey)}
              >
                <span>{categoryData.emoji} {categoryData.name}</span>
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="news-article">
                <div className="article-header">
                  <span className="article-emoji">{article.emoji}</span>
                  <div className="article-meta">
                    <span className="article-category">{categories[article.category].name}</span>
                    <span className="article-date">
                      {new Date(article.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <h2 className="article-title">{article.title}</h2>

                <p className="article-excerpt">{article.excerpt}</p>

                {expandedArticle === article.id && (
                  <div className="article-content">
                    {article.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}

                <button
                  className="read-more-btn"
                  onClick={() => toggleArticle(article.id)}
                >
                  {expandedArticle === article.id ? 'Leer menos' : 'Leer más'}
                  <span className="arrow">
                    {expandedArticle === article.id ? '↑' : '↓'}
                  </span>
                </button>

                <div className="article-tags">
                  {article.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="legal-footer">
            <p className="update-notice">
              📅 Contenido actualizado diariamente
            </p>
            <p className="engagement-text">
              ¿Te gustó este contenido? ¡Vuelve mañana para más noticias y no olvides jugar el puzzle del día!
            </p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogNews;