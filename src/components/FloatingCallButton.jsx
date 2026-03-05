import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingCallButton = () => {
  const phoneNumber = "+49123456789";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-[60]"
    >
      <motion.a
        href={`tel:${phoneNumber}`}
        animate={{
          rotate: [0, -10, 10, -10, 10, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full shadow-2xl hover:bg-accent-light transition-colors group relative"
        title="Call Us Now"
      >
        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"></span>
        <Phone size={28} className="relative z-10" />
        
        {/* Tooltip on hover for desktop */}
        <span className="absolute right-full mr-4 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          {phoneNumber}
        </span>
      </motion.a>
    </motion.div>
  );
};

export default FloatingCallButton;
