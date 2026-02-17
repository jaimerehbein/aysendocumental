'use client';
import { motion } from 'framer-motion';
import { MovieCard, Movie } from './MovieRow';

interface Top10RowProps {
    movies: Movie[];
}

export function Top10Row({ movies }: Top10RowProps) {
    if (!movies || movies.length === 0) return null;

    const top10 = movies.slice(0, 10);

    return (
        <section className="px-6 md:px-16 py-12 relative overflow-hidden">
            <div className="flex items-end gap-4 mb-8">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                    TOP 10 <span className="text-max-accent">HOY</span>
                </h2>
                <span className="text-xs font-black text-white/30 tracking-[0.3em] uppercase mb-1">Lo más visto en la Patagonia</span>
            </div>

            <div className="flex gap-16 overflow-x-auto pb-12 scrollbar-hide snap-x px-4 items-end">
                {top10.map((movie, idx) => (
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative flex-none snap-start group"
                    >
                        {/* Numeric Indicator - HBO style */}
                        <div className="absolute -left-12 bottom-0 z-0 select-none pointer-events-none">
                            <span className="text-[180px] md:text-[220px] font-black leading-none bg-gradient-to-t from-gray-500/20 to-transparent bg-clip-text text-transparent italic stroke-white/20 stroke-1"
                                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
                                {idx + 1}
                            </span>
                        </div>

                        {/* Smart Movie Card */}
                        <div className="relative z-10">
                            <MovieCard movie={movie} variant="portrait" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
