'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    is_series?: boolean;
}

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

            <div className="flex gap-16 overflow-x-auto pb-12 scrollbar-hide snap-x px-4">
                {top10.map((movie, idx) => (
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative flex-none snap-start group"
                    >
                        <Link
                            href={movie.is_series ? `/series/${movie.id}` : `/watch/${movie.id}`}
                            className="relative block"
                        >
                            {/* Numeric Indicator - HBO style */}
                            <div className="absolute -left-12 bottom-0 z-0 select-none">
                                <span className="text-[180px] md:text-[220px] font-black leading-none bg-gradient-to-t from-gray-500/20 to-transparent bg-clip-text text-transparent italic stroke-white/20 stroke-1"
                                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
                                    {idx + 1}
                                </span>
                            </div>

                            {/* Poster Card */}
                            <div className="relative z-10 w-[140px] md:w-[200px] aspect-[2/3] rounded-md overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 group-hover:ring-max-accent/50">
                                <img
                                    src={movie.imageUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                {/* Hover Info */}
                                <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                                    <p className="text-white font-black text-xs uppercase tracking-tight line-clamp-2">
                                        {movie.title}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
