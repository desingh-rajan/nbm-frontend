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
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-40" aria-hidden />

      <div className="container-shell flex flex-col gap-12 items-center text-center">
        <h3
          className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide text-gradient-brand text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
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
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {content.samples.map(sample => (
                  <div
                    key={sample}
                    className="px-3 md:px-4 py-2 rounded-full bg-gradient-card backdrop-blur text-xs md:text-sm tracking-wide text-[var(--color-brand)] border-2 border-[var(--color-brand)]/50 shadow-card hover:shadow-glow-green hover:scale-105 transition-all text-center font-medium flex items-center justify-center"
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
