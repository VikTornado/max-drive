import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="cars"
                smooth={true}
                duration={500}
                offset={-70}
                className="btn-primary flex items-center justify-center gap-2 cursor-pointer"
              >
                {t('hero.cta')}
                <ChevronRight size={20} />
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="btn-outline !text-white !border-white/30 hover:!bg-white/10 flex items-center justify-center cursor-pointer"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex items-center gap-12"
          >
            <div className="text-white">
              <span className="block text-3xl font-bold">500+</span>
              <span className="text-white/60 text-sm">Cars Sold</span>
            </div>
            <div className="text-white">
              <span className="block text-3xl font-bold">15+</span>
              <span className="text-white/60 text-sm">Years Exp.</span>
            </div>
            <div className="text-white">
              <span className="block text-3xl font-bold">4.9/5</span>
              <span className="text-white/60 text-sm">Customer Rating</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/30 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
