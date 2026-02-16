import Link from 'next/link';
import { Mountain, BookOpen, Film, Landmark, Microscope, Layers, Scissors } from 'lucide-react';

const HUBS = [
    { id: 'naturaleza', label: 'NATURALEZA', icon: Mountain, color: 'from-emerald-900 via-green-900/40 to-black' },
    { id: 'historia', label: 'HISTORIA', icon: BookOpen, color: 'from-amber-900 via-yellow-900/40 to-black' },
    { id: 'cultura', label: 'CULTURA', icon: Landmark, color: 'from-rose-900 via-red-900/40 to-black' },
    { id: 'cortometrajes', label: 'CORTOS', icon: Scissors, color: 'from-indigo-900 via-blue-900/40 to-black' },
    { id: 'series', label: 'SERIES', icon: Layers, color: 'from-violet-900 via-purple-900/40 to-black' },
    { id: 'cine', label: 'CINE', icon: Film, color: 'from-zinc-800 via-zinc-900/40 to-black' },
];

export function CategoryHubs() {
    return (
        <div className="px-6 md:px-16 py-16 relative z-10">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <h2 className="text-xs font-black text-white/40 tracking-[0.5em] uppercase text-center uppercase">Explora por Categoría</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {HUBS.map((hub) => (
                    <Link
                        key={hub.id}
                        href={`#${hub.id}`}
                        className="group relative h-28 md:h-36 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl"
                    >
                        {/* Background Gradient & Pattern */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${hub.color} group-hover:scale-125 transition-transform duration-1000`} />
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px]" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                            <div className="p-3 rounded-full bg-white/5 backdrop-blur-md group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500 ring-1 ring-white/10">
                                <hub.icon className="w-6 h-6 text-white group-hover:text-max-accent transition-colors" />
                            </div>
                            <span className="text-[10px] md:text-xs font-black text-white tracking-[0.3em] uppercase drop-shadow-2xl">
                                {hub.label}
                            </span>
                        </div>

                        {/* Hover Shine */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
