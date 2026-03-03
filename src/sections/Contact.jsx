import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    try {
      // Use Formspree or similar service. Update the ID with your own.
      const response = await fetch('https://formspree.io/f/mqakovge', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-12 max-w-md font-medium">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-silver-light rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</h4>
                  <p className="text-xl font-bold text-primary">+49 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-silver-light rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</h4>
                  <p className="text-xl font-bold text-primary">info@max-drive.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-silver-light rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Our Location</h4>
                  <p className="text-xl font-bold text-primary">Max-Drive-Allee 1, 60311 Frankfurt, Germany</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t('contact.name')}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-slate-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t('contact.email')}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-slate-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t('contact.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-slate-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none"
                  placeholder="+49 123 456 789"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t('contact.message')}</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full bg-slate-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg"
              >
                {t('contact.send')}
                <Send size={20} />
              </button>

              {status === 'SUCCESS' && (
                <p className="text-green-600 font-bold text-center animate-fade-in">{t('contact.success')}</p>
              )}
              {status === 'ERROR' && (
                <p className="text-red-600 font-bold text-center animate-fade-in">{t('contact.error')}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
