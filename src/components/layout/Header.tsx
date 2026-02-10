import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { label: 'Top', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Works', path: '/works' },
    { label: 'Recruit', path: '/recruit' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Floating Island Header - Optimized (No Blur, Sharp Borders) */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[50]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-white dark:bg-black border border-black dark:border-white rounded-full px-8 py-4 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center gap-8">
          <Link to="/" className="font-bold text-xl tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-blue hover:via-brand-green hover:to-brand-orange transition-all whitespace-nowrap">
            PEACE BIZ
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/about"
              className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-brand-blue transition-all"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-brand-blue transition-all"
            >
              Services
            </Link>
            <Link
              to="/works"
              className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-brand-blue transition-all"
            >
              Works
            </Link>
            <Link
              to="/services/primesign"
              className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              Prime Sign
            </Link>

            {/* Always visible RECRUIT and CONTACT */}
            <div className="flex items-center gap-4 border-l border-black/10 dark:border-white/10 pl-6 ml-6">
              <Link to="/recruit" className="text-xs font-bold uppercase tracking-widest text-brand-blue hover:opacity-70 transition-opacity">
                Recruit
              </Link>
              <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-brand-orange hover:opacity-70 transition-opacity">
                Contact
              </Link>
            </div>
          </nav>

          <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5 group-hover:text-brand-blue transition-colors" />
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay - Structural Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white dark:bg-zinc-900 text-black dark:text-white flex flex-col items-center justify-center overflow-hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Diagonal Grid Lines for Structure */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
              <div className="absolute top-0 left-0 w-full h-full border-r border-black dark:border-white transform -skew-x-12 origin-top-left" />
              <div className="absolute top-0 right-1/4 w-px h-full bg-black dark:bg-white" />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 w-16 h-16 rounded-full border border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all z-20 group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <nav className="flex flex-col gap-2 text-center relative z-10 w-full max-w-4xl px-6">
              {menuItems.map((item, index) => (
                <div key={item.path} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="text-6xl md:text-8xl font-black tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-blue hover:via-brand-green hover:to-brand-orange transition-all block py-4 border-b border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white group relative"
                    >
                      <span className="text-sm font-bold tracking-widest absolute left-0 top-1/2 -translate-y-1/2 opacity-0 md:group-hover:opacity-100 transition-opacity text-black dark:text-white">0{index + 1}</span>
                      {item.label.toUpperCase()}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <div className="absolute bottom-12 left-0 w-full text-center text-gray-400 text-xs tracking-[0.5em] uppercase">
              Peace Biz Inc.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;