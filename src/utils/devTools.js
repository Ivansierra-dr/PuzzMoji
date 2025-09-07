// Herramientas de desarrollo - Solo para uso interno
// Acceso: URL con ?dev=true&key=puzzmoji2025

class DevTools {
  constructor() {
    this.isDevMode = false;
    this.init();
  }

  init() {
    // Verificar parámetros URL
    const urlParams = new URLSearchParams(window.location.search);
    const devMode = urlParams.get('dev');
    const devKey = urlParams.get('key');
    
    console.log('🔍 Checking dev mode:', { devMode, devKey });
    
    // Clave secreta para activar modo dev (desde variable de entorno)
    const requiredDevKey = import.meta.env.VITE_DEV_KEY || 'dev_disabled';
    if (devMode === 'true' && devKey === requiredDevKey) {
      this.isDevMode = true;
      console.log('🛠️ DEV MODE CONDITIONS MET');
      this.enableDevMode();
    } else {
      console.log('❌ Dev mode not activated. Need: ?dev=true&key=[SECRET_KEY]');
    }
  }

  enableDevMode() {
    console.log('🛠️ DEV MODE ACTIVATED');
    
    // Agregar botón dev al DOM
    this.addDevButton();
    
    // Exponer funciones dev al window
    window.devTools = {
      shufflePuzzles: this.shufflePuzzles.bind(this),
      exportPuzzles: this.exportPuzzles.bind(this),
      checkDuplicates: this.checkDuplicates.bind(this),
      addPuzzle: this.addPuzzle.bind(this),
      resetGameData: this.resetGameData.bind(this),
      resetTodaysGame: this.resetTodaysGame.bind(this),
      resetStats: this.resetStats.bind(this)
    };
  }

  addDevButton() {
    // Esperar a que el DOM esté listo
    const addPanel = () => {
      // Remover panel existente si existe
      const existingPanel = document.getElementById('dev-panel');
      if (existingPanel) {
        existingPanel.remove();
      }

      const devPanel = document.createElement('div');
      devPanel.id = 'dev-panel';
      devPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(255, 0, 0, 0.95);
        color: white;
        padding: 12px;
        border-radius: 10px;
        font-family: monospace;
        font-size: 12px;
        z-index: 99999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        min-width: 200px;
        border: 2px solid #ff6b6b;
      `;

      devPanel.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 10px; text-align: center;">🛠️ DEV TOOLS</div>
        <button onclick="window.devTools.shufflePuzzles()" style="display: block; width: 100%; margin: 3px 0; padding: 6px; font-size: 11px; cursor: pointer; border: none; border-radius: 4px; background: #ff4757; color: white;">
          🎲 Shuffle Puzzles
        </button>
        <button onclick="window.devTools.checkDuplicates()" style="display: block; width: 100%; margin: 3px 0; padding: 6px; font-size: 11px; cursor: pointer; border: none; border-radius: 4px; background: #3742fa; color: white;">
          🔍 Check Duplicates
        </button>
        <button onclick="window.devTools.exportPuzzles()" style="display: block; width: 100%; margin: 3px 0; padding: 6px; font-size: 11px; cursor: pointer; border: none; border-radius: 4px; background: #2ed573; color: white;">
          📤 Export Puzzles
        </button>
        <button onclick="window.devTools.resetGameData()" style="display: block; width: 100%; margin: 3px 0; padding: 6px; font-size: 11px; cursor: pointer; border: none; border-radius: 4px; background: #ff6348; color: white;">
          🗑️ Reset Game Data
        </button>
        <button onclick="window.devTools.resetTodaysGame()" style="display: block; width: 100%; margin: 3px 0; padding: 6px; font-size: 11px; cursor: pointer; border: none; border-radius: 4px; background: #ffa726; color: white;">
          🔄 Reset Today's Game
        </button>
        <button onclick="window.devTools.resetStats()" style="display: block; width: 100%; margin: 3px 0; padding: 6px; font-size: 11px; cursor: pointer; border: none; border-radius: 4px; background: #ab47bc; color: white;">
          📊 Reset Stats Only
        </button>
        <div style="font-size: 10px; text-align: center; margin-top: 8px; opacity: 0.8;">Dev Mode Active</div>
      `;

      document.body.appendChild(devPanel);
      console.log('📍 Dev panel added to DOM');
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addPanel);
    } else {
      addPanel();
    }
  }

  async shufflePuzzles() {
    try {
      // Esta función solo funciona en desarrollo, no en producción
      if (import.meta.env.PROD) {
        console.warn('Shuffle only available in development');
        return;
      }

      const response = await fetch('/src/data/puzzles.json');
      const puzzles = await response.json();
      
      // Extraer contenido sin fechas
      const contents = puzzles.map(p => ({
        emojis: p.emojis,
        answer: p.answer,
        category: p.category,
        hint: p.hint
      }));

      // Shuffle Fisher-Yates
      for (let i = contents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [contents[i], contents[j]] = [contents[j], contents[i]];
      }

      // Recombinar con fechas originales
      const shuffled = puzzles.map((original, index) => ({
        id: original.id,
        date: original.date,
        ...contents[index]
      }));

      console.log('🎲 Puzzles shuffled!');
      console.log('📋 Copy this to puzzles.json:');
      console.log(JSON.stringify(shuffled, null, 2));
      
      // Copiar al clipboard
      navigator.clipboard.writeText(JSON.stringify(shuffled, null, 2));
      alert('✅ Shuffled puzzles copied to clipboard!');
      
    } catch (error) {
      console.error('❌ Error shuffling puzzles:', error);
    }
  }

  async checkDuplicates() {
    try {
      const response = await fetch('/src/data/puzzles.json');
      const puzzles = await response.json();
      
      const answers = new Map();
      const duplicates = [];

      puzzles.forEach((puzzle, index) => {
        puzzle.answer.forEach(answer => {
          const normalized = answer.toLowerCase().trim();
          if (answers.has(normalized)) {
            duplicates.push({
              answer: normalized,
              puzzles: [answers.get(normalized), index + 1]
            });
          } else {
            answers.set(normalized, index + 1);
          }
        });
      });

      if (duplicates.length === 0) {
        console.log('✅ No duplicates found!');
        alert('✅ No duplicates found!');
      } else {
        console.log('❌ Duplicates found:');
        duplicates.forEach(dup => {
          console.log(`"${dup.answer}" in puzzles: ${dup.puzzles.join(', ')}`);
        });
        alert(`❌ Found ${duplicates.length} duplicate answers. Check console.`);
      }
    } catch (error) {
      console.error('❌ Error checking duplicates:', error);
    }
  }

  exportPuzzles() {
    const puzzles = JSON.parse(localStorage.getItem('puzzles_backup') || '[]');
    const blob = new Blob([JSON.stringify(puzzles, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `puzzles_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  resetGameData() {
    if (confirm('⚠️ This will delete ALL game data (progress + stats). Continue?')) {
      localStorage.removeItem('puzzmoji_gameState');
      localStorage.removeItem('puzzmoji_stats');
      console.log('🗑️ All game data cleared');
      alert('✅ All game data reset!');
      window.location.reload();
    }
  }

  resetTodaysGame() {
    if (confirm('🔄 Reset only today\'s game progress? (keeps stats)')) {
      localStorage.removeItem('puzzmoji_gameState');
      console.log('🔄 Today\'s game progress cleared');
      alert('✅ Today\'s game reset! You can play again.');
      window.location.reload();
    }
  }

  resetStats() {
    if (confirm('📊 Reset only statistics? (keeps today\'s progress)')) {
      localStorage.removeItem('puzzmoji_stats');
      console.log('📊 Statistics cleared');
      alert('✅ Statistics reset!');
      // No reload needed, stats will show as 0
    }
  }

  addPuzzle(emojis, answers, category, hint) {
    console.log('🎯 New puzzle added:', { emojis, answers, category, hint });
    // Esta sería para agregar puzzles dinámicamente
  }
}

// Inicializar automáticamente
const devTools = new DevTools();

export default devTools;