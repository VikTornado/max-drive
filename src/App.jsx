import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Inventory from './sections/Inventory';
import Features from './sections/Features';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CarDetails from './pages/CarDetails';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Inventory />
      <Features />
      <Contact />
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
