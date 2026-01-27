import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

const App = () => {
  const [page, setPage] = useState('home');

  // Prevent hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      window.history.replaceState(null, '', window.location.pathname);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean URL on mount
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderPage = () => {
    switch(page) {
      case 'home': return <Home setPage={setPage} />;
      case 'projects': return <Projects />;
      case 'resume': return <Resume setPage={setPage} />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden antialiased relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Navbar page={page} setPage={setPage} />
        
        <main className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <React.Fragment key={page}>
              {renderPage()}
            </React.Fragment>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
