import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe, LogIn, LogOut, User, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import API_URL from '../api/config';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Configure axios for credentials
axios.defaults.withCredentials = true;

const Navbar = ({ isInternalPage = false }) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  // Force scrolled state for internal pages
  const effectiveScrolled = isScrolled || isInternalPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // 1. Check URL parameters for explicit login/logout redirects from Django
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('loggedin') === 'true') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      // Remove query param from URL cleanly
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (searchParams.get('loggedout') === 'true') {
      localStorage.removeItem('isAdminLoggedIn');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. Set initial state from localStorage (Immediate fallback)
    const isStoredLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isStoredLoggedIn) {
      setIsLoggedIn(true);
      setUsername('Admin'); // Fallback username
    }

    // 3. Verify with backend (will only work if Cross-Site cookies aren't blocked)
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth-status/`);
        if (response.data.is_logged_in) {
          setIsLoggedIn(true);
          setUsername(response.data.username);
          localStorage.setItem('isAdminLoggedIn', 'true');
        } else if (isStoredLoggedIn) {
          // If the browser blocks cookies, auth-status returns false.
          // Don't overwrite the localStorage if we know they logged in via the redirect flag.
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('isAdminLoggedIn');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    
    checkAuth();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.about'), to: 'about' },
    { name: t('nav.cars'), to: 'cars' },
    { name: t('nav.features'), to: 'features' },
    { name: t('nav.contact'), to: 'contact' },
  ];

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleLogin = () => {
    window.location.href = `${API_URL}/admin/`;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
    window.location.href = `${API_URL}/api/logout/?next=${encodeURIComponent(window.location.origin + '/?loggedout=true')}`;
  };

  const handleAdminClick = () => {
    window.open(`${API_URL}/admin/`, '_blank');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 py-4',
        effectiveScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent'
      )}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className={cn("text-2xl font-bold tracking-tighter", effectiveScrolled ? "text-primary" : "text-white")}>
            MAX DRIVE
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            isInternalPage ? (
              <RouterLink
                key={link.to}
                to={`/#${link.to}`}
                className={cn(
                  "nav-link font-semibold",
                  effectiveScrolled ? "text-slate-600 hover:text-accent" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </RouterLink>
            ) : (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={cn(
                  "nav-link font-semibold",
                  effectiveScrolled ? "text-slate-600 hover:text-accent" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </ScrollLink>
            )
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:+49123456789" className={cn("flex items-center gap-2 font-bold", effectiveScrolled ? "text-primary" : "text-white")}>
            <Phone size={18} className="text-accent" />
            +49 123 456 789
          </a>
          <button
            onClick={toggleLanguage}
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded-full border transition-colors",
              effectiveScrolled ? "border-slate-200 text-slate-600 hover:bg-slate-50" : "border-white/20 text-white hover:bg-white/10"
            )}
          >
            <Globe size={16} />
            <span className="uppercase text-sm font-bold">{i18n.language}</span>
          </button>

          {/* Auth UI */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={handleAdminClick}
                  className={cn("p-2 rounded-full transition-colors flex items-center justify-center", effectiveScrolled ? "bg-slate-100 text-primary hover:bg-slate-200" : "bg-white/10 text-white hover:bg-white/20")}
                  title="Admin Dashboard"
                >
                  <User size={20} />
                </button>
                <button 
                  onClick={handleLogout}
                  className={cn("flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all", effectiveScrolled ? "bg-primary text-white hover:bg-accent" : "bg-white text-primary hover:bg-accent hover:text-white")}
                >
                  <LogOut size={18} />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <button 
                onClick={handleLogin}
                className={cn("flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all", effectiveScrolled ? "bg-primary text-white hover:bg-accent" : "bg-white text-primary hover:bg-accent hover:text-white")}
              >
                <LogIn size={18} />
                {t('nav.login')}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {isLoggedIn && (
            <button 
              onClick={handleAdminClick}
              className={cn("p-1.5 rounded-full transition-colors", effectiveScrolled ? "bg-slate-100 text-primary" : "bg-white/10 text-white")}
              title="Admin Dashboard"
            >
              <User size={20} />
            </button>
          )}
          <button onClick={toggleLanguage} className={cn(effectiveScrolled ? "text-slate-600" : "text-white")}>
            <span className="uppercase font-bold">{i18n.language}</span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(effectiveScrolled ? "text-primary" : "text-white")}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-primary z-40 transition-transform duration-500 md:hidden flex flex-col items-center justify-center gap-8",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white"
        >
          <X size={32} />
        </button>
        
        {navLinks.map((link) => (
          isInternalPage ? (
            <RouterLink
              key={link.to}
              to={`/#${link.to}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl font-bold hover:text-accent transition-colors"
            >
              {link.name}
            </RouterLink>
          ) : (
            <ScrollLink
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl font-bold hover:text-accent transition-colors"
            >
              {link.name}
            </ScrollLink>
          )
        ))}
        
        <div className="flex flex-col items-center gap-6 mt-4">
          <a href="tel:+49123456789" className="flex items-center gap-2 text-white text-xl font-bold">
            <Phone size={24} className="text-accent" />
            +49 123 456 789
          </a>
          
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={handleAdminClick}
                className="flex items-center gap-2 text-white font-bold"
              >
                <Settings size={24} />
                <span>Admin Panel {username && username !== 'Admin' ? `(${username})` : ''}</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent hover:text-white transition-all"
              >
                <LogOut size={20} />
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent hover:text-white transition-all"
            >
              <LogIn size={20} />
              {t('nav.login')}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
