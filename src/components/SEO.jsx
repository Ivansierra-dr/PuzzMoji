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
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="PuzzMoji Team" />
      <link rel="canonical" href={url} />

      {/* SEO Directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="Spanish" />
      <meta name="geo.region" content="ES" />
      <meta name="geo.country" content="Spain" />
      <meta name="revisit-after" content="1 day" />
      <meta name="rating" content="General" />

      {/* Alternate & Sitemap */}
      <link rel="alternate" href="https://playpuzzmoji.com/" hreflang="es" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="PuzzMoji - Juego diario de emojis" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="PuzzMoji" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="PuzzMoji - Juego diario de emojis" />
      <meta name="twitter:site" content="@puzzmoji" />
      <meta name="twitter:creator" content="@puzzmoji" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "PuzzMoji",
          "url": url,
          "description": description,
          "applicationCategory": "Game",
          "genre": "Puzzle",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "inLanguage": "es-ES",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          },
          "author": {
            "@type": "Organization",
            "name": "PuzzMoji Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "PuzzMoji",
            "logo": {
              "@type": "ImageObject",
              "url": "https://playpuzzmoji.com/puzzmoji-logo.svg",
              "width": 512,
              "height": 512
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;