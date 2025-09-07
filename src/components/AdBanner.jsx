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
    if (process.env.NODE_ENV === 'production' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn('AdSense error:', error);
      }
    }
  }, []);

  // No mostrar en desarrollo o modo dev
  const isDev = import.meta.env.VITE_DEV_KEY && 
    new URLSearchParams(window.location.search).get('dev') === import.meta.env.VITE_DEV_KEY;
  
  if (process.env.NODE_ENV !== 'production' || isDev) {
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