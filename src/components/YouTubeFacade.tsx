import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  /** Short line shown over the thumbnail */
  caption?: string;
  /** Start offset in seconds */
  start?: number;
  className?: string;
}

/**
 * YouTube embed that loads the player only after a click (thumbnail + play button first).
 * Keeps the page fast and avoids third-party tracking until the visitor chooses to watch.
 */
export function YouTubeFacade({ videoId, title, caption, start, className = '' }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black ${className}`}>
      {playing ?
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen /> :


      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group absolute inset-0 w-full h-full"
        aria-label={`נגן: ${title}`}>
          <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-20 h-20 rounded-full bg-gold text-navy-dark flex items-center justify-center shadow-[0_10px_40px_-5px_#d4a853] group-hover:scale-110 transition-transform">
              <Play className="w-9 h-9 fill-navy-dark ms-1" />
            </span>
          </span>
          {caption &&
        <span className="absolute bottom-0 inset-x-0 p-4 text-right text-white font-semibold text-sm sm:text-base">
              {caption}
            </span>
        }
        </button>
      }
    </div>);

}
