import React, { useEffect, useRef, useState } from 'react';
import { useAnimate } from 'motion/react';

// 5 Curated Pastel Themes (Warm Butter/Cream, Soft Lavender, Soft Mint, Blush Pink, Sky Blue)
// Matching the Consent Over Words brand palette
const PASTEL_THEMES = [
  // 0: Soft Butter / Cream (Matches Card 1 in user reference)
  {
    bg: '#FFFDF2',
    border: '#F6E8BF',
    quoteColor: '#C49420',
  },
  // 1: Soft Lavender / Lilac (Matches Card 2 in user reference)
  {
    bg: '#F8F6FD',
    border: '#E6DCF8',
    quoteColor: '#7A52C7',
  },
  // 2: Soft Mint (Matches Card 3 in user reference)
  {
    bg: '#F2FAF6',
    border: '#CEEFE0',
    quoteColor: '#2C9766',
  },
  // 3: Soft Blush Pink
  {
    bg: '#FDF4F8',
    border: '#F9D4E4',
    quoteColor: '#D34D82',
  },
  // 4: Soft Sky Blue
  {
    bg: '#F2F7FE',
    border: '#D2E3FD',
    quoteColor: '#3678D4',
  },
];

// Stylized cartoon avatars with crisp vector proportions (40x40 viewBox)
const CuteCartoonAvatar = ({ variant = 0 }) => {
  const avatars = [
    // Variant 0: Orange hair with round glasses (Matches middle card in reference)
    <svg key="0" viewBox="0 0 40 40" className="w-full h-full" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#FFE3D1" />
      {/* Orange curly hair */}
      <circle cx="20" cy="11" r="8" fill="#E65100" />
      <circle cx="12" cy="14" r="5" fill="#E65100" />
      <circle cx="28" cy="14" r="5" fill="#E65100" />
      {/* Face */}
      <circle cx="20" cy="20" r="10.5" fill="#FFCC80" />
      {/* Round Glasses */}
      <circle cx="16" cy="19.5" r="3.2" stroke="#2D2A3E" strokeWidth="1.4" fill="none" />
      <circle cx="24" cy="19.5" r="3.2" stroke="#2D2A3E" strokeWidth="1.4" fill="none" />
      <path d="M19.2 19.5h1.6" stroke="#2D2A3E" strokeWidth="1.4" />
      {/* Eyes */}
      <circle cx="16" cy="19.5" r="1.1" fill="#2D2A3E" />
      <circle cx="24" cy="19.5" r="1.1" fill="#2D2A3E" />
      {/* Smile */}
      <path d="M18 24.5c1 1 3 1 4 0" stroke="#C2410C" strokeWidth="1.4" strokeLinecap="round" />
      {/* Shirt */}
      <path d="M9 38c2-5 7-7 11-7s9 2 11 7" fill="#E83D84" />
    </svg>,

    // Variant 1: Brown hair, rosy cheeks & friendly smile (Matches right card in reference)
    <svg key="1" viewBox="0 0 40 40" className="w-full h-full" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#D1FAE5" />
      <circle cx="20" cy="12" r="8.5" fill="#4E342E" />
      <circle cx="20" cy="20" r="10.5" fill="#FFDFC4" />
      <circle cx="16" cy="18.5" r="1.3" fill="#2D2A3E" />
      <circle cx="24" cy="18.5" r="1.3" fill="#2D2A3E" />
      <circle cx="14" cy="21.5" r="1.7" fill="#FCA5A5" opacity="0.6" />
      <circle cx="26" cy="21.5" r="1.7" fill="#FCA5A5" opacity="0.6" />
      <path d="M18 24c1 1 3 1 4 0" stroke="#881337" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 38c2-5 7-7 11-7s9 2 11 7" fill="#10B981" />
    </svg>,

    // Variant 2: Purple hair with stylish bangs
    <svg key="2" viewBox="0 0 40 40" className="w-full h-full" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#EDE9FE" />
      <circle cx="20" cy="11" r="8.5" fill="#7C3AED" />
      <circle cx="13" cy="15" r="4.5" fill="#7C3AED" />
      <circle cx="27" cy="15" r="4.5" fill="#7C3AED" />
      <circle cx="20" cy="20" r="10.5" fill="#FFDFC4" />
      <circle cx="16" cy="18.5" r="1.3" fill="#2D2A3E" />
      <circle cx="24" cy="18.5" r="1.3" fill="#2D2A3E" />
      <path d="M17.5 24c1.5 1.2 3.5 1.2 5 0" stroke="#6D28D9" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 38c2-5 7-7 11-7s9 2 11 7" fill="#6366F1" />
    </svg>,

    // Variant 3: Yellow/gold hair with happy eyes (Matches left card in reference)
    <svg key="3" viewBox="0 0 40 40" className="w-full h-full" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#FEF3C7" />
      <circle cx="20" cy="11" r="8.5" fill="#D97706" />
      <circle cx="20" cy="20" r="10.5" fill="#FFDFC4" />
      <circle cx="16" cy="18.5" r="1.3" fill="#2D2A3E" />
      <circle cx="24" cy="18.5" r="1.3" fill="#2D2A3E" />
      <circle cx="14" cy="21.5" r="1.7" fill="#FCA5A5" opacity="0.6" />
      <circle cx="26" cy="21.5" r="1.7" fill="#FCA5A5" opacity="0.6" />
      <path d="M18 24c1 1 3 1 4 0" stroke="#B45309" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 38c2-5 7-7 11-7s9 2 11 7" fill="#F59E0B" />
    </svg>,

    // Variant 4: Teal beret / friendly student look
    <svg key="4" viewBox="0 0 40 40" className="w-full h-full" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#E0F2FE" />
      <circle cx="20" cy="11" r="8.5" fill="#0284C7" />
      <circle cx="20" cy="20" r="10.5" fill="#FFDFC4" />
      <circle cx="16" cy="18.5" r="1.3" fill="#2D2A3E" />
      <circle cx="24" cy="18.5" r="1.3" fill="#2D2A3E" />
      <circle cx="14" cy="21.5" r="1.7" fill="#BAE6FD" opacity="0.8" />
      <circle cx="26" cy="21.5" r="1.7" fill="#BAE6FD" opacity="0.8" />
      <path d="M18 24c1 1 3 1 4 0" stroke="#0369A1" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 38c2-5 7-7 11-7s9 2 11 7" fill="#0284C7" />
    </svg>,
  ];

  return avatars[variant % avatars.length];
};

export const AnonymousHorizontalMarquee = ({
  items = [],
  speed = 46,
  className = '',
}) => {
  const [scope, animate] = useAnimate();
  const animationRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Infinite seamless horizontal marquee animation
  useEffect(() => {
    if (!scope.current || prefersReducedMotion || !items || items.length === 0) return;

    // Seamless leftward infinite horizontal scroll:
    // Translates scope from 0% to -50% (exactly 1 complete track width).
    // Because Track 1 and Track 2 have identical width and padding,
    // the jump at loop reset is 0px (100% seamless).
    animationRef.current = animate(
      scope.current,
      { x: ['0%', '-50%'] },
      {
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
      }
    );

    return () => {
      animationRef.current?.stop();
    };
  }, [animate, speed, scope, items, prefersReducedMotion]);

  // Pause on hover / touch so user can read comfortably
  const handlePause = () => {
    if (animationRef.current && !prefersReducedMotion) {
      animationRef.current.pause();
    }
  };

  const handleResume = () => {
    if (animationRef.current && !prefersReducedMotion) {
      animationRef.current.play();
    }
  };

  if (!items || items.length === 0) return null;

  // Render individual card with perfectionist dimensions, balanced padding, and spacious typography
  const renderCard = (item, index, keyPrefix) => {
    const theme = PASTEL_THEMES[index % PASTEL_THEMES.length];
    const text = item.text || item.storyText || (typeof item === 'string' ? item : '');
    const name = item.name || 'Anonim';
    const avatarVariant = item.avatarVariant !== undefined ? item.avatarVariant : (index % 5);

    return (
      <div
        key={`${keyPrefix}-${item.id || index}`}
        className="group relative flex flex-col justify-between w-[350px] sm:w-[410px] md:w-[430px] h-[295px] sm:h-[310px] p-6 sm:p-7 rounded-[22px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 shrink-0 box-border overflow-hidden select-none"
        style={{
          boxSizing: 'border-box',
          backgroundColor: theme.bg,
          border: `1.5px solid ${theme.border}`,
          boxShadow: '0 8px 24px -4px rgba(41, 0, 135, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02)',
        }}
      >
        {/* Card Header: Avatar (44px) + Name "Anonim" + Category Tag + Subtle Quote Icon */}
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Avatar container (44x44 circle, guaranteed round & non-distorted) */}
            <div
              className="w-11 h-11 rounded-full shrink-0 overflow-hidden shadow-xs border border-white/80 flex items-center justify-center bg-white/70"
              style={{ borderRadius: '50%', width: '44px', height: '44px' }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={name}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                  loading="lazy"
                />
              ) : (
                <CuteCartoonAvatar variant={avatarVariant} />
              )}
            </div>

            {/* User Name & Category Badge */}
            <div className="flex flex-col text-left min-w-0">
              <span
                className="font-bold text-[#1E0A4A] text-[15px] sm:text-[15.5px] leading-tight tracking-tight truncate"
                style={{ fontFamily: "var(--font-display, 'Poppins', sans-serif)" }}
              >
                {name}
              </span>
              {item.category && (
                <span
                  className="text-[11px] font-semibold mt-0.5 truncate opacity-75"
                  style={{ color: theme.quoteColor }}
                >
                  {item.category}
                </span>
              )}
            </div>
          </div>

          {/* Subtle Decorative Quote Icon */}
          <div
            className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center shrink-0 opacity-30 group-hover:opacity-60 transition-opacity"
            aria-hidden="true"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={theme.quoteColor}>
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>

        {/* Card Body: Story Quote (Left-aligned, ample vertical headroom so text never hits the edge) */}
        <div className="mt-4 flex-1 flex flex-col justify-start overflow-hidden text-left">
          <p
            className="text-[14px] sm:text-[14.5px] leading-[1.65] text-[#2E2845] italic font-normal tracking-normal break-words"
            style={{ fontFamily: "var(--font-body, 'Nunito', sans-serif)" }}
          >
            "{text}"
          </p>
        </div>
      </div>
    );
  };

  // Accessible fallback for users with prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div className={`relative w-full overflow-x-auto py-6 sm:py-8 px-2 select-none scrollbar-thin ${className}`}>
        <div className="flex flex-nowrap items-center gap-7 sm:gap-9 w-max">
          {items.map((item, index) => renderCard(item, index, 'static'))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden py-8 sm:py-10 select-none ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)',
      }}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <div
        ref={scope}
        className="flex flex-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        {/* Track 1 */}
        <div className="flex flex-nowrap items-center gap-7 sm:gap-9 shrink-0 pr-7 sm:pr-9">
          {items.map((item, index) => renderCard(item, index, 'track1'))}
        </div>

        {/* Track 2 - Exact duplicate for seamless 100% infinite loop */}
        <div className="flex flex-nowrap items-center gap-7 sm:gap-9 shrink-0 pr-7 sm:pr-9" aria-hidden="true">
          {items.map((item, index) => renderCard(item, index + items.length, 'track2'))}
        </div>
      </div>
    </div>
  );
};

export default AnonymousHorizontalMarquee;
