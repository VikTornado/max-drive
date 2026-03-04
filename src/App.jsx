import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Inventory from './sections/Inventory';
import Features from './sections/Features';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CarDetails from './pages/CarDetails';

import { scroller } from 'react-scroll';

function HomePage() {
  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const target = hash.replace('#', '');
      scroller.scrollTo(target, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -70
      });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <div id="cars">
        <Inventory />
      </div>
      <Features />
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <HomePage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
