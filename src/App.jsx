import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";

/* animation unchanged */
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

const pageTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]
};

function App() {

  // read page from URL
  const getPageFromURL = () => {
    const path = window.location.pathname.replace("/", "");
    if (path === "projects") return "projects";
    if (path === "resume") return "resume";
    return "home";
  };

  const [currentPage, setCurrentPage] = useState(getPageFromURL);

  // update URL when page changes
  useEffect(() => {

    const path =
      currentPage === "home"
        ? "/"
        : `/${currentPage}`;

    window.history.replaceState({}, "", path);

  }, [currentPage]);

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

      <Navbar
        currentPage={currentPage}
        setPage={handlePageChange}
      />

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