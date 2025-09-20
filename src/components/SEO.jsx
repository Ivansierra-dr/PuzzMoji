import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'PuzzMoji - Adivina la película con emojis',
  description = 'El juego diario de emojis. ¿Puedes adivinar la película o serie representada por emojis? Un nuevo desafío cada día.',
  keywords = 'puzzle, emojis, juego, películas, series, adivinanza, wordle, entretenimiento',
  image = 'https://playpuzzmoji.com/og-image.png',
  url = 'https://playpuzzmoji.com',
  type = 'website'
}) => {
  const fullTitle = title.includes('PuzzMoji') ? title : `${title} | PuzzMoji`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="PuzzMoji" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@puzzmoji" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="PuzzMoji Team" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="1 day" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "PuzzMoji",
          "url": "https://playpuzzmoji.com",
          "description": description,
          "applicationCategory": "Game",
          "genre": "Puzzle",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          },
          "author": {
            "@type": "Organization",
            "name": "PuzzMoji Team"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;