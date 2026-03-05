import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="about" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop" 
                alt="Showroom" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-accent text-white p-8 rounded-2xl shadow-xl hidden lg:block">
               <span className="block text-4xl font-bold mb-1">15+</span>
               <span className="text-sm font-medium uppercase tracking-wider">Years of Excellence</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
              {t('nav.about')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
              {t('about.title')}
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('about.text1')}
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('about.text2')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Certified Dealership",
                "Expert Technicians",
                "Worldwide Shipping",
                "Luxury Experience"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="font-semibold text-primary">{item}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/about-more')}
              className="btn-primary mt-12"
            >
               Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
