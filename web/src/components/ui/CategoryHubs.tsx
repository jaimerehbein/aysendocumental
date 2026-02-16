
import Link from 'next/link';
import { Mountain, BookOpen, Film, Landmark, Microscope } from 'lucide-react';

const HUBS = [
    { id: 'naturaleza', label: 'NATURALEZA', icon: Mountain, color: 'from-green-900/80 to-black' },
    { id: 'historia', label: 'HISTORIA', icon: BookOpen, color: 'from-amber-900/80 to-black' },
    { id: 'cultura', label: 'CULTURA', icon: Landmark, color: 'from-red-900/80 to-black' },
    { id: 'ciencia', label: 'CIENCIA', icon: Microscope, color: 'from-blue-900/80 to-black' },
    { id: 'cine', label: 'CINE', icon: Film, color: 'from-purple-900/80 to-black' },
];

export function CategoryHubs() {
    return (
        <div className="px-6 md:px-16 py-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-6">Explora por Categoría</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {HUBS.map((hub) => (
                    <Link
                        key={hub.id}
                        href={`#${hub.id}`} // En el futuro podría ser una página /category/[slug]
                        className="group relative h-24 md:h-32 rounded-lg overflow-hidden border border-gray-800 hover:border-white/50 transition duration-300"
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${hub.color} group-hover:scale-110 transition-transform duration-500`} />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <hub.icon className="w-8 h-8 text-white drop-shadow-lg group-hover:scale-110 transition duration-300" />
                            <span className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-md">
                                {hub.label}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
