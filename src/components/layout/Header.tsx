import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [serviceHover, setServiceHover] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setServiceHover(false);
  }, [location]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Top', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Works', path: '/works' },
    { label: 'Recruit', path: '/recruit' },
    { label: 'Contact', path: '/contact' },
  ];

  const serviceItems = [
    { label: 'IT Solution', path: '/services/it-solution' },
    { label: 'Eco Solution', path: '/services/eco-solution' },
    { label: 'Office Solution', path: '/services/office-solution' },
  ];

  // On home and not scrolled = transparent white text. Otherwise = solid bg
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      {/* Full-Width Top Header (gnmd style) */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/5 dark:border-white/5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1920px]">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className={`font-black text-xl md:text-2xl tracking-tighter transition-all duration-300 hover:opacity-70 ${
                isTransparent ? 'text-white' : 'text-black dark:text-white'
              }`}
            >
              PEACE BIZ
            </Link>

            {/* Desktop Navigation (gnmd style) */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-all duration-300 hover:opacity-100 ${
                  isTransparent
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                } ${location.pathname === '/' ? (isTransparent ? 'text-white' : 'text-black dark:text-white') : ''}`}
              >
                Home
              </Link>

              {/* Service with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServiceHover(true)}
                onMouseLeave={() => setServiceHover(false)}
              >
                <Link
                  to="/services"
                  className={`text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1 hover:opacity-100 ${
                    isTransparent
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  } ${location.pathname.startsWith('/services') ? (isTransparent ? 'text-white' : 'text-black dark:text-white') : ''}`}
                >
                  Service
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${serviceHover ? 'rotate-180' : ''}`} />
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {serviceHover && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 pt-2 w-56"
                    >
                      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-black/10 dark:border-white/10 shadow-xl overflow-hidden py-2">
                        {serviceItems.map((item, i) => (
                          <Link
                            key={i}
                            to={item.path}
                            className="block px-5 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-black/60 dark:text-white/60 hover:text-brand-blue hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/about"
                className={`text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-all duration-300 hover:opacity-100 ${
                  isTransparent
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                } ${location.pathname === '/about' ? (isTransparent ? 'text-white' : 'text-black dark:text-white') : ''}`}
              >
                Company
              </Link>

              <Link
                to="/works"
                className={`text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-all duration-300 hover:opacity-100 ${
                  isTransparent
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                } ${location.pathname === '/works' ? (isTransparent ? 'text-white' : 'text-black dark:text-white') : ''}`}
              >
                News
              </Link>

              <Link
                to="/recruit"
                className={`text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-all duration-300 hover:opacity-100 ${
                  isTransparent
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                } ${location.pathname === '/recruit' ? (isTransparent ? 'text-white' : 'text-black dark:text-white') : ''}`}
              >
                Career
              </Link>

              <Link
                to="/contact"
                className={`text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-all duration-300 hover:opacity-100 ${
                  isTransparent
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                } ${location.pathname === '/contact' ? (isTransparent ? 'text-white' : 'text-black dark:text-white') : ''}`}
              >
                Contact
              </Link>
            </nav>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 group lg:ml-6 ${
                isTransparent
                  ? 'border border-white/30 text-white hover:bg-white hover:text-black'
                  : 'border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
              }`}
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay (gnmd style - enhanced) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black text-white flex overflow-hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Grid overlay lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
              <div className="absolute left-1/4 top-0 w-px h-full bg-white" />
              <div className="absolute left-2/4 top-0 w-px h-full bg-white" />
              <div className="absolute left-3/4 top-0 w-px h-full bg-white" />
            </div>

            {/* Top bar in overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="font-black text-xl md:text-2xl tracking-tighter text-white hover:opacity-70 transition-opacity"
              >
                PEACE BIZ
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Menu Content - Split Layout */}
            <div className="flex flex-col lg:flex-row w-full h-full pt-20">

              {/* Left: Main Navigation */}
              <div className="lg:w-3/5 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-0">
                <nav className="flex flex-col gap-1">
                  {menuItems.map((item, index) => (
                    <div key={item.path} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ delay: 0.15 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="flex items-baseline gap-6 py-3 md:py-4 border-b border-white/10 hover:border-white/40 transition-all group"
                        >
                          <span className="text-xs font-mono text-white/30 tracking-widest group-hover:text-brand-blue transition-colors w-8">
                            0{index + 1}
                          </span>
                          <span className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:via-brand-green group-hover:to-brand-orange transition-all">
                            {item.label.toUpperCase()}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Right: Sub-links & Info */}
              <div className="lg:w-2/5 flex flex-col justify-between px-8 md:px-16 lg:px-20 py-8 lg:py-20 border-t lg:border-t-0 lg:border-l border-white/10">
                {/* Service Sub-links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h4 className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-8">Service</h4>
                  <div className="space-y-4">
                    {serviceItems.map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg md:text-xl font-bold text-white/60 hover:text-white transition-colors hover:translate-x-2 transform duration-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Company Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-12 lg:mt-0"
                >
                  <div className="space-y-4 text-sm text-white/30 font-medium">
                    <p>Peace Biz Inc.</p>
                    <p>Tokyo - Sendai - Fukuoka</p>
                    <p>EST. 2008</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;