import { useEffect, useRef } from 'react';
import '../styles/AdBanner.css';

const AdBanner = ({ 
  slot, 
  format = 'auto',
  style = {},
  className = ''
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Solo cargar anuncios en producción
    if (import.meta.env.MODE === 'production' && window.adsbygoogle && adRef.current) {
      const adElement = adRef.current;

      // Asegurar que el contenedor tenga dimensiones antes de inicializar AdSense
      const timer = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});

          // Forzar límites de altura después de que AdSense inyecte sus estilos
          // AdSense usa data-full-width-responsive y puede sobrescribir max-height
          const enforceHeightLimits = () => {
            if (adElement) {
              // Forzar max-height en el elemento ins
              adElement.style.setProperty('max-height', '90px', 'important');
              adElement.style.setProperty('overflow', 'hidden', 'important');

              // También forzar en iframes hijos que AdSense crea
              const iframes = adElement.querySelectorAll('iframe');
              iframes.forEach(iframe => {
                iframe.style.setProperty('max-height', '90px', 'important');
              });
            }
          };

          // Aplicar inmediatamente
          enforceHeightLimits();

          // Observer para cuando AdSense modifique los estilos
          const observer = new MutationObserver(enforceHeightLimits);
          observer.observe(adElement, {
            attributes: true,
            attributeFilter: ['style'],
            childList: true,
            subtree: true
          });

          // Cleanup
          return () => observer.disconnect();
        } catch (error) {
          console.warn('AdSense error:', error);
        }
      }, 100); // Pequeño delay para asegurar que el DOM esté renderizado

      return () => clearTimeout(timer);
    }
  }, []);

  // No mostrar en desarrollo o modo dev
  const isDev = import.meta.env.VITE_DEV_KEY && 
    new URLSearchParams(window.location.search).get('dev') === import.meta.env.VITE_DEV_KEY;
  
  if (import.meta.env.MODE !== 'production' || isDev) {
    return (
      <div className={`ad-banner ad-banner--placeholder ${className}`} style={style}>
        <div className="ad-placeholder">
          📺 Anuncio aquí (desarrollo)
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-banner ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-test'}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;