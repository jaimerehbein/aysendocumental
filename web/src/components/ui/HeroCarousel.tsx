'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    is_series?: boolean;
}

interface HeroCarouselProps {
    slides: Slide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-max-black">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[currentIndex].imageUrl}
                        alt={slides[currentIndex].title}
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b';
                        }}
                    />

                    {/* Cinematic Gradients - Enhanced for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-max-black/90 via-max-black/40 to-transparent z-[1]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-max-black via-transparent to-transparent z-[1]" />
                    <div className="absolute inset-0 bg-black/40 z-[0]" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-[20%] left-0 z-10 w-full px-6 md:px-16 space-y-6">
                <motion.div
                    key={`content-${currentIndex}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white max-w-4xl tracking-tighter uppercase leading-[0.95] drop-shadow-[0_10px_40px_rgba(0,0,0,1)] mb-6">
                        {slides[currentIndex].title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-lg line-clamp-3 leading-relaxed font-light mb-8">
                        {slides[currentIndex].description}
                    </p>

                    <div className="flex gap-4">
                        <Link
                            href={slides[currentIndex].is_series ? `/series/${slides[currentIndex].id}` : `/watch/${slides[currentIndex].id}`}
                            className="group flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <Play className="w-6 h-6 fill-black group-hover:fill-max-accent transition-colors" />
                            VER AHORA
                        </Link>

                        <Link
                            href={slides[currentIndex].is_series ? `/series/${slides[currentIndex].id}` : `/watch/${slides[currentIndex].id}`}
                            className="flex items-center gap-2 bg-gray-600/40 text-white border border-gray-400/30 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-600/60 transition backdrop-blur-md hover:scale-105 duration-300"
                        >
                            <Info className="w-6 h-6" />
                            MÁS INFO
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-16 z-20 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                        className={`h-1.5 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-max-accent' : 'w-4 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
}
