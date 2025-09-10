import { useEffect, useRef } from 'react';
import twemoji from 'twemoji';

const TwemojiText = ({ text, className = '', size = 72 }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = text;
      twemoji.parse(ref.current, {
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
        ext: '.svg',
        size: 'svg',
        className: 'twemoji-img',
        callback: function(icon, options) {
          return ''.concat(options.base, options.size, '/', icon, options.ext);
        }
      });
      
      // Ajustar el tamaño de las imágenes generadas
      const images = ref.current.querySelectorAll('img.twemoji-img');
      images.forEach(img => {
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        img.style.display = 'inline-block';
        img.style.verticalAlign = 'middle';
        img.style.margin = '0 2px';
      });
    }
  }, [text, size]);

  return <span ref={ref} className={className}></span>;
};

export default TwemojiText;