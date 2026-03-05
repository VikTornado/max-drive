import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import axios from 'axios';
import API_URL from '../api/config';

const AboutMore = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/about/`);
        if (response.data && response.data.length > 0) {
          setContent(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutContent();
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-silver-light flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const title = content 
    ? (i18n.language === 'de' ? content.title_de : content.title_en)
    : t('nav.about');
    
  const mainContent = content 
    ? (i18n.language === 'de' ? content.content_de : content.content_en)
    : "<p>Information about our dealership is being updated. Please check back soon.</p>";

  return (
    <div className="min-h-screen bg-silver-light">
      <main className="pb-24 pt-16">
        <div className="section-container max-w-4xl">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary font-bold mb-10 hover:text-accent transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            {t('common.back', 'Back')}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100"
          >
            {/* Header */}
            <div className="bg-primary p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
                    <div className="flex items-center gap-6 text-white/60 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>Updated: {content ? new Date(content.updated_at).toLocaleDateString() : 'Recent'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Info size={16} />
                            <span>Detailed Information</span>
                        </div>
                    </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Content Body */}
            <div className="p-12 md:p-16">
              <div 
                className="prose prose-lg max-w-none text-slate-700 leading-relaxed ck-content"
                dangerouslySetInnerHTML={{ __html: mainContent }}
              />
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  );
};

export default AboutMore;
