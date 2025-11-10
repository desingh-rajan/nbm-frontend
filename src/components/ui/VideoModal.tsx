'use client'

import React, { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Convert video URL to embed format
  const getEmbedUrl = (url: string) => {
    try {
      // Instagram Reel format:
      // https://www.instagram.com/reel/REEL_ID/
      if (url.includes('instagram.com/reel/')) {
        const reelId = url.split('/reel/')[1]?.split('/')[0];
        if (reelId) {
          return `https://www.instagram.com/reel/${reelId}/embed`;
        }
      }

      // YouTube URL formats:
      // https://www.youtube.com/watch?v=VIDEO_ID
      // https://youtu.be/VIDEO_ID
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';

        if (url.includes('youtube.com/watch')) {
          const urlObj = new URL(url);
          videoId = urlObj.searchParams.get('v') || '';
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
        }

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
      }

      return url;
    } catch (e) {
      console.error('Error parsing video URL:', e);
      return url;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl mx-4 bg-[var(--color-bg)] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)] truncate pr-4">
            {title || 'Video Player'}
          </h3>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-[var(--color-bg-muted)] flex items-center justify-center transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            aria-label="Close video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            title={title || 'Video'}
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-[var(--color-bg-muted)] text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Click outside or press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
