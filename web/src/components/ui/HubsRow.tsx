
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const hubs = [
    { id: 'aysen', name: 'Aysén', logo: '/assets/cinema/logo_aysen.png', color: 'from-blue-600 to-blue-900' },
    { id: 'atlas', name: 'Atlas', logo: '/assets/cinema/logo_atlas.png', color: 'from-zinc-700 to-zinc-900' },
    { id: 'pioneros', name: 'Pioneros', logo: '/assets/cinema/logo_pioneros.png', color: 'from-amber-700 to-amber-900' },
    { id: 'naturaleza', name: 'Naturaleza', logo: '/assets/cinema/logo_naturaleza.png', color: 'from-emerald-700 to-emerald-900' },
    { id: 'historia', name: 'Historia', logo: '/assets/cinema/logo_historia.png', color: 'from-red-800 to-red-950' },
];

export const HubsRow = () => {
    return (
        <section className="py-8 px-6 md:px-16 overflow-hidden">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-zinc-800" /> Universos Aysén
            </h2>

            <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-4 no-scrollbar">
                {hubs.map((hub, index) => (
                    <motion.div
                        key={hub.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={`/category/${hub.id}`}
                            className="relative group flex flex-col items-center gap-3"
                        >
                            <div className={`w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${hub.color} p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:shadow-max-accent/20 transition-all duration-500`}>
                                <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-white/30 transition-all">
                                    {/* Hub Name as initial or logo if available */}
                                    <span className="text-xl md:text-3xl font-black text-white italic group-hover:scale-110 transition-transform">
                                        {hub.name.substring(0, 1)}
                                    </span>
                                </div>

                                {/* Inner Ring Glow */}
                                <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-max-accent/40 transition-all duration-700 pointer-events-none" />
                            </div>

                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                                {hub.name}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
