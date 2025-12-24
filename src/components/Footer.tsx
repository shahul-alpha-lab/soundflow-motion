import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Music } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const links = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-max px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Music className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">
              <span className="text-background">Sound</span>
              <span className="text-primary">wave</span>
            </span>
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-background/70 hover:text-primary transition-colors text-sm"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>{t('footer.tagline')}</p>
          <p>© {currentYear} Soundwave Agency. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
