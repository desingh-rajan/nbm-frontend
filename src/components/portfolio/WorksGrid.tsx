'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useSiteSettingValue } from '@/hooks';
import { VideoModal } from '@/components/ui/VideoModal';

export interface WorkItem {
  id: string;
  title?: string;
  category?: string;
  thumbnail: string;
  videoUrl?: string;
  tags?: string[];
}

const cardCls = 'relative overflow-hidden rounded-[2rem] aspect-[9/16] bg-[var(--color-bg-muted)] flex items-center justify-center shadow-card hover:shadow-glow-green hover:scale-105 transition-all cursor-pointer group';

export const WorksGrid: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string, title: string } | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const showcaseData = useSiteSettingValue<{ title: string, projects: WorkItem[] }>(
    'projects_showcase',
    {
      title: 'OUR WORKS',
      projects: []
    }
  );

  const topWorks = showcaseData.projects.slice(0, 4);
  const secondRow = showcaseData.projects.slice(4, 8);

  const handleProjectClick = (project: WorkItem) => {
    if (project.videoUrl) {
      setSelectedVideo({
        url: project.videoUrl,
        title: project.title || 'Project',
      });
    }
  }; const handleKeyPress = (e: React.KeyboardEvent, project: WorkItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProjectClick(project);
    }
  };

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

  const renderProjectCard = (w: WorkItem) => {
    const thumbnailUrl = w.videoUrl ? getYouTubeThumbnail(w.videoUrl) : w.thumbnail;
    const embedUrl = w.videoUrl ? getYouTubeEmbedUrl(w.videoUrl) : null;
    const isHovered = hoveredVideo === w.id;

    return (
      <div
        key={w.id}
        className={cardCls}
        onClick={() => handleProjectClick(w)}
        onKeyDown={(e) => handleKeyPress(e, w)}
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

          {/* Subtle overlay on hover - just darken slightly */}
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

  return (
    <section data-section id="our-works" className="relative overflow-hidden">
      {/* Background gradient layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-50" aria-hidden />

      <div className="container-shell flex flex-col gap-16">
        <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-display tracking-wide text-gradient-brand text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          {showcaseData.title}
        </h2>
        <div className="rounded-[2.5rem] p-8 md:p-10 bg-gradient-overlay flex flex-col gap-12 shadow-card-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {topWorks.map(w => renderProjectCard(w))}
          </div>
          {secondRow.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {secondRow.map(w => renderProjectCard(w))}
            </div>
          )}
        </div>
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

export default WorksGrid;
