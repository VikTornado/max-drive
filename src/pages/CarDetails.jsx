import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, Calendar, Tag, Info } from 'lucide-react';
import axios from 'axios';
import API_URL from '../api/config';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cars/${id}/`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-primary mb-4">Car not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-accent font-bold hover:underline"
        >
          <ArrowLeft size={20} /> {t('inventory.back')}
        </button>
      </div>
    );
  }

  const allImages = [car.main_image, ...car.images.map(img => img.image)];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar isInternalPage={true} />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowLeft size={20} />
            </div>
            <span>{t('inventory.back')}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl p-6 md:p-10">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={allImages[currentImageIndex]}
                    alt={car.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                </AnimatePresence>

                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-accent w-6' : 'bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-24 aspect-[16/10] rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${currentImageIndex === idx ? 'border-accent' : 'border-transparent'}`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                   <Tag size={18} />
                   <span>Premium Collection</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">{car.name}</h1>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 text-slate-500 font-semibold">
                      <Calendar size={20} className="text-accent" />
                      <span>{car.year} Year</span>
                   </div>
                   <div className="text-3xl font-bold text-primary">
                      €{parseFloat(car.price).toLocaleString()}
                   </div>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                    <Info size={20} className="text-accent" />
                    Description
                  </h3>
                  <div 
                    className="text-slate-600 leading-relaxed text-lg italic ck-content"
                    dangerouslySetInnerHTML={{ __html: i18n.language === 'de' ? car.description_de : car.description_en }}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                    <Info size={20} className="text-accent" />
                    Specifications
                  </h3>
                  <div 
                    className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-slate-700 leading-relaxed ck-content"
                    dangerouslySetInnerHTML={{ __html: i18n.language === 'de' ? car.specs_de : car.specs_en }}
                  />
                </div>
              </div>

              <div className="mt-10">
                <button 
                  onClick={() => navigate('/#contact')}
                  className="w-full bg-primary text-white font-bold py-5 rounded-2xl hover:bg-accent transition-colors duration-300 shadow-lg shadow-primary/10 hover:shadow-accent/20"
                >
                  Request Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetails;
