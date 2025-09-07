import { useEffect, useState } from 'react';

export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Registrar service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registrado:', registration);

          // Escuchar actualizaciones
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          });
        } catch (error) {
          console.error('Error registrando Service Worker:', error);
        }
      });
    }

    // Detectar si se puede instalar (evento beforeinstallprompt)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    // Detectar si ya está instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Detectar si está ejecutándose como PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
    
    if (isStandalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return false;

    try {
      const result = await installPrompt.prompt();
      const { outcome } = await result.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstallable(false);
        setInstallPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error instalando PWA:', error);
      return false;
    }
  };

  const updateApp = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  };

  return {
    isInstallable,
    isInstalled,
    updateAvailable,
    installApp,
    updateApp
  };
};