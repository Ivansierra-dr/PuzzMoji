import { useState, useEffect, useCallback } from 'react';
import puzzlesData from '../data/puzzles.json';
import dateService from '../utils/dateService';
import TwemojiText from './TwemojiText';
import '../styles/EmojiPuzzle.css';

// Hook personalizado para detectar el tamaño de pantalla
const useResponsiveEmojiSize = () => {
  const [emojiSize, setEmojiSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 480) return 40; // Móviles pequeños
      if (width <= 768) return 50; // Móviles grandes/tablets
      return 65; // Desktop
    }
    return 65;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setEmojiSize(40);
      } else if (width <= 768) {
        setEmojiSize(50);
      } else {
        setEmojiSize(65);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return emojiSize;
};

const EmojiPuzzle = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showHint, setShowHint] = useState(false);
  const [isLoadingDate, setIsLoadingDate] = useState(true);
  const [dateError, setDateError] = useState(false);
  const [visibleEmojis, setVisibleEmojis] = useState(1);
  const emojiSize = useResponsiveEmojiSize();


  const initializeGame = useCallback(async () => {
    try {
      setIsLoadingDate(true);

      // Verificar si hay un puzzle override del modo dev
      const devOverride = localStorage.getItem('dev_override_puzzle');
      let puzzle;

      if (devOverride) {
        puzzle = JSON.parse(devOverride);
        console.log('🛠️ Using dev override puzzle:', puzzle);
      } else {
        // Primero cargar el puzzle del día
        const today = await dateService.getRealDate();
        console.log('Real date from server:', today);

        // Buscar puzzle para la fecha actual
        puzzle = puzzlesData.find(p => p.date === today);

        // Si no hay puzzle para hoy, calcular basado en días transcurridos
        if (!puzzle && puzzlesData.length > 0) {
          const baseDate = puzzlesData[0].date;
          const daysSince = await dateService.getDaysSinceDate(baseDate);
          const puzzleIndex = daysSince % puzzlesData.length;
          puzzle = puzzlesData[puzzleIndex];
          console.log(`No exact date match, using puzzle index ${puzzleIndex} (${daysSince} days since ${baseDate})`);
        }

        // Fallback al primer puzzle
        if (!puzzle) {
          puzzle = puzzlesData[0];
        }
      }
      
      setCurrentPuzzle(puzzle);
      
      // Luego cargar el estado del juego con el puzzle ya disponible
      const savedState = localStorage.getItem('puzzmoji_gameState');
      if (savedState) {
        const state = JSON.parse(savedState);
        const dateToCheck = devOverride ? puzzle.date : (await dateService.getRealDate());
        if (state.date === dateToCheck) {
          setAttempts(state.attempts || []);
          setGameStatus(state.status || 'playing');
          
          // Si el juego terminó (ganado o perdido), mostrar todos los emojis
          if (state.status === 'won' || state.status === 'lost') {
            setVisibleEmojis(puzzle.emojis.length);
          } else {
            // Si está en progreso, usar el estado guardado o calcular basado en intentos fallidos
            if (state.visibleEmojis !== undefined) {
              setVisibleEmojis(state.visibleEmojis);
            } else {
              const normalizedPuzzleAnswers = puzzle.answer.map(answer => normalizeText(answer));
              const failedAttempts = (state.attempts || []).filter(attempt => {
                const normalizedAttempt = normalizeText(attempt);
                return !normalizedPuzzleAnswers.includes(normalizedAttempt);
              }).length;
              setVisibleEmojis(Math.min(1 + failedAttempts, puzzle.emojis.length));
            }
          }
        }
      }
      
      setDateError(false);
    } catch (error) {
      console.error('Error initializing game:', error);
      setDateError(true);
      // Fallback al primer puzzle si hay error
      setCurrentPuzzle(puzzlesData[0]);
    } finally {
      setIsLoadingDate(false);
    }
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const normalizeText = (text) => {
    return text
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Elimina tildes y diacríticos
  };

  const saveGameState = async (newAttempts, status, newVisibleEmojis) => {
    const today = await dateService.getRealDate();
    const state = {
      date: today,
      attempts: newAttempts,
      status: status,
      visibleEmojis: newVisibleEmojis || visibleEmojis
    };
    localStorage.setItem('puzzmoji_gameState', JSON.stringify(state));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || gameStatus !== 'playing') return;

    const normalizedInput = normalizeText(userInput);
    const newAttempts = [...attempts, userInput];
    setAttempts(newAttempts);

    // Normalizar también las respuestas del puzzle para comparar
    const normalizedAnswers = currentPuzzle.answer.map(answer => normalizeText(answer));

    if (normalizedAnswers.includes(normalizedInput)) {
      // Revelar todos los emojis al ganar
      const allEmojis = currentPuzzle.emojis.length;
      setVisibleEmojis(allEmojis);
      setGameStatus('won');
      await saveGameState(newAttempts, 'won', allEmojis);
      await updateStats(true, newAttempts.length);
    } else {
      // Revelar siguiente emoji si es un fallo y aún hay emojis ocultos
      const failedAttempts = newAttempts.filter(attempt => {
        const normalizedAttempt = normalizeText(attempt);
        return !normalizedAnswers.includes(normalizedAttempt);
      }).length;
      
      // Revelar un emoji más por cada fallo, hasta un máximo de 3
      const newVisibleEmojis = Math.min(1 + failedAttempts, currentPuzzle.emojis.length);
      setVisibleEmojis(newVisibleEmojis);
      
      if (newAttempts.length >= 4) {
        setGameStatus('lost');
        // Al perder, también mostrar todos los emojis
        const allEmojis = currentPuzzle.emojis.length;
        setVisibleEmojis(allEmojis);
        await saveGameState(newAttempts, 'lost', allEmojis);
        await updateStats(false, 4);
      } else {
        await saveGameState(newAttempts, 'playing', newVisibleEmojis);
      }
    }
    
    setUserInput('');
  };

  const updateStats = async (won, attemptsCount) => {
    const stats = JSON.parse(localStorage.getItem('puzzmoji_stats') || '{}');
    const today = await dateService.getRealDate();
    
    if (!stats.gamesPlayed) stats.gamesPlayed = 0;
    if (!stats.gamesWon) stats.gamesWon = 0;
    if (!stats.currentStreak) stats.currentStreak = 0;
    if (!stats.maxStreak) stats.maxStreak = 0;
    if (!stats.lastPlayed) stats.lastPlayed = null;
    if (!stats.attemptsHistory) stats.attemptsHistory = [];
    if (!stats.totalAttempts) stats.totalAttempts = 0;
    if (!stats.gamesWithAttempts) stats.gamesWithAttempts = 0;
    
    stats.gamesPlayed++;
    
    // Registrar intentos para el cálculo de la media
    if (attemptsCount) {
      stats.attemptsHistory.push(attemptsCount);
      stats.totalAttempts += attemptsCount;
      stats.gamesWithAttempts++;
    }
    
    if (won) {
      stats.gamesWon++;
      // Calcular ayer usando la fecha real del servidor
      const todayDate = new Date(today);
      const yesterday = new Date(todayDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (stats.lastPlayed === yesterdayStr) {
        stats.currentStreak++;
      } else {
        stats.currentStreak = 1;
      }
      
      if (stats.currentStreak > stats.maxStreak) {
        stats.maxStreak = stats.currentStreak;
      }
    } else {
      stats.currentStreak = 0;
    }
    
    stats.lastPlayed = today;
    localStorage.setItem('puzzmoji_stats', JSON.stringify(stats));
  };

  const shareResult = () => {
    const squares = attempts.map((_, index) => {
      const normalizedAttempt = attempts[index].trim().toLowerCase();
      return currentPuzzle.answer.includes(normalizedAttempt) ? '🟩' : '🟥';
    }).join('');

    const resultIcon = attempts.length === 4 && gameStatus === 'lost' ? '❌' : `✅ ${attempts.length}/4`;
    const encouragement = attempts.length === 4 && gameStatus === 'lost'
      ? '¡Era complicado! 🤔 ¿Te animas con el de mañana?'
      : `¡Lo conseguí en ${attempts.length} intento${attempts.length > 1 ? 's' : ''}! 🎉`;

    const text = `${encouragement}\n\nPuzzMoji ${currentPuzzle.date}\n${squares} ${resultIcon}\n\n¿Puedes adivinar qué película o serie es? 🎭\nJuega GRATIS en: playpuzzmoji.com`;

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('¡Resultado copiado al portapapeles!');
    }
  };

  const getHint = () => {
    // Mostrar anuncio antes de revelar la pista
    const showAd = window.confirm(
      '¿Quieres ver un anuncio para acceder a la pista? Esto nos ayuda a mantener el juego gratuito.'
    );
    
    if (showAd) {
      // Simular carga de anuncio y luego mostrar pista
      setTimeout(() => {
        setShowHint(true);
        alert('¡Gracias! Aquí tienes tu pista.');
      }, 1500);
    }
  };

  if (isLoadingDate || !currentPuzzle) {
    return (
      <div className="emoji-puzzle">
        <div className="puzzle-container">
          <div className="loading-container">
            <div className="loading-emoji"><TwemojiText text="🎭" size={72} /></div>
            <p>Obteniendo puzzle del día...</p>
            {dateError && (
              <p className="error-text">
                <TwemojiText text="⚠️" size={16} /> Usando modo offline (fecha local)
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="emoji-puzzle">
      <div className="puzzle-container">
        <div className="emoji-display">
          {currentPuzzle.emojis.map((emoji, index) => (
            <TwemojiText 
              key={index} 
              text={index < visibleEmojis ? emoji : '❓'} 
              size={emojiSize} 
              className={`emoji ${index >= visibleEmojis ? 'emoji-hidden' : ''}`}
            />
          ))}
        </div>
        
        {visibleEmojis < currentPuzzle.emojis.length && gameStatus === 'playing' && (
          <div className="emoji-reveal-hint">
            {visibleEmojis === 1 ? `${currentPuzzle.emojis.length - visibleEmojis} emojis más se revelarán con cada intento fallido` : `Aún quedan ${currentPuzzle.emojis.length - visibleEmojis} emoji${currentPuzzle.emojis.length - visibleEmojis > 1 ? 's' : ''} por revelar`}
          </div>
        )}
        
        {showHint && (
          <div className="hint">
            <TwemojiText text="💡" size={20} /> {currentPuzzle.hint}
            <br />
            <TwemojiText text="📂" size={20} /> Categoría: {currentPuzzle.category}
          </div>
        )}
        
        {gameStatus === 'playing' && (
          <>
            <form onSubmit={handleSubmit} className="input-form">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="¿Qué película o serie es?"
                className="answer-input"
                maxLength={50}
                autoFocus
              />
              <button type="submit" className="submit-btn">
                Comprobar
              </button>
            </form>
            
            <div className="game-info">
              <span className="attempts-left">Intento: {attempts.length + 1}/4</span>
              {!showHint && (
                <button onClick={getHint} className="hint-btn">
                  <TwemojiText text="💡" size={16} /> Pista
                </button>
              )}
            </div>
          </>
        )}
        
        <div className="attempts-list">
          {attempts.map((attempt, index) => {
            const normalizedAttempt = normalizeText(attempt);
            const normalizedPuzzleAnswers = currentPuzzle.answer.map(answer => normalizeText(answer));
            const isCorrect = normalizedPuzzleAnswers.includes(normalizedAttempt);
            return (
              <div key={index} className={`attempt ${isCorrect ? 'correct' : 'incorrect'}`}>
                {attempt} <TwemojiText text={isCorrect ? '✅' : '❌'} size={20} />
              </div>
            );
          })}
        </div>
        
        {gameStatus !== 'playing' && (
          <div className="game-over">
            {gameStatus === 'won' ? (
              <div className="success">
                <h2>¡Correcto! <TwemojiText text="🎉" size={30} /></h2>
                <p>Lo lograste en {attempts.length} intento{attempts.length > 1 ? 's' : ''}</p>
              </div>
            ) : (
              <div className="failure">
                <h2>¡Se acabaron los intentos! <TwemojiText text="😔" size={30} /></h2>
                <p>La respuesta era: <strong>{currentPuzzle.answer[0]}</strong></p>
              </div>
            )}
            
            <button onClick={shareResult} className="share-btn">
              <TwemojiText text="📤" size={20} /> Compartir resultado
            </button>
            
            <div className="next-puzzle">
              <p>¡Vuelve mañana para un nuevo puzzle!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPuzzle;
