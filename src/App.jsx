import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";

/* --------------------------------------- */
/* INDUSTRY STANDARD: Directional Micro-Slide + Crossfade */
/* Used in: SaaS dashboards, product websites, corporate portfolios */
/* Duration: 0.3s | No flash, no overlay, HR-friendly */
/* --------------------------------------- */

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 8  // Slide up from 8px below
  },
  animate: { 
    opacity: 1, 
    y: 0  // Settle at normal position
  },
  exit: { 
    opacity: 0, 
    y: -8  // Slide up 8px while fading out
  }
};

const pageTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]  // cubic-bezier for smooth professional feel
};

/* --------------------------------------- */

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setPage={handlePageChange} />;
      case "projects":
        return <Projects setPage={handlePageChange} />;
      case "resume":
        return <Resume setPage={handlePageChange} />;
      default:
        return <Home setPage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0f]">
      <Navbar currentPage={currentPage} setPage={handlePageChange} />

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
