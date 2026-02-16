'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Play } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    is_series?: boolean;
    url?: string; // We'll use this for the preview
}

type RowVariant = 'portrait' | 'landscape' | 'square';

interface MovieRowProps {
    title: string;
    movies: Movie[];
    variant?: RowVariant;
}

function MovieCard({ movie, cardClass }: { movie: Movie, cardClass: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isHovered) {
            timeout = setTimeout(() => {
                setShowVideo(true);
            }, 800);
        } else {
            setShowVideo(false);
            setIsVideoLoaded(false);
        }
        return () => clearTimeout(timeout);
    }, [isHovered]);

    const getYouTubeId = (url?: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(movie.url);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex-none"
        >
            <div
                className={clsx(
                    "relative block rounded-xl overflow-hidden transition-all duration-700 ease-out cursor-pointer snap-start hover:z-50 hover:scale-110 hover:shadow-[0_20px_80px_rgba(0,0,0,0.9)] ring-1 ring-white/10 hover:ring-max-accent/40 bg-max-black",
                    cardClass
                )}
            >
                <Link href={movie.is_series ? `/series/${movie.id}` : `/watch/${movie.id}`} className="absolute inset-0 z-10" />
                {/* 1. Progress Indicator (Top Bar) during hover delay */}
                {isHovered && !showVideo && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="absolute top-0 left-0 h-1 bg-max-accent z-50 shadow-[0_0_10px_#007BFF]"
                    />
                )}

                <AnimatePresence mode="wait">
                    {showVideo && videoId ? (
                        <motion.div
                            key="video-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-0 overflow-hidden"
                        >
                            {/* 2. Sophisticated Loading Shimmer (Glassmorphism) */}
                            {!isVideoLoaded && (
                                <div className="absolute inset-0 z-10 bg-max-black/40 backdrop-blur-md flex items-center justify-center">
                                    <div className="relative w-12 h-12">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-max-accent/20 border-t-max-accent rounded-full"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-4 h-4 text-max-accent fill-current animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                                </div>
                            )}

                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}&rel=0&iv_load_policy=3&vq=hd1080&autohide=1&disablekb=1&showinfo=0`}
                                className={clsx(
                                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none object-cover transition-opacity duration-1000",
                                    isVideoLoaded ? "opacity-100" : "opacity-0"
                                )}
                                allow="autoplay; encrypted-media"
                                onLoad={() => setIsVideoLoaded(true)}
                            />
                        </motion.div>
                    ) : (
                        <motion.img
                            key="image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            src={
                                movie.imageUrl?.replace('maxresdefault.jpg', 'mqdefault.jpg') ||
                                "https://images.unsplash.com/photo-1518182170546-0766ce6fec93?auto=format&fit=crop&w=600&q=80"
                            }
                            alt={movie.title}
                            className={clsx(
                                "w-full h-full object-cover transition-all duration-700 brightness-90 group-hover:brightness-110",
                                isHovered && "scale-105 blur-[2px] blur-none transition-filter"
                            )}
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80";
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Glassmorphism & Gradient Overlay */}
                <div className={clsx(
                    "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700 flex flex-col justify-end p-5 z-20",
                    showVideo && isVideoLoaded ? "opacity-40" : "opacity-90"
                )}>
                    <div className={clsx(
                        "transition-all duration-700 ease-out",
                        isHovered ? "translate-y-0" : "translate-y-4"
                    )}>
                        <div className="flex items-center gap-2 mb-1">
                            {movie.is_series && (
                                <span className="bg-max-accent text-[8px] font-black px-1.5 py-0.5 rounded text-white uppercase tracking-widest shadow-[0_0_10px_rgba(0,123,255,0.5)]">Serie</span>
                            )}
                            {showVideo ? (
                                <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-[8px] font-black px-2 py-1 rounded text-white uppercase tracking-widest flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> PREVIEW
                                </span>
                            ) : (
                                <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest group-hover:text-white/60 transition-colors">4K UHD • HDR</span>
                            )}
                        </div>
                        <p className="text-white font-extrabold text-sm md:text-lg leading-tight drop-shadow-2xl line-clamp-2 uppercase tracking-tighter transition-all group-hover:text-max-accent">
                            {movie.title}
                        </p>
                    </div>
                </div>

                {/* Shine Effect on Hover */}
                {!showVideo && isHovered && (
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full animate-shine pointer-events-none z-30" />
                )}
            </div>
        </motion.div>
    );
}

export function MovieRow({ title, movies, variant = 'landscape' }: MovieRowProps) {
    if (!movies || movies.length === 0) return null;

    const getCardDimensions = (v: RowVariant) => {
        switch (v) {
            case 'portrait':
                return 'w-[160px] md:w-[220px] aspect-[2/3]';
            case 'square':
                return 'w-[160px] md:w-[220px] aspect-square';
            case 'landscape':
            default:
                return 'w-[220px] md:w-[320px] aspect-video';
        }
    };

    const cardClass = getCardDimensions(variant);
    const rowId = title.toLowerCase().includes('series') ? 'series' : title.toLowerCase().split(' ')[0];
    const displayTitle = title.replace('Series: ', '');

    return (
        <section id={rowId} className="px-6 md:px-16 py-8 space-y-4">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-black text-white hover:text-max-accent transition cursor-pointer mb-2 flex items-center gap-3 group uppercase tracking-tighter"
            >
                <div className="w-1.5 h-8 bg-max-accent rounded-full transition-all group-hover:h-10" />
                {displayTitle}
                <span className="text-[10px] text-max-accent/40 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 font-black tracking-[0.3em] ml-2">VER TODO</span>
            </motion.h2>

            <div className="relative group/row">
                <div className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide snap-x px-1 pt-2">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} cardClass={cardClass} />
                    ))}
                </div>
            </div>
        </section>
    );
}
