import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, ShieldAlert, HeartHandshake } from 'lucide-react';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('features.quality'),
      desc: t('features.quality_desc'),
      icon: <ShieldCheck size={40} className="text-accent" />,
    },
    {
      title: t('features.financing'),
      desc: t('features.financing_desc'),
      icon: <CreditCard size={40} className="text-accent" />,
    },
    {
      title: t('features.warranty'),
      desc: t('features.warranty_desc'),
      icon: <ShieldAlert size={40} className="text-accent" />,
    },
    {
      title: t('features.support'),
      desc: t('features.support_desc'),
      icon: <HeartHandshake size={40} className="text-accent" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-primary text-white overflow-hidden">
      <div className="section-container relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="text-center mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            {t('features.title')}
          </motion.h2>
          <div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 block w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
