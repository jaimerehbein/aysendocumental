"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
// @ts-ignore
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface AysenPlayerProps {
    videoId: string;
    poster?: string;
    autoplay?: boolean;
}

export interface AysenPlayerRef {
    play: () => void;
    pause: () => void;
}

const AysenPlayer = forwardRef<AysenPlayerRef, AysenPlayerProps>(({ videoId, poster, autoplay = false }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Plyr | null>(null);

    useImperativeHandle(ref, () => ({
        play: () => {
            playerRef.current?.play();
        },
        pause: () => {
            playerRef.current?.pause();
        }
    }));

    useEffect(() => {
        if (!containerRef.current) return;

        // Destroy previous instance if it exists to avoid duplication
        if (playerRef.current) {
            playerRef.current.destroy();
        }

        // Initialize Plyr on the container (which wraps the iframe)
        playerRef.current = new Plyr(containerRef.current, {
            debug: false,
            controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "pip",
                "fullscreen",
            ],
            settings: ['quality', 'speed', 'loop'],
            // Plyr will automatically pick up YouTube settings from the iframe src
            hideControls: true,
            clickToPlay: true,
            autoplay,
            resetOnEnd: true,
            ratio: "16:9",
        });

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [autoplay]); // Re-init if these change, though mostly stable. 
    // Note: VideoID change handled by React Re-rendering the iframe, Plyr might need soft reset.
    // Ideally we'd use source API for changing videos, but for reliability we will unmount/remount key.

    return (
        <div className="w-full h-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative group feature-plyr isolate" key={videoId}>
            <div ref={containerRef} className="plyr__video-embed w-full h-full">
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?origin=${typeof window !== 'undefined' ? window.location.origin : ''}&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1&controls=0&disablekb=1`}
                    allowFullScreen
                    allow="autoplay; encrypted-media; picture-in-picture"
                    // @ts-ignore
                    allowtransparency="true"
                ></iframe>
            </div>

            {/* CSS Overlay to ensure clicks hit Plyr, not YouTube iframe */}
            <style jsx global>{`
          /* Visual Hack: Scale up to hide YouTube UI chrome */
          .feature-plyr .plyr__video-wrapper iframe {
            pointer-events: none;
            transform: scale(1.35); 
            transform-origin: center center;
            z-index: 0;
            position: relative;
          }
          
          /* Ensure Plyr controls stay on top of the transformed iframe */
          .feature-plyr .plyr__controls,
          .feature-plyr .plyr__poster,
          .feature-plyr .plyr__control--overlaid {
             z-index: 20 !important;
          }

          .feature-plyr .plyr {
             --plyr-color-main: #E50914;
             z-index: 1;
             height: 100%;
          }
       `}</style>
        </div>
    );
});

AysenPlayer.displayName = "AysenPlayer";

export default AysenPlayer;
