'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { MovieCard } from '@/components/ui/MovieRow';
import { Search as SearchIcon, X, Loader2, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
                .limit(20);

            if (!error && data) {
                setResults(data);
            }
            setIsLoading(false);
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <main className="min-h-screen bg-max-black pt-24 pb-12 px-6 md:px-16">
            {/* --- SEARCH HEADER --- */}
            <header className="max-w-6xl mx-auto mb-12">
                <div className="relative group">
                    <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-zinc-500 group-focus-within:text-max-accent transition-colors" />
                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Películas, series, temas..."
                        className="w-full bg-zinc-900/50 border-2 border-white/5 rounded-2xl py-6 pl-20 pr-16 text-2xl md:text-3xl font-black text-white focus:outline-none focus:border-max-accent focus:bg-zinc-900 transition-all placeholder:text-zinc-700 uppercase tracking-tighter"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-zinc-400" />
                        </button>
                    )}
                </div>
            </header>

            {/* --- RESULTS AREA --- */}
            <section className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 gap-4"
                        >
                            <Loader2 className="w-12 h-12 text-max-accent animate-spin" />
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm text-zinc-400">Buscando en el archivo...</p>
                        </motion.div>
                    ) : query.length > 0 && results.length === 0 ? (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 px-6 bg-zinc-900/20 rounded-3xl border border-white/5 backdrop-blur-sm"
                        >
                            <PlayCircle className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">No encontramos coincidencias</h2>
                            <p className="text-zinc-500 max-w-md mx-auto">Prueba con términos más generales como &apos;Aysén&apos;, &apos;Histórico&apos; o el nombre de una productora.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                        >
                            {results.map((video, idx) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <MovieCard
                                        movie={{
                                            id: video.id,
                                            title: video.title,
                                            imageUrl: video.thumbnail_url,
                                            is_series: video.is_series,
                                            url: video.url
                                        }}
                                        variant="landscape"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- EMPTY STATE (PRE-SEARCH) --- */}
                {query.length === 0 && (
                    <div className="py-12 border-t border-white/5">
                        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Búsquedas Sugeridas</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Patagonia', 'Archivo Histórico', 'Series', 'Naturaleza', 'Tehuelches'].map(term => (
                                <button
                                    key={term}
                                    onClick={() => setQuery(term)}
                                    className="px-6 py-3 rounded-full bg-zinc-900 border border-white/5 text-sm font-bold text-zinc-400 hover:text-white hover:border-max-accent transition-all"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
