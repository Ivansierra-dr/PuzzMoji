import { useState, useEffect } from 'react';
import puzzlesData from '../data/puzzles.json';
import dateService from '../utils/dateService';
import '../styles/EmojiPuzzle.css';

const EmojiPuzzle = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showHint, setShowHint] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [isLoadingDate, setIsLoadingDate] = useState(true);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      setIsLoadingDate(true);
      await loadTodaysPuzzle();
      await loadGameState();
      setDateError(false);
    } catch (error) {
      console.error('Error initializing game:', error);
      setDateError(true);
      // Fallback al primer puzzle si hay error
      setCurrentPuzzle(puzzlesData[0]);
    } finally {
      setIsLoadingDate(false);
    }
  };

  const loadTodaysPuzzle = async () => {
    try {
      const today = await dateService.getRealDate();
      console.log('Real date from server:', today);
      
      // Buscar puzzle para la fecha actual
      let puzzle = puzzlesData.find(p => p.date === today);
      
      // Si no hay puzzle para hoy, calcular basado en días transcurridos
      if (!puzzle && puzzlesData.length > 0) {
        const baseDate = puzzlesData[0].date; // Primera fecha en el array
        const daysSince = await dateService.getDaysSinceDate(baseDate);
        const puzzleIndex = daysSince % puzzlesData.length; // Ciclar los puzzles
        puzzle = puzzlesData[puzzleIndex];
        console.log(`No exact date match, using puzzle index ${puzzleIndex} (${daysSince} days since ${baseDate})`);
      }
      
      // Fallback al primer puzzle
      if (!puzzle) {
        puzzle = puzzlesData[0];
      }
      
      setCurrentPuzzle(puzzle);
    } catch (error) {
      console.error('Error loading today\'s puzzle:', error);
      // Fallback al primer puzzle
      setCurrentPuzzle(puzzlesData[0]);
      throw error;
    }
  };

  const loadGameState = async () => {
    const savedState = localStorage.getItem('puzzmoji_gameState');
    if (savedState) {
      const state = JSON.parse(savedState);
      const today = await dateService.getRealDate();
      if (state.date === today) {
        setAttempts(state.attempts || []);
        setGameStatus(state.status || 'playing');
        setAttemptsLeft(6 - (state.attempts?.length || 0));
      }
    }
  };

  const saveGameState = async (newAttempts, status) => {
    const today = await dateService.getRealDate();
    const state = {
      date: today,
      attempts: newAttempts,
      status: status
    };
    localStorage.setItem('puzzmoji_gameState', JSON.stringify(state));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || gameStatus !== 'playing') return;

    const normalizedInput = userInput.trim().toLowerCase();
    const newAttempts = [...attempts, userInput];
    setAttempts(newAttempts);
    
    if (currentPuzzle.answer.includes(normalizedInput)) {
      setGameStatus('won');
      await saveGameState(newAttempts, 'won');
      await updateStats(true, newAttempts.length);
    } else if (newAttempts.length >= 6) {
      setGameStatus('lost');
      await saveGameState(newAttempts, 'lost');
      await updateStats(false, 6);
    } else {
      await saveGameState(newAttempts, 'playing');
    }
    
    setAttemptsLeft(6 - newAttempts.length);
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
    
    stats.gamesPlayed++;
    
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
    const emojis = currentPuzzle.emojis.join('');
    const squares = attempts.map((_, index) => {
      const normalizedAttempt = attempts[index].trim().toLowerCase();
      return currentPuzzle.answer.includes(normalizedAttempt) ? '🟩' : '🟥';
    }).join('');
    
    const text = `PuzzMoji ${currentPuzzle.date}\n${emojis}\n${squares}\n${attemptsLeft === 0 ? '❌' : `✅ ${attempts.length}/6`}\n\nJuega en: playpuzzmoji.com`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('¡Resultado copiado al portapapeles!');
    }
  };

  const getHint = () => {
    setShowHint(true);
  };

  if (isLoadingDate || !currentPuzzle) {
    return (
      <div className="emoji-puzzle">
        <div className="puzzle-container">
          <div className="loading-container">
            <div className="loading-emoji">🎭</div>
            <p>Obteniendo puzzle del día...</p>
            {dateError && (
              <p className="error-text">
                ⚠️ Usando modo offline (fecha local)
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
            <span key={index} className="emoji">{emoji}</span>
          ))}
        </div>
        
        {showHint && (
          <div className="hint">
            💡 {currentPuzzle.hint}
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
              <span className="attempts-left">Intentos: {attemptsLeft}/6</span>
              {!showHint && (
                <button onClick={getHint} className="hint-btn">
                  💡 Pista
                </button>
              )}
            </div>
          </>
        )}
        
        <div className="attempts-list">
          {attempts.map((attempt, index) => {
            const normalizedAttempt = attempt.trim().toLowerCase();
            const isCorrect = currentPuzzle.answer.includes(normalizedAttempt);
            return (
              <div key={index} className={`attempt ${isCorrect ? 'correct' : 'incorrect'}`}>
                {attempt} {isCorrect ? '✅' : '❌'}
              </div>
            );
          })}
        </div>
        
        {gameStatus !== 'playing' && (
          <div className="game-over">
            {gameStatus === 'won' ? (
              <div className="success">
                <h2>¡Correcto! 🎉</h2>
                <p>Lo lograste en {attempts.length} intento{attempts.length > 1 ? 's' : ''}</p>
              </div>
            ) : (
              <div className="failure">
                <h2>¡Se acabaron los intentos! 😔</h2>
                <p>La respuesta era: <strong>{currentPuzzle.answer[0]}</strong></p>
              </div>
            )}
            
            <button onClick={shareResult} className="share-btn">
              📤 Compartir resultado
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