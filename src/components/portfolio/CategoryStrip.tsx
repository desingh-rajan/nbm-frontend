import React from 'react';

interface CategoryStripProps { id: string; title: string; }

export const CategoryStrip: React.FC<CategoryStripProps> = ({ id, title }) => {
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
          <div className="max-w-4xl">
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8">{content.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.samples.map(sample => (
                <div key={sample} className="px-4 py-3 rounded-xl bg-[var(--color-bg-muted)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-brand-dark)] text-center">
                  {sample}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryStrip;
