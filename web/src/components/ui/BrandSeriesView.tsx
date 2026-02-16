'use client';

import { useState } from 'react';
import { Play, Tv, Plus, Share2, ChevronLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Episode {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    episode_number: number;
    season_number: number;
}

interface BrandSeriesViewProps {
    series: any;
    episodes: Episode[];
}

export function BrandSeriesView({ series, episodes }: BrandSeriesViewProps) {
    const [activeTab, setActiveTab] = useState<'episodes' | 'extras'>('episodes');
    const [activeSeason, setActiveSeason] = useState(1);

    const seasons = Array.from(new Set(episodes.map(ep => ep.season_number))).sort((a, b) => a - b);
    const filteredEpisodes = episodes.filter(ep => ep.season_number === activeSeason);

    return (
        <div className="min-h-screen bg-max-black">
            {/* 1. HBO Max Dynamic Hero */}
            <div className="relative h-[85vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={series.thumbnail_url}
                        alt={series.title}
                        className="w-full h-full object-cover opacity-60 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-max-black via-max-black/60 to-transparent z-[1]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-max-black via-max-black/40 to-transparent z-[1]" />
                </div>

                <div className="absolute bottom-[10%] left-0 z-10 w-full px-6 md:px-16 space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-max-accent transition-colors text-[10px] font-black tracking-[0.3em] uppercase mb-4">
                        <ChevronLeft className="w-4 h-4" /> VOLVER
                    </Link>

                    <h1 className="text-5xl md:text-8xl font-black text-white max-w-4xl tracking-tighter uppercase leading-[0.85] drop-shadow-2xl">
                        {series.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-sm font-black text-white/60 tracking-[0.2em] uppercase">
                        <span className="text-max-accent flex items-center gap-2 border border-max-accent/30 px-3 py-1 rounded-sm bg-max-accent/5">
                            <Tv className="w-4 h-4" /> SERIE ORIGINAL
                        </span>
                        <span>{episodes.length} CAPÍTULOS</span>
                        <span>•</span>
                        <span>2024</span>
                        <span>•</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-white">4K UHD</span>
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-light line-clamp-3">
                        {series.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-6">
                        <Link
                            href={episodes.length > 0 ? `/watch/${episodes[0].id}` : '#'}
                            className="bg-white text-black px-12 py-4 rounded-full font-black tracking-widest text-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-3 hover:bg-max-accent hover:text-white group"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            VER T{activeSeason}:E1
                        </Link>
                        <button className="bg-gray-800/40 text-white border border-white/10 px-8 py-4 rounded-full font-black tracking-widest text-xs backdrop-blur-xl hover:bg-white/10 transition-all">
                            <Plus className="w-4 h-4 inline mr-2" /> MI LISTA
                        </button>
                        <button className="bg-gray-800/40 text-white border border-white/10 p-4 rounded-full backdrop-blur-xl hover:bg-white/10 transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Navigation Tabs (Episodes / Extras) */}
            <div className="px-6 md:px-16 border-b border-white/10 bg-max-black/50 backdrop-blur-md sticky top-16 z-40">
                <div className="flex gap-12">
                    <button
                        onClick={() => setActiveTab('episodes')}
                        className={`py-6 text-[11px] font-black tracking-[0.3em] uppercase transition-all relative ${activeTab === 'episodes' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                    >
                        Episodios
                        {activeTab === 'episodes' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-max-accent" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('extras')}
                        className={`py-6 text-[11px] font-black tracking-[0.3em] uppercase transition-all relative ${activeTab === 'extras' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                    >
                        Extras
                        {activeTab === 'extras' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-max-accent" />}
                    </button>
                </div>
            </div>

            {/* 3. Season Switcher & Episode List */}
            <div className="px-6 md:px-16 py-16 space-y-12 mb-20">
                {activeTab === 'episodes' && (
                    <>
                        <div className="flex items-center gap-6">
                            <select
                                value={activeSeason}
                                onChange={(e) => setActiveSeason(Number(e.target.value))}
                                className="bg-max-black text-white border border-white/20 p-3 rounded-md font-black text-[11px] tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-max-accent"
                            >
                                {seasons.map(s => (
                                    <option key={s} value={s}>Temporada {s}</option>
                                ))}
                            </select>
                            <span className="text-white/40 font-black text-[10px] tracking-widest uppercase">{filteredEpisodes.length} EPISODIOS</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            <AnimatePresence mode="wait">
                                {filteredEpisodes.map((ep, idx) => (
                                    <motion.div
                                        key={ep.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link href={`/watch/${ep.id}`} className="group space-y-4 block">
                                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 border border-white/5 group-hover:border-max-accent transition-all duration-500 shadow-xl group-hover:-translate-y-2">
                                                <img
                                                    src={ep.thumbnail_url}
                                                    alt={ep.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                                                <div className="absolute bottom-3 left-3 bg-max-accent/90 px-2 py-0.5 rounded-sm font-black text-[9px] text-white tracking-widest uppercase shadow-2xl">
                                                    EP {ep.episode_number}
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                                                        <Play className="w-5 h-5 text-white fill-current" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-white font-black text-sm uppercase tracking-tight group-hover:text-max-accent transition-colors">{ep.title}</h3>
                                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-light">{ep.description}</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}

                {activeTab === 'extras' && (
                    <div className="text-center py-32 rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02]">
                        <Tv className="w-16 h-16 mx-auto mb-6 text-white/10" />
                        <p className="text-2xl font-black text-white/20 uppercase tracking-tighter">PRÓXIMAMENTE CONTENIDO EXTRA</p>
                        <p className="text-[10px] text-white/10 font-black tracking-[0.5em] mt-2 uppercase">Tráilers, Behind the Scenes y más</p>
                    </div>
                )}
            </div>
        </div>
    );
}
