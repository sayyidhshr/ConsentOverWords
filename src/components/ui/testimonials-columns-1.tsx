"use client";
import React, { useEffect, useRef } from "react";
import { useAnimate } from "motion/react";
import { Quote, Shield } from "lucide-react";

export interface TestimonialItem {
  id?: string;
  text: string;
  image?: string;
  name: string;
  role: string;
  category?: string;
  feeling?: string;
}

// Category badge color schemes (Clean pastel palette matching Consent Over Words)
const CATEGORY_THEMES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Unwanted Comments': {
    bg: '#EEF2FF',
    text: '#4338CA',
    border: '#C7D2FE',
    dot: '#6366F1'
  },
  'Body Shaming': {
    bg: '#FFF7ED',
    text: '#C2410C',
    border: '#FED7AA',
    dot: '#F97316'
  },
  'Sexual Harassment': {
    bg: '#FDF2F8',
    text: '#BE185D',
    border: '#FBCFE8',
    dot: '#EC4899'
  },
  'Sharing Without Consent': {
    bg: '#F5F3FF',
    text: '#6D28D9',
    border: '#DDD6FE',
    dot: '#8B5CF6'
  },
  'Cyberbullying': {
    bg: '#ECFDF5',
    text: '#047857',
    border: '#A7F3D0',
    dot: '#10B981'
  },
  'Cyberbullying & Doxing': {
    bg: '#FAF5FF',
    text: '#7E22CE',
    border: '#E9D5FF',
    dot: '#A855F7'
  },
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const animationRef = useRef<{ pause: () => void; play: () => void; stop: () => void } | null>(null);

  useEffect(() => {
    if (!scope.current) return;

    animationRef.current = animate(
      scope.current,
      { y: ["0%", "-50%"] },
      {
        duration: props.duration || 20,
        repeat: Infinity,
        ease: "linear",
      }
    );

    return () => {
      animationRef.current?.stop();
    };
  }, [animate, props.duration, scope]);

  return (
    <div
      className={`relative ${props.className || ''}`}
      onMouseEnter={() => animationRef.current?.pause()}
      onMouseLeave={() => animationRef.current?.play()}
    >
      <div
        ref={scope}
        className="flex flex-col gap-6 pb-6 will-change-transform select-none"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role, category, feeling }, i) => {
                const theme = (category && CATEGORY_THEMES[category]) || {
                  bg: '#F5F3FF',
                  text: '#6D28D9',
                  border: '#DDD6FE',
                  dot: '#8B5CF6'
                };

                return (
                  <div
                    key={`${index}-${i}`}
                    className="group relative flex flex-col justify-between w-full max-w-[360px] p-6 sm:p-7 rounded-2xl bg-white border border-[#E8E3F5] shadow-[0_6px_24px_rgba(41,0,135,0.06)] hover:shadow-[0_16px_36px_rgba(41,0,135,0.12)] hover:border-[#7853C9]/50 transition-all duration-300"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#2D2A3E',
                    }}
                  >
                    {/* Header: Category Badge & Feeling Pill */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {category ? (
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-xs"
                          style={{
                            backgroundColor: theme.bg,
                            color: theme.text,
                            borderColor: theme.border,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: theme.dot }}
                          />
                          <span>{category}</span>
                        </div>
                      ) : <div />}

                      {feeling && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8FE] border border-[#EDE8F8] text-[11.5px] font-medium text-[#7853C9]">
                          <span className="text-[#A29BB8]">Felt:</span>
                          <span className="font-semibold text-[#5A2EB8]">{feeling}</span>
                        </div>
                      )}
                    </div>

                    {/* Story Quote with decorative quotation icon */}
                    <div className="relative mb-5">
                      <Quote
                        size={22}
                        className="text-[#DDD9EE] mb-2 opacity-75"
                        strokeWidth={2.5}
                      />
                      <p className="text-[14px] sm:text-[14.5px] leading-[1.7] text-[#332C4A] font-normal">
                        "{text}"
                      </p>
                    </div>

                    {/* Footer: User Identity & Anonymous Badge */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#F0ECF8] mt-auto">
                      <div className="flex items-center gap-3">
                        <img
                          width={44}
                          height={44}
                          src={image || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`}
                          alt={name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover border-2 border-[#E3DEFA] shadow-xs"
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <div className="font-bold text-[14px] text-[#1E123F] tracking-tight">
                            {name}
                          </div>
                          <div className="text-xs text-[#6B6580] tracking-tight flex items-center gap-1">
                            {role}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-medium text-[#7853C9] bg-[#F5F2FC] px-2.5 py-1 rounded-full border border-[#E5E0F6]">
                        <Shield size={11} className="text-[#5A2EB8]" />
                        <span>Anonim</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};

export default TestimonialsColumn;
