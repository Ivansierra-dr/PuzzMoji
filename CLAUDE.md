# PuzzMoji - Emoji Puzzle Game

## 🎮 Descripción del Proyecto
PuzzMoji es un juego diario tipo Wordle donde los jugadores deben adivinar películas, series, libros o canciones representadas por emojis. El objetivo es crear un juego adictivo, viral y con bajos costos de mantenimiento que genere ingresos pasivos.

## 🎯 Características Principales

### MVP (Fase 1)
- **Juego diario**: Un puzzle nuevo cada día
- **6 intentos**: Para adivinar la respuesta correcta
- **Emojis**: 3-6 emojis que representan el título
- **Estadísticas locales**: Racha, partidas jugadas, etc.
- **Compartir resultados**: Cuadrícula tipo Wordle con ✅❌

### Monetización
- **AdMob**: Banners y rewarded ads para pistas
- **Pago único**: Opción de quitar publicidad (~1-2€)
- **Costes mínimos**: <2 USD/mes de mantenimiento

## 🏗️ Arquitectura Técnica

### Stack
- **Frontend**: React + Vite (desarrollo rápido)
- **Mobile**: Capacitor (conversión a app Android/iOS)
- **Storage**: localStorage para estadísticas
- **Backend**: Opcional (Firebase/S3 para puzzles)

### Estructura del Proyecto
```
/src
  /components     # Componentes React
  /pages         # Páginas principales
  /data          # puzzles.json
  /utils         # Funciones auxiliares
  /styles        # CSS/estilos
```

## 📝 Roadmap

### Fase 1 - MVP (2 semanas)
- [x] Configurar proyecto React + Vite
- [ ] Crear pantalla principal con emojis
- [ ] Implementar validación de respuestas
- [ ] Sistema de estadísticas locales
- [ ] Landing page + dominio

### Fase 2 - Publicación (2 semanas)
- [ ] Integrar AdMob
- [ ] Preparar para Google Play
- [ ] Testing cerrado
- [ ] Publicación en Play Store

### Fase 3 - Growth
- [ ] Optimización SEO/ASO
- [ ] Estrategias virales
- [ ] iOS version
- [ ] Más categorías de puzzles

## 🎨 Diseño

### Colores
- Fondo: Blanco/Negro (dark mode futuro)
- Emojis: Coloridos y grandes
- UI: Minimalista, similar a Wordle

### Pantallas
1. **Home**: Logo + "Jugar hoy" + Estadísticas
2. **Juego**: Emojis + input + intentos
3. **Resultado**: Compartir + respuesta correcta
4. **Estadísticas**: Racha, partidas, gráficos

## 💰 Modelo de Negocio

### Ingresos
- **Publicidad**: ~0.01-0.05€ por usuario/día
- **Quitar ads**: 1-2€ pago único
- **Meta**: 1000 usuarios activos = ~10-50€/día pasivos

### Costes
- **Google Play**: 25 USD (único)
- **Dominio**: ~15 USD/año
- **Backend**: <2 USD/mes (Firebase free tier)

## 🚀 Estrategia de Lanzamiento

1. **Validación**: MVP con 10-15 puzzles
2. **Soft launch**: Testing con amigos
3. **Marketing**: Compartir en redes, Reddit, forums
4. **Viral loop**: Sistema de compartir resultados
5. **Iteración**: Basada en métricas y feedback

## 📊 Ejemplos de Puzzles

```json
{
  "date": "2025-01-15",
  "emojis": ["🚢", "❄️", "💔"],
  "answer": ["titanic", "el titanic"],
  "category": "película"
}
```

## 🔑 Claves del Éxito

1. **Simplicidad**: Entender en segundos
2. **Viralidad**: Fácil de compartir
3. **Hábito**: Un puzzle diario
4. **Universal**: Emojis = sin barreras idiomáticas
5. **Bajo mantenimiento**: Automatizable

## 📝 Notas Importantes

- Nombre elegido: **PlayPuzzMoji** o **PuzzMoji**
- Dominio sugerido: playpuzzmoji.com o puzzmoji.app
- Competencia: QuizMoji, EmojiPuzzle (ya existen pero hay espacio)
- Diferenciación: Mejor UX, puzzles curados, comunidad activa

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Tests (cuando se agreguen)
npm test
```

## 📱 Conversión a App Móvil

Cuando esté listo el MVP web:
```bash
npm install @capacitor/core @capacitor/android
npx cap init
npx cap add android
npx cap sync
```