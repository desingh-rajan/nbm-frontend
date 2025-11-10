'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useSiteSettingValue } from '@/hooks';
import { VideoModal } from '@/components/ui/VideoModal';

interface CategoryStripProps { id: string; title: string; }

interface ProjectItem {
  id: string;
  title?: string;
  category?: string;
  thumbnail: string;
  videoUrl?: string;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({ id, title }) => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string, title: string } | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  // Fetch projects based on section id
  const settingKey = id === 'motion-graphics' ? 'motion_graphics_projects' : 'animations_projects';
  const projectsData = useSiteSettingValue<{ projects: ProjectItem[] }>(settingKey, { projects: [] });

  // Reuse the exact same card style as "Our Works" section
  const cardCls = 'relative overflow-hidden rounded-[2rem] aspect-[9/16] bg-[var(--color-bg-muted)] flex items-center justify-center shadow-card hover:shadow-glow-green hover:scale-105 transition-all cursor-pointer group';

  // Align placeholders: Motion Graphics -> left, Animations -> right
  const showMediaRight = id === 'animations';
  const showMediaLeft = id === 'motion-graphics';

  // Get YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    try {
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
      } else if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1]?.split('?')[0];
      }
    } catch (e) {
      console.error('Error parsing YouTube URL:', e);
    }
    return null;
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  // Get YouTube embed URL for hover preview
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}` : null;
  };

  const handleProjectClick = (project: ProjectItem) => {
    if (project.videoUrl) {
      setSelectedVideo({
        url: project.videoUrl,
        title: project.title || 'Project Video'
      });
    }
  };

  const renderProjectCard = (w: ProjectItem) => {
    const thumbnailUrl = w.videoUrl ? getYouTubeThumbnail(w.videoUrl) : w.thumbnail;
    const embedUrl = w.videoUrl ? getYouTubeEmbedUrl(w.videoUrl) : null;
    const isHovered = hoveredVideo === w.id;

    return (
      <div
        key={w.id}
        className={cardCls}
        onClick={() => handleProjectClick(w)}
        onMouseEnter={() => setHoveredVideo(w.id)}
        onMouseLeave={() => setHoveredVideo(null)}
        role="button"
        tabIndex={0}
        aria-label={`View ${w.title || 'project'}`}
      >
        <div className="relative w-full h-full">
          {/* Show video on hover, thumbnail otherwise */}
          {isHovered && embedUrl ? (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          ) : thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={w.title || 'Project'}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-[var(--color-text-muted)]">IMG</span>
          )}

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          {/* Title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            {w.title && <p className="text-sm font-bold text-white line-clamp-1">{w.title}</p>}
            {w.category && (
              <span className="text-xs text-white/80">
                {w.category}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MediaRow: React.FC = () => (
    <div className="grid grid-cols-2 gap-6 w-full">
      {projectsData.projects.map(project => renderProjectCard(project))}
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

      {/* Video Modal */}
      <VideoModal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ''}
        title={selectedVideo?.title}
      />
    </section>
  );
};

export default CategoryStrip;
