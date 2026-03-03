import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter">MAX DRIVE</span>
            </div>
            <p className="text-white/40 leading-relaxed font-medium">
              Revolutionizing the car-buying experience since 2010. Your trusted partner for luxury and performance vehicles in Frankfurt and beyond.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              {['about', 'cars', 'features', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="hover:text-accent transition-colors capitalize">
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xl font-bold mb-8">Opening Hours</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-white">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white">10:00 - 15:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white">Closed</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact info */}
          <div>
             <h4 className="text-xl font-bold mb-8">Contact Info</h4>
             <ul className="space-y-4 text-white/60 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-accent shrink-0 mt-1" />
                   <span>Max-Drive-Allee 1, 60311 Frankfurt, Germany</span>
                </li>
                <li className="flex items-center gap-3">
                   <Phone size={20} className="text-accent shrink-0" />
                   <span>+49 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                   <Mail size={20} className="text-accent shrink-0" />
                   <span>info@max-drive.com</span>
                </li>
             </ul>
          </div>
        </div>

        <div className="pt-12 text-center text-white/30 font-medium text-sm flex flex-col md:flex-row justify-between items-center gap-4">
           <p>© {year} MAX DRIVE. {t('footer.rights')}</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
