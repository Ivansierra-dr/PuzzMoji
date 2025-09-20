import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Converted pages
import TriviaBlog from './pages/TriviaBlog';
import BlogNews from './pages/BlogNews';
import FAQPage from './pages/FAQPage';
import LegalNotice from './pages/LegalNotice';
import LegalMenuPage from './pages/LegalMenuPage';

import './App.css';

// Dev tools solo en desarrollo
if (import.meta.env.DEV) {
  import('./utils/devTools.js').then(() => {
    console.log('✅ Dev tools loaded');
  });
}

function App() {
  useEffect(() => {
    // Check if user has played before for initial redirect
    const hasPlayed = localStorage.getItem('puzzmoji_gameState') ||
                     localStorage.getItem('puzzmoji_stats');

    // If this is their first visit and they're on /game, redirect to landing
    if (!hasPlayed && window.location.pathname === '/game') {
      window.location.href = '/';
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Converted page routes */}
        <Route path="/trivia" element={<TriviaBlog />} />
        <Route path="/blog" element={<BlogNews />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/legal" element={<LegalMenuPage />} />

        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;