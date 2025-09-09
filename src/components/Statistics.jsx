import { useState, useEffect } from 'react';
import '../styles/Statistics.css';

const Statistics = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winPercentage: 0,
    averageAttempts: 0
  });

  useEffect(() => {
    if (isOpen) {
      loadStats();
    }
  }, [isOpen]);

  const loadStats = () => {
    const savedStats = JSON.parse(localStorage.getItem('puzzmoji_stats') || '{}');
    const winPercentage = savedStats.gamesPlayed > 0 
      ? Math.round((savedStats.gamesWon / savedStats.gamesPlayed) * 100) 
      : 0;
    
    // Calcular media de intentos
    const averageAttempts = savedStats.gamesWithAttempts > 0
      ? (savedStats.totalAttempts / savedStats.gamesWithAttempts).toFixed(1)
      : '-';
    
    setStats({
      ...savedStats,
      gamesPlayed: savedStats.gamesPlayed || 0,
      gamesWon: savedStats.gamesWon || 0,
      currentStreak: savedStats.currentStreak || 0,
      maxStreak: savedStats.maxStreak || 0,
      winPercentage,
      averageAttempts
    });
  };


  if (!isOpen) return null;

  return (
    <div className="statistics-overlay" onClick={onClose}>
      <div className="statistics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📊 Estadísticas</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.gamesPlayed}</div>
            <div className="stat-label">Partidas</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{stats.winPercentage}%</div>
            <div className="stat-label">Victorias</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-label">Racha actual</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{stats.maxStreak}</div>
            <div className="stat-label">Mejor racha</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{stats.averageAttempts}</div>
            <div className="stat-label">Media intentos</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{stats.gamesWon}</div>
            <div className="stat-label">Ganadas</div>
          </div>
        </div>
        
        <div className="achievement-section">
          <h3>🏆 Logros</h3>
          <div className="achievements">
            {stats.gamesPlayed >= 1 && (
              <div className="achievement">🎮 Primera partida</div>
            )}
            {stats.gamesWon >= 1 && (
              <div className="achievement">✨ Primera victoria</div>
            )}
            {stats.currentStreak >= 3 && (
              <div className="achievement">🔥 Racha de 3 días</div>
            )}
            {stats.currentStreak >= 7 && (
              <div className="achievement">💫 Semana perfecta</div>
            )}
            {stats.maxStreak >= 10 && (
              <div className="achievement">👑 Maestro PuzzMoji</div>
            )}
            {stats.averageAttempts !== '-' && stats.averageAttempts <= 3.0 && stats.gamesWithAttempts >= 5 && (
              <div className="achievement">🎯 Acierto rápido</div>
            )}
            {stats.gamesWithAttempts >= 10 && (
              <div className="achievement">📈 Estadístico</div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Statistics;