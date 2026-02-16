'use client';
import { motion } from 'framer-motion';

const BRANDS = [
    { name: 'HBO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/1280px-HBO_logo.svg.png', color: 'from-blue-600 to-indigo-900' },
    { name: 'WARNER BROS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/1200px-Warner_Bros_logo.svg.png', color: 'from-blue-400 to-blue-600' },
    { name: 'MAX ORIGINALS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Max_logo.svg/1200px-Max_logo.svg.png', color: 'from-purple-600 to-blue-500' },
    { name: 'CARTOON NETWORK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/1200px-Cartoon_Network_2010_logo.svg.png', color: 'from-gray-100 to-gray-300' },
    { name: 'DC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/1200px-DC_Comics_logo.svg.png', color: 'from-blue-800 to-black' },
    { name: 'DISCOVERY', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Discovery_logo_2019.svg/1200px-Discovery_logo_2019.svg.png', color: 'from-blue-900 to-blue-700' },
];

// Local production entities for Aysén
const PRODUCTION_HUB = [
    { name: 'FLOR Y TRUCO', logo: '🎬', color: 'from-red-600 to-black', label: 'Producciones' },
    { name: 'TVN', logo: '📡', color: 'from-red-500 to-red-800', label: 'Archivo Histórico' },
    { name: 'MMA', logo: '🌿', color: 'from-green-500 to-blue-700', label: 'Medio Ambiente' },
    { name: 'CNTV', logo: '📺', color: 'from-blue-500 to-indigo-900', label: 'Fondo Nacional' },
    { name: 'SERNATUR', logo: '🏔️', color: 'from-orange-400 to-orange-600', label: 'Turismo Aysén' },
];

export function BrandUniverse() {
    return (
        <section className="px-6 md:px-16 py-16 overflow-hidden">
            <h2 className="text-xs font-black text-white/40 tracking-[0.5em] uppercase text-center mb-12">Universo Aysén Documental</h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {PRODUCTION_HUB.map((brand, idx) => (
                    <motion.div
                        key={brand.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300 }}
                        className="group flex flex-col items-center gap-4 cursor-pointer"
                    >
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${brand.color} p-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-max-accent/20 transition-all duration-500 relative`}>
                            <div className="absolute inset-0 rounded-full bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="w-full h-full rounded-full bg-max-black flex items-center justify-center overflow-hidden border border-white/5 relative z-10">
                                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{brand.logo}</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] md:text-xs font-black text-white tracking-widest uppercase group-hover:text-max-accent transition-colors">{brand.name}</p>
                            <p className="text-[8px] font-bold text-gray-500 tracking-widest uppercase">{brand.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
