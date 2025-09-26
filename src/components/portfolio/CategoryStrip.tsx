import React from 'react';

interface CategoryStripProps { id: string; title: string; }

export const CategoryStrip: React.FC<CategoryStripProps> = ({ id, title }) => {
  // Reuse the exact same card style as "Our Works" section
  const cardCls = 'relative overflow-hidden rounded-[2rem] aspect-[9/16] bg-[var(--color-bg-muted)] flex items-center justify-center shadow-card';

  // Align placeholders: Motion Graphics -> left, Animations -> right
  const showMediaRight = id === 'animations';
  const showMediaLeft = id === 'motion-graphics';

  const MediaRow: React.FC = () => (
    <div className="grid grid-cols-2 gap-6 w-full">
      <div className={cardCls}>IMG</div>
      <div className={cardCls}>IMG</div>
    </div>
  );
  const getContent = () => {
    if (id === 'motion-graphics') {
      return {
        description: "Dynamic visual storytelling that brings brands to life through kinetic typography, logo animations, explainer videos, and data visualizations.",
        samples: [
          "Product Launch Teasers",
          "Social Media Graphics",
          "Explainer Video Assets",
        ]
      };
    }
    if (id === 'animations') {
      return {
        description: "Character-driven narratives and 2D/3D animations that engage audiences with memorable storytelling and smooth, professional motion.",
        samples: [
          "2D Character Animation",
          "3D Product Renders",
          "Process Illustrations",
        ]
      };
    }
    return { description: "", samples: [] };
  };

  const content = getContent();

  return (
    <section data-section id={id} className="relative overflow-hidden">
      <div className="container-shell flex flex-col gap-12 items-center text-center">
        <h3
          className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide bg-gradient-to-br from-[#009e60] to-[#004d28] dark:from-[#5fffa1] dark:to-[#0d8f4a] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,64,32,0.18)] text-center"
        >
          {title}
        </h3>
        {content.description && (
          <div className={`flex flex-col gap-8 items-center ${showMediaRight || showMediaLeft ? 'md:flex-row md:items-start' : ''}`}>
            {/* Media on left (not used currently) */}
            {showMediaLeft && (
              <div className="w-full md:order-1 md:basis-1/2 md:shrink-0 md:min-w-0">
                <MediaRow />
              </div>
            )}

            {/* Content */}
            <div className={`w-full md:order-1 ${showMediaRight || showMediaLeft ? 'md:basis-1/2 md:min-w-0' : ''} max-w-4xl mx-auto text-center`}>
              <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8">{content.description}</p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {content.samples.map(sample => (
                  <div
                    key={sample}
                    className="min-w-[140px] px-4 py-2 rounded-full bg-white/20 dark:bg-[var(--color-brand-dark)]/40 backdrop-blur text-xs md:text-sm tracking-wide text-[var(--color-brand-dark)] dark:text-[var(--color-brand-light)] border border-[var(--color-brand-dark)]/30 dark:border-[var(--color-brand-light)]/40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-none text-center font-medium flex items-center justify-center"
                  >
                    {sample}
                  </div>
                ))}
              </div>
            </div>

            {/* Media on right for motion graphics */}
            {showMediaRight && (
              <div className="w-full md:order-2 md:basis-1/2 md:shrink-0 md:min-w-0">
                <MediaRow />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryStrip;
