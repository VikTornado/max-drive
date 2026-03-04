import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Info } from 'lucide-react';
import axios from 'axios';
import API_URL from '../api/config';

const Inventory = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cars/`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return (
      <section id="cars" className="py-24 bg-silver-light min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="cars" className="py-24 bg-silver-light">
      <div className="section-container text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-primary mb-4"
        >
          {t('inventory.title')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 max-w-2xl mx-auto"
        >
          {t('inventory.subtitle')}
        </motion.p>
      </div>

      <div className="section-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cars.map((car, idx) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer"
            onClick={() => navigate(`/car/${car.id}`)}
          >
            {/* Car Image Wrapper */}
            <div className="relative overflow-hidden aspect-[16/10]">
              <img 
                src={car.main_image} 
                alt={car.name} 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop';
                }}
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary font-bold px-4 py-1.5 rounded-full shadow-md">
                €{parseFloat(car.price).toLocaleString()}
              </div>
            </div>

            {/* Car Details Content */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-primary">{car.name}</h3>
                <div className="flex items-center gap-1 text-slate-400 font-bold">
                  <Calendar size={16} />
                  <span>{car.year}</span>
                </div>
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed flex-grow italic line-clamp-2">
                {i18n.language === 'de' ? car.description_de : car.description_en}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/car/${car.id}`);
                  }}
                  className="flex items-center gap-2 text-accent font-bold hover:underline"
                >
                  <Info size={18} />
                  {t('inventory.view_details')}
                </button>
                <div className="w-10 h-10 rounded-full bg-silver-light flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                   <ExternalLink size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Inventory;
