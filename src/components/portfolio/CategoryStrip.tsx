import React from 'react';

interface CategoryStripProps { id: string; title: string; }

export const CategoryStrip: React.FC<CategoryStripProps> = ({ id, title }) => {
  // Reuse the exact same card style as "Our Works" section
  const cardCls = 'relative overflow-hidden rounded-[2rem] aspect-[9/16] bg-[var(--color-bg-muted)] flex items-center justify-center shadow-card';

  const showMediaRight = id === 'motion-graphics';
  const showMediaLeft = id === 'animations';

  const MediaColumn: React.FC = () => (
    <div className="flex flex-col gap-6 w-full">
      <div className={cardCls}>IMG</div>
      <div className={cardCls}>IMG</div>
    </div>
  );
  const getContent = () => {
    if (id === 'motion-graphics') {
      return {
        description: "Dynamic visual storytelling that brings brands to life through kinetic typography, logo animations, explainer videos, and data visualizations.",
        samples: [
          "Brand Logo Animations",
          "Product Launch Teasers",
          "Social Media Graphics",
          "Explainer Video Assets",
          "Kinetic Typography",
          "Data Visualization"
        ]
      };
    }
    if (id === 'animations') {
      return {
        description: "Character-driven narratives and 2D/3D animations that engage audiences with memorable storytelling and smooth, professional motion.",
        samples: [
          "2D Character Animation",
          "3D Product Renders",
          "Mascot Animations",
          "Process Illustrations",
          "Interactive Elements",
          "Micro-Interactions"
        ]
      };
    }
    return { description: "", samples: [] };
  };

  const content = getContent();

  return (
    <section data-section id={id} className="relative overflow-hidden">
      <div className="container-shell flex flex-col gap-12">
        <h3
          className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide bg-gradient-to-br from-[#009e60] to-[#004d28] dark:from-[#5fffa1] dark:to-[#0d8f4a] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,64,32,0.18)]"
        >
          {title}
        </h3>
        {content.description && (
          <div className={`grid gap-8 items-start ${showMediaRight || showMediaLeft ? 'md:grid-cols-12' : ''}`}>
            {/* Media on left for animations */}
            {showMediaLeft && (
              <div className="md:col-span-5 order-2 md:order-1">
                <MediaColumn />
              </div>
            )}

            {/* Content */}
            <div className={`${showMediaRight || showMediaLeft ? 'md:col-span-7' : ''} order-1 md:order-2 max-w-4xl`}> 
              <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8">{content.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {content.samples.map(sample => (
                  <div key={sample} className="px-4 py-3 rounded-xl bg-[var(--color-bg-muted)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-brand-dark)] text-center">
                    {sample}
                  </div>
                ))}
              </div>
            </div>

            {/* Media on right for motion graphics */}
            {showMediaRight && (
              <div className="md:col-span-5">
                <MediaColumn />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryStrip;
