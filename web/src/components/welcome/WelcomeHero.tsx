"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Play } from 'lucide-react';
import { AuthOverlay } from '@/components/auth/AuthOverlay';

interface WelcomeHeroProps {
    mode?: 'video' | 'image';
    videoId?: string; // YouTube Video ID
    imageUrl?: string;
}

export function WelcomeHero({
    mode = 'video',
    videoId = 'l_Wv6L-m_hQ', // Patagonia 4K Cinematic - Verified stable embed
    imageUrl = 'https://images.unsplash.com/photo-1571439775953-27f31131766a?auto=format&fit=crop&w=1920&q=80'
}: WelcomeHeroProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    return (
        <div className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
            <AuthOverlay isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

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
                <button
                    onClick={() => setIsAuthOpen(true)}
                    className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-full transition-all hover:scale-105"
                >
                    <span className="font-bold text-xs md:text-sm uppercase tracking-widest text-white">Iniciar Sesión</span>
                    <ChevronRight className="w-4 h-4 text-max-accent group-hover:translate-x-1 transition-transform" />
                </button>
            </nav>

            {/* --- HERO CONTENT --- */}
            <div className="relative z-10 max-w-5xl px-6 space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-4">
                    <div className="w-2 h-2 bg-max-accent rounded-full animate-pulse" />
                    Archivo Audiovisual Histórico
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] drop-shadow-2xl uppercase">
                    HISTORIAS QUE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">TRASCIENDEN</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                    Descubre el alma de la Patagonia a través de una curaduría excepcional de material histórico y contemporáneo.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
                    <button
                        onClick={() => setIsAuthOpen(true)}
                        className="w-full md:w-auto px-12 py-5 bg-max-accent hover:bg-blue-600 text-white font-black rounded-full text-lg tracking-widest transition-all hover:scale-105 shadow-[0_20px_50px_rgba(63,117,255,0.4)] flex items-center justify-center gap-3 backdrop-blur-sm group"
                    >
                        EXPLORAR ARCHIVO <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-sm text-white font-bold uppercase tracking-widest">Acceso Libre</div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Sin suscripción obligatoria</div>
                    </div>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40">
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </div>
    );
}
