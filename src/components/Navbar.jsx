import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

export const Navbar = ({ onOpenAwareness }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Poster', href: '#poster' },
    { label: 'Learn', href: '#learn' },
    { label: 'Voices', href: '#voices' },
    { label: 'What Can I Do?', href: '#action' },
    { label: 'Share Your Story', href: '#share' },
  ];

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <nav className="container navbar-container">
          {/* Brand */}
          <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
            <div className="brand-logo-pill">
              <MessageCircle size={16} color="#FFF" />
            </div>
            <span className="brand-wordmark">Consent Over Words</span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link-item"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="nav-actions">
            <button
              id="btn-nav-awareness"
              className="btn btn-primary btn-sm nav-awareness-btn"
              onClick={() => onOpenAwareness('pre')}
              style={{ display: 'flex' }}
            >
              <Sparkles size={14} />
              <span className="nav-awareness-text">Take Awareness Check</span>
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-item"
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              <span>{link.label}</span>
              <ChevronRight size={16} />
            </a>
          ))}
          <div style={{ paddingTop: '0.75rem', borderTop: '1.5px solid var(--border)' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => { setMobileOpen(false); onOpenAwareness('pre'); }}
            >
              <Sparkles size={16} />
              <span>Take Awareness Check</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
