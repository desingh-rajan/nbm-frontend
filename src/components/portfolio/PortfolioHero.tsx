import React from 'react';

/* Reworked hero: creative studio positioning with category badges */
export const PortfolioHero: React.FC = () => {
  return (
    <section data-section id="portfolio-hero" className="relative overflow-hidden min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,104,55,0.12),rgba(0,77,40,0.85)_70%,rgba(0,77,40,0.95))] dark:bg-[radial-gradient(circle_at_center,#1a2e23_0%,#10231a_70%,#0a0a0a_100%)]" aria-hidden />
      {/* Additional overlay for better text contrast in light mode */}
      <div className="absolute inset-0 bg-black/20 dark:bg-transparent" aria-hidden />
      <div className="absolute inset-0 mix-blend-overlay opacity-40 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_6px)] dark:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_6px)]" aria-hidden />

      {/* Animated 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden style={{ perspective: '1000px' }}>
        {/* 3D Floating Sphere */}
        <div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.6), rgba(22, 163, 74, 0.3), rgba(21, 128, 61, 0.1))',
            boxShadow: '0 12px 24px rgba(34, 197, 94, 0.2), inset -6px -6px 12px rgba(21, 128, 61, 0.3), inset 6px 6px 12px rgba(134, 239, 172, 0.2)',
            animation: 'float3d-sphere 12s ease-in-out infinite',
            transformStyle: 'preserve-3d'
          }}
        ></div>

        {/* 3D Floating Cube */}
        <div
          className="absolute top-2/3 right-1/5 w-36 h-36"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.5) 0%, rgba(5, 150, 105, 0.3) 50%, rgba(6, 78, 59, 0.2) 100%)',
            boxShadow: '0 15px 30px rgba(16, 185, 129, 0.25), inset -5px -5px 10px rgba(6, 78, 59, 0.4), inset 5px 5px 10px rgba(52, 211, 153, 0.3)',
            borderRadius: '12px',
            animation: 'float3d-cube 15s ease-in-out infinite',
            animationDelay: '2s',
            transformStyle: 'preserve-3d',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}
        ></div>

        {/* 3D Floating Cylinder */}
        <div
          className="absolute top-1/2 left-4/5 w-28 h-28 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 25% 25%, rgba(45, 212, 191, 0.6), rgba(17, 94, 89, 0.4), rgba(19, 78, 74, 0.2))',
            boxShadow: '0 10px 20px rgba(45, 212, 191, 0.3), inset -4px -8px 16px rgba(19, 78, 74, 0.5), inset 4px 4px 8px rgba(94, 234, 212, 0.3)',
            animation: 'float3d-cylinder 10s ease-in-out infinite',
            animationDelay: '4s',
            transformStyle: 'preserve-3d'
          }}
        ></div>

        {/* 3D Floating Pyramid */}
        <div
          className="absolute top-1/3 right-1/3 w-32 h-32"
          style={{
            background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.5), rgba(22, 163, 74, 0.3), rgba(21, 128, 61, 0.1))',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            boxShadow: '0 12px 24px rgba(34, 197, 94, 0.25), inset -3px -6px 12px rgba(21, 128, 61, 0.4)',
            animation: 'float3d-pyramid 18s linear infinite',
            animationDelay: '1s',
            transformStyle: 'preserve-3d'
          }}
        ></div>

        {/* 3D Floating Hexagon */}
        <div
          className="absolute bottom-1/4 left-1/6 w-20 h-20"
          style={{
            background: 'linear-gradient(60deg, rgba(16, 185, 129, 0.6), rgba(5, 150, 105, 0.4), rgba(6, 78, 59, 0.2))',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3), inset -2px -4px 8px rgba(6, 78, 59, 0.5), inset 2px 2px 6px rgba(52, 211, 153, 0.3)',
            animation: 'float3d-complex 14s ease-in-out infinite',
            animationDelay: '3s',
            transformStyle: 'preserve-3d'
          }}
        ></div>

        {/* 3D Floating Capsule */}
        <div
          className="absolute top-1/6 right-1/6 w-40 h-12"
          style={{
            background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.5), rgba(22, 163, 74, 0.3), transparent)',
            borderRadius: '50px',
            boxShadow: '0 6px 12px rgba(34, 197, 94, 0.3), inset -3px -3px 6px rgba(21, 128, 61, 0.4), inset 3px 3px 6px rgba(134, 239, 172, 0.2)',
            animation: 'float3d-sphere 16s ease-in-out infinite reverse',
            animationDelay: '0.5s',
            transformStyle: 'preserve-3d'
          }}
        ></div>

        {/* 3D Floating Rod */}
        <div
          className="absolute bottom-1/3 right-1/2 w-10 h-32"
          style={{
            background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.5), rgba(5, 150, 105, 0.3), transparent)',
            borderRadius: '20px',
            boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3), inset -2px -3px 6px rgba(6, 78, 59, 0.5), inset 1px 1px 4px rgba(52, 211, 153, 0.3)',
            animation: 'float3d-cylinder 13s ease-in-out infinite reverse',
            animationDelay: '2.5s',
            transformStyle: 'preserve-3d'
          }}
        ></div>


      </div>
      <div className="container-shell relative flex flex-col items-center text-center gap-10">
        <div className="flex flex-col gap-4 items-center max-w-5xl">
          <h1
            className="font-display leading-[0.95] text-[clamp(3rem,10vw,7.5rem)] bg-gradient-to-br from-[#e6fffa] via-[#a7f3d0] to-[#6ee7b7] dark:from-[#5fffa1] dark:to-[#0d8f4a] bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_4px_16px_rgba(0,64,32,0.12)]"
          >
            Graphics, Animation & Storytelling that Moves Brands Forward
          </h1>
          <p className="text-white/95 dark:text-[var(--color-text-muted)] max-w-3xl text-sm md:text-lg leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] dark:drop-shadow-none">
            We craft high-impact motion graphics, cinematic product & lifestyle edits, and narrative-driven ad films for brands in jewellery, fitness, retail and beyond — engineered to stop scrolls and spark action.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {['Motion Graphics', 'Ad Films', 'Product Edits', 'Social Campaigns', 'Animations'].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/20 dark:bg-[var(--color-brand-dark)]/40 backdrop-blur text-xs md:text-sm tracking-wide text-white dark:text-[var(--color-brand-light)] border border-white/40 dark:border-[var(--color-brand-light)]/40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-none">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
