"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface WelcomeHeroProps {
    mode?: 'video' | 'image';
    videoId?: string; // YouTube Video ID
    imageUrl?: string;
}

export function WelcomeHero({
    mode = 'video',
    videoId = 'vJ9CEXp8O04', // Patagonia 4K Cinematic - High Stability
    imageUrl = 'https://images.unsplash.com/photo-1571439775953-27f31131766a?auto=format&fit=crop&w=1920&q=80'
}: WelcomeHeroProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    return (
        <div className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
            {/* --- BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                {mode === 'video' && isMounted ? (
                    <div className="relative w-full h-full overflow-hidden">
                        <iframe
                            className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&origin=${origin}`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            // @ts-expect-error - allowtransparency is legacy but useful
                            allowtransparency="true"
                            title="Background Video"
                        />
                    </div>
                ) : (
                    <div className="relative w-full h-full opacity-60 scale-105 animate-slow-zoom">
                        <Image
                            src={imageUrl}
                            alt="Aysén Landscape"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80" />
            </div>

            {/* --- NAVBAR --- */}
            <nav className="absolute top-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
                <div className="text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-md">
                    AYSÉN<span className="text-max-accent">.DOC</span>
                </div>
                <Link href="/" className="font-bold text-sm md:text-base hover:text-white/80 transition uppercase tracking-widest drop-shadow-md">
                    Iniciar Sesión
                </Link>
            </nav>

            {/* --- HERO CONTENT --- */}
            <div className="relative z-10 max-w-5xl px-6 space-y-8 animate-fade-in-up">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none drop-shadow-2xl">
                    HISTORIAS QUE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">TRASCIENDEN</span>
                </h1>
                <p className="text-base sm:text-lg md:text-2xl text-gray-100 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                    El archivo audiovisual definitivo de la Patagonia. Naturaleza, cultura y relatos olvidados en un solo lugar.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
                    <Link
                        href="/"
                        className="w-full md:w-auto px-10 py-4 bg-max-accent hover:bg-blue-600 text-white font-bold rounded-full text-lg tracking-wide transition-all hover:scale-105 shadow-[0_0_30px_rgba(63,117,255,0.4)] flex items-center justify-center gap-3 backdrop-blur-sm"
                    >
                        INGRESAR AHORA <ChevronRight className="w-5 h-5" />
                    </Link>
                    <div className="text-sm text-gray-300 font-medium drop-shadow-md">
                        Acceso libre y gratuito.
                    </div>
                </div>
            </div>
        </div>
    );
}
