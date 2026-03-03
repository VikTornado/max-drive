import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Inventory from './sections/Inventory';
import Features from './sections/Features';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Inventory />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
