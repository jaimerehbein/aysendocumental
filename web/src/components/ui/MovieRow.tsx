'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Volume2, VolumeX, PlayCircle } from 'lucide-react';

export interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    is_series?: boolean;
    url?: string;
    youtubeId?: string | null; // ID limpio
}

export type RowVariant = 'portrait' | 'landscape' | 'square';

interface MovieRowProps {
    title: string;
    movies: Movie[];
    variant?: RowVariant;
}

export function MovieCard({ movie, variant = 'landscape' }: { movie: Movie, variant?: RowVariant }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    // Estrategia de "Smart Hover":
    // 1. Hover inmediato: Zoom suave + Metadata.
    // 2. 800ms: Carga video en background.
    // 3. Cuando video carga: Fade in suave (sin spinner negro).
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isHovered && movie.youtubeId) {
            timeout = setTimeout(() => {
                setShowVideo(true);
            }, 800);
        } else {
            setShowVideo(false);
            setIsVideoLoaded(false);
        }
        return () => clearTimeout(timeout);
    }, [isHovered, movie.youtubeId]);

    // Use passed ID or fallback to extraction (should generally use passed)
    const videoId = movie.youtubeId || (movie.url?.match(/v=([^&]+)/)?.[1]);

    // OPTIMIZACIÓN DE ENCUADRE VERTICAL
    // Las miniaturas verticales sufren con 16:9. Usamos un object-position específico
    // o forzamos el uso de sddefault (4:3) que llena mejor el vertical.
    const imageClass = clsx(
        "w-full h-full object-cover transition-all duration-700 ease-in-out",
        isHovered ? "scale-110 brightness-110" : "scale-100 brightness-90",
        variant === 'portrait' ? "object-center" : "object-center" // Ajustar si es necesario
    );

    return (
        <motion.div
            className={clsx(
                "relative flex-none bg-max-black rounded-lg overflow-hidden cursor-pointer group transition-all duration-500",
                // Dimensiones exactas para cada variante
                variant === 'portrait' ? 'w-36 md:w-56 aspect-[2/3]' : 'w-60 md:w-80 aspect-video',
                // Hover effect transform
                "hover:z-50 hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:ring-2 hover:ring-white/20"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={movie.is_series ? `/series/${movie.id}` : `/watch/${movie.id}`} className="absolute inset-0 z-50" />

            {/* 1. BASE IMAGE LAYER (Siempre visible hasta que video tape) */}
            <div className="absolute inset-0 z-0 bg-zinc-900">
                <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className={imageClass}
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Fallback cascada
                        if (target.src.includes('maxresdefault')) target.src = target.src.replace('maxresdefault', 'sddefault');
                        else if (target.src.includes('sddefault')) target.src = target.src.replace('sddefault', 'hqdefault');
                        else target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80";
                    }}
                />

                {/* Overlay de gradiente permanente para legibilidad de texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
            </div>

            {/* 2. VIDEO LAYER (Cinematic Fade) */}
            <AnimatePresence>
                {showVideo && videoId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-10 bg-black"
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1`}
                            className={clsx(
                                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none object-cover transition-opacity duration-1000",
                                isVideoLoaded ? "opacity-90" : "opacity-0" // Opacity 90 for cinematic feel
                            )}
                            allow="autoplay; encrypted-media"
                            onLoad={() => setIsVideoLoaded(true)}
                        />
                        {/* Mute toggle (z-60 to be clickable above Link if needed, but simple Link cover is usually better UI for cards) */}
                        {/* Actually, user clicks card to watch. Mute toggle on hover card is fiddly. Let's keep it clean. */}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. METADATA LAYER (Interactive) */}
            <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end">
                {/* Mini Badges */}
                <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {movie.is_series && (
                        <span className="text-[9px] font-black bg-white text-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Serie
                        </span>
                    )}
                    <span className="text-[9px] font-bold text-white/80 border border-white/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        HD
                    </span>
                    {/* Play icon indicator */}
                    <PlayCircle className="w-4 h-4 text-white ml-auto" />
                </div>

                {/* Title */}
                <h3 className={clsx(
                    "font-black text-white leading-tight uppercase transition-all duration-300",
                    variant === 'portrait' ? "text-sm md:text-base" : "text-sm md:text-xl",
                    isHovered ? "text-max-accent translate-y-0" : "text-gray-100 translate-y-1"
                )}>
                    {movie.title}
                </h3>
            </div>

            {/* 4. HOVER BORDER (Active State) */}
            <div className={clsx(
                "absolute inset-0 border-2 rounded-lg pointer-events-none transition-colors duration-300 z-30",
                isHovered ? "border-max-accent/50" : "border-transparent"
            )} />
        </motion.div>
    );
}

export function MovieRow({ title, movies, variant = 'landscape' }: MovieRowProps) {
    if (!movies || movies.length === 0) return null;

    const rowId = title.toLowerCase().replace(/\s+/g, '-');
    const displayTitle = title.replace('Series: ', '');

    return (
        <section className="mb-8 md:mb-12 relative z-10 space-y-4 px-6 md:px-16" id={rowId}>
            <div className="flex items-baseline justify-between mb-4 px-1">
                <h2 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 group cursor-pointer">
                    <div className="w-1 h-6 bg-max-accent rounded-full group-hover:h-8 transition-all duration-300" />
                    <span className="group-hover:text-max-accent transition-colors duration-300">{displayTitle}</span>
                </h2>
            </div>

            {/* Scroll Container */}
            <div className="group/slider relative">
                <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x px-1 min-h-[200px] items-center">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} variant={variant} />
                    ))}
                </div>

                {/* Fade Edges */}
                <div className="absolute top-0 right-0 bottom-8 w-20 bg-gradient-to-l from-max-black to-transparent pointer-events-none z-20" />
            </div>
        </section>
    );
}
