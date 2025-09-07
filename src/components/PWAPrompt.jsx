import { useState } from 'react';
import '../styles/PWAPrompt.css';

const PWAPrompt = ({ 
  isInstallable, 
  updateAvailable, 
  onInstall, 
  onUpdate, 
  onDismiss 
}) => {
  const [showInstall, setShowInstall] = useState(true);
  const [showUpdate, setShowUpdate] = useState(true);

  if (!isInstallable && !updateAvailable) return null;

  const handleInstall = async () => {
    const success = await onInstall();
    if (success) {
      setShowInstall(false);
    }
  };

  const handleUpdate = () => {
    onUpdate();
    setShowUpdate(false);
  };

  const handleDismissInstall = () => {
    setShowInstall(false);
    onDismiss?.();
  };

  const handleDismissUpdate = () => {
    setShowUpdate(false);
  };

  return (
    <>
      {/* Prompt de instalación */}
      {isInstallable && showInstall && (
        <div className="pwa-prompt install-prompt">
          <div className="pwa-prompt-content">
            <div className="pwa-prompt-icon">📱</div>
            <div className="pwa-prompt-text">
              <h3>¡Instala PuzzMoji!</h3>
              <p>Accede más rápido y juega sin conexión</p>
            </div>
            <div className="pwa-prompt-actions">
              <button 
                className="pwa-btn-install"
                onClick={handleInstall}
              >
                Instalar
              </button>
              <button 
                className="pwa-btn-dismiss"
                onClick={handleDismissInstall}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompt de actualización */}
      {updateAvailable && showUpdate && (
        <div className="pwa-prompt update-prompt">
          <div className="pwa-prompt-content">
            <div className="pwa-prompt-icon">🔄</div>
            <div className="pwa-prompt-text">
              <h3>Nueva versión disponible</h3>
              <p>Actualiza para obtener las últimas mejoras</p>
            </div>
            <div className="pwa-prompt-actions">
              <button 
                className="pwa-btn-update"
                onClick={handleUpdate}
              >
                Actualizar
              </button>
              <button 
                className="pwa-btn-dismiss"
                onClick={handleDismissUpdate}
              >
                Después
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAPrompt;