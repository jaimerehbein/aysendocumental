
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
}

type RowVariant = 'portrait' | 'landscape' | 'square';

interface MovieRowProps {
    title: string;
    movies: Movie[];
    variant?: RowVariant;
}

export function MovieRow({ title, movies, variant = 'landscape' }: MovieRowProps) {
    if (!movies || movies.length === 0) return null;

    // Define dimensions based on variant
    const getCardDimensions = (v: RowVariant) => {
        switch (v) {
            case 'portrait':
                return 'w-[160px] md:w-[220px] aspect-[2/3]';
            case 'square':
                return 'w-[160px] md:w-[220px] aspect-square';
            case 'landscape':
            default:
                return 'w-[220px] md:w-[320px] aspect-video';
        }
    };

    const cardClass = getCardDimensions(variant);

    return (
        <div className="px-6 md:px-16 py-8 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-100 hover:text-white transition cursor-pointer mb-2 flex items-center gap-2 group">
                {title}
                <span className="text-sm text-max-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">Explorar todo &gt;</span>
            </h2>
            <div className="group relative">
                <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x px-1">
                    {movies.map((movie) => (
                        <div className={clsx("relative flex-none rounded-md overflow-hidden transition-all duration-300 ease-out cursor-pointer snap-start hover:z-20 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,43,73,0.6)] hover:ring-2 hover:ring-max-accent", cardClass)}>
                            <img
                                src={movie.imageUrl || "https://images.unsplash.com/photo-1518182170546-0766ce6fec93?auto=format&fit=crop&w=600&q=80"}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:brightness-110"
                                loading="lazy"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white font-bold text-sm drop-shadow-md truncate w-full">{movie.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
