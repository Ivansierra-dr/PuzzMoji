# 📺 Configuración de Google AdSense para PuzzMoji

## 🚀 Pasos para configurar AdSense

### 1. Crear cuenta de Google AdSense
1. Ve a [Google AdSense](https://www.google.com/adsense/)
2. Inicia sesión con tu cuenta de Google
3. Agrega tu sitio web: `playpuzzmoji.com`
4. Espera la aprobación (puede tardar 1-14 días)

### 2. Obtener Publisher ID
Una vez aprobado:
1. Ve a **Anuncios** → **Por sitio**
2. Selecciona tu sitio
3. Copia tu Publisher ID (formato: `ca-pub-XXXXXXXXXXXXXXXXX`)

### 3. Configurar variables de entorno

#### Desarrollo (.env.local):
```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-test
```

#### Producción (Vercel Environment Variables):
```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX
```

### 4. Crear unidades de anuncios
En AdSense, crea estas unidades:
1. **Banner inferior**: Anuncio adaptativo horizontal
2. **Intersticial**: Anuncio intersticial (para futura implementación)
3. **Video reward**: Anuncio de video con recompensa (para futura implementación)

### 5. Configurar slots de anuncios
Actualiza `src/App.jsx` con los slots reales:
```jsx
<AdBanner 
  slot="TU_SLOT_ID_AQUI"  // Reemplazar "1234567890"
  format="auto"
  className="ad-banner--bottom"
/>
```

## 📊 Ubicaciones actuales de anuncios

### ✅ Implementado:
- **Banner inferior fijo**: Visible siempre, no interfiere con gameplay
- **Placeholder en desarrollo**: Muestra "📺 Anuncio aquí (desarrollo)"
- **Oculto en modo dev**: No se muestra cuando se usa `?dev=clave`

### 🚧 Próximos:
- **Intersticial post-puzzle**: Después de completar/fallar
- **Rewarded video**: Ver anuncio → obtener pista extra
- **Banner superior opcional**: Para mayor monetización

## 🎯 Optimización de ingresos

### CPM estimados:
- **Banner inferior**: €0.50-2.00 por 1000 vistas
- **Intersticial**: €2-6 por 1000 vistas  
- **Rewarded video**: €8-15 por 1000 vistas

### Mejores prácticas:
- Mantener UX fluida (anuncios no intrusivos)
- Testear diferentes posiciones con A/B testing
- Monitorear métricas de engagement vs ingresos
- Considerar modelo freemium (quitar anuncios por €2.99)

## 🔧 Testing

### Desarrollo:
- Los anuncios muestran placeholder visual
- No se cargan scripts de AdSense en desarrollo

### Producción:
- Verificar que los anuncios se cargan correctamente
- Monitorear en Google AdSense console
- Testear en diferentes dispositivos y navegadores

## 📈 Próximos pasos

1. **Solicitar aprobación** de AdSense para playpuzzmoji.com
2. **Obtener Publisher ID** real
3. **Configurar slots** de unidades de anuncios
4. **Implementar Fase 2**: Intersticial + Rewarded video
5. **Análisis de performance**: RPM, CTR, fill rate
6. **Implementar Fase 3**: Modelo freemium

## 🚨 Notas importantes

- **No hacer click** en tus propios anuncios (viola ToS de AdSense)
- **Contenido apropiado**: Asegurar que puzzles sean family-friendly
- **Política de AdSense**: Revisar compliance regularmente
- **Métricas clave**: CTR > 1%, RPM > €1, Fill rate > 90%