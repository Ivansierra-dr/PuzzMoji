# PuzzMoji 🎮

Un juego diario de adivinanzas con emojis inspirado en Wordle. Los jugadores deben adivinar películas, series y libros basándose en pistas de emojis.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 16+ y npm
- Git

### Instalación
```bash
git clone <repo-url>
cd PuzzMoji
npm install
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run serve        # Servir build con serve
npm run lint         # Linter ESLint
```

## 🛠️ Guía para Desarrolladores

### Estructura del Proyecto
```
src/
├── components/      # Componentes React
├── data/           # Datos del juego (puzzles.json)
├── utils/          # Utilidades (devTools.js)
├── hooks/          # Custom hooks
├── styles/         # Archivos CSS
└── assets/         # Recursos estáticos
```

### 🔧 Herramientas de Desarrollo

**IMPORTANTE**: Las dev tools solo están disponibles para desarrolladores internos.

#### Acceso a Dev Tools
Para acceder a las herramientas de desarrollo:

1. **Desarrollo Local**: 
   ```
   http://localhost:5173/?dev=true&key=puzzmoji2025
   ```

2. **Verificación**: Una vez activado, verás:
   - Panel rojo flotante en la esquina superior derecha
   - Consola mostrará: `🛠️ DEV MODE ACTIVATED`
   - Funciones disponibles en `window.devTools`

#### Funciones Disponibles

**🎲 Shuffle Puzzles**
- Mezcla aleatoriamente el contenido de los puzzles
- Mantiene las fechas originales
- Copia el resultado al clipboard
- Solo funciona en desarrollo

**🔍 Check Duplicates**
- Verifica respuestas duplicadas en puzzles.json
- Muestra conflictos en consola
- Previene respuestas ambiguas

**📤 Export Puzzles**
- Exporta backup de puzzles desde localStorage
- Formato: `puzzles_YYYY-MM-DD.json`
- Descarga automática

**🗑️ Reset Game Data**
- Elimina TODOS los datos del juego
- Incluye progreso y estadísticas
- Recarga automática de página
- ⚠️ Acción irreversible

**🔄 Reset Today's Game**
- Resetea solo el progreso del día actual
- Mantiene estadísticas históricas
- Permite rejugar el puzzle del día
- Recarga automática

**📊 Reset Stats Only**
- Elimina solo las estadísticas
- Preserva el progreso del día actual
- No requiere recarga

#### Uso Programático
```javascript
// Todas las funciones están disponibles via window.devTools
window.devTools.shufflePuzzles();
window.devTools.checkDuplicates();
window.devTools.exportPuzzles();
window.devTools.resetGameData();
window.devTools.resetTodaysGame();
window.devTools.resetStats();
```

### 📁 Gestión de Puzzles

#### Formato de Puzzle
```json
{
  "id": 1,
  "date": "2025-09-07",
  "emojis": ["🕶️", "🌃", "👽"],
  "answer": ["men in black", "hombres de negro"],
  "category": "película",
  "hint": "Agentes que protegen la Tierra de alienígenas"
}
```

#### Reglas de Contenido
- **ID único**: Secuencial y único
- **Fecha**: Formato YYYY-MM-DD
- **Emojis**: Array de 2-4 emojis relevantes
- **Respuestas**: Array con variaciones aceptadas (español/inglés)
- **Categorías**: película, serie, libro, personaje
- **Hint**: Pista sin spoilers directos

#### Agregar Nuevos Puzzles
1. Editar `src/data/puzzles.json`
2. Seguir el formato establecido
3. Verificar duplicados con dev tools
4. Probar localmente

### 🧪 Testing y QA

#### Flujo de Testing Recomendado
1. Activar dev tools con URL especial
2. Usar `Reset Today's Game` para probar múltiples intentos
3. Usar `Reset Stats Only` para probar estadísticas limpias
4. Usar `Reset Game Data` para simular usuario nuevo
5. Verificar duplicados antes de production

#### Estados de Usuario a Probar
- **Usuario Nuevo**: Sin datos en localStorage
- **Usuario Retornando**: Con estadísticas pero sin juego del día
- **Usuario Activo**: Con progreso parcial del día
- **Usuario Completado**: Puzzle del día terminado

### 🔒 Seguridad de Dev Tools

#### Medidas de Seguridad Implementadas
- **Autenticación por URL**: Requiere parámetros específicos
- **Clave secreta**: `puzzmoji2025` (cambiar en producción)
- **Solo desarrollo**: Se cargan solo con `import.meta.env.DEV`
- **Confirmaciones**: Dialogs de confirmación para acciones destructivas
- **Console logging**: Toda actividad es registrada

#### Consideraciones de Producción
- Dev tools NO se incluyen en builds de producción
- URLs con parámetros dev no funcionan en producción
- Clave debe cambiarse periódicamente
- Solo personal autorizado debe conocer la clave

### 📱 PWA y Deployment

#### Build para Producción
```bash
npm run build      # Genera build optimizado
npm run preview    # Previsualiza build localmente
```

#### Verificaciones Pre-Deploy
- [ ] ESLint sin errores: `npm run lint`
- [ ] Build exitoso: `npm run build`
- [ ] Preview funciona: `npm run preview`
- [ ] Dev tools no aparecen en preview
- [ ] Puzzles validados (sin duplicados)

## 🚀 Guía de Deployment

### Opción 1: Vercel (Recomendado)

**Deployment Manual:**
1. Instalar Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Configurar dominio personalizado en dashboard

**Deployment Automático (GitHub):**
1. Conectar repo en [vercel.com](https://vercel.com)
2. Importar proyecto desde GitHub
3. Configurar dominio personalizado: `playpuzzmoji.com`
4. Variables de entorno (si necesario):
   - `NODE_ENV=production`

**Configuración de Dominio:**
```bash
# Agregar dominio personalizado
vercel domains add playpuzzmoji.com
```

### Opción 2: Netlify

**Deployment Manual:**
1. Instalar Netlify CLI: `npm i -g netlify-cli`
2. Login: `netlify login`
3. Build: `npm run build`
4. Deploy: `netlify deploy --prod --dir dist`

**Deployment Automático (GitHub):**
1. Conectar repo en [netlify.com](https://netlify.com)
2. Configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`
3. Configurar dominio personalizado: `playpuzzmoji.com`

### Opción 3: GitHub Pages

1. Habilitar GitHub Actions en tu repo
2. Configurar secrets en repo settings:
   - `VERCEL_TOKEN` (para Vercel)
   - `ORG_ID` y `PROJECT_ID` (para Vercel)
3. Push a `main` triggers auto-deploy

### Configuración DNS

Para configurar `playpuzzmoji.com`:

**Vercel:**
- A record: `76.76.19.61`
- CNAME: `cname.vercel-dns.com`

**Netlify:**
- A record: `75.2.60.5`
- CNAME: `<site-name>.netlify.app`

### Variables de Entorno

Agregar en plataforma de hosting:
```bash
NODE_ENV=production
VITE_APP_URL=https://playpuzzmoji.com
```

### Post-Deploy Checklist

- [ ] Sitio accesible en `playpuzzmoji.com`
- [ ] HTTPS funcionando correctamente
- [ ] PWA instala correctamente
- [ ] Service Worker carga assets offline
- [ ] Meta tags de SEO correctos
- [ ] Sitemap accesible: `/sitemap.xml`
- [ ] Robots.txt accesible: `/robots.txt`
- [ ] Dev tools NO aparecen en producción
- [ ] Performance score >90 en Lighthouse
- [ ] Todos los puzzles cargan correctamente

### 🤝 Contribución

#### Workflow de Desarrollo
1. Crear rama feature desde main
2. Desarrollar y probar con dev tools
3. Validar puzzles si hay cambios de contenido
4. Lint y build sin errores
5. PR con descripción detallada

#### Código de Conducta
- Nunca committear claves de dev tools
- Probar exhaustivamente antes de PR
- Documentar cambios significativos
- Mantener código limpio y comentado

---

## 📞 Contacto de Desarrollo

Para acceso a dev tools o dudas técnicas, contactar al equipo de desarrollo con la clave de acceso correspondiente.
