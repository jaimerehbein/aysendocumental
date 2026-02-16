
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';

interface HeroProps {
    id?: number;
    title: string;
    description: string;
    imageUrl: string;
}

export function Hero({ id = 1, title, description, imageUrl }: HeroProps) {
    return (
        <div className="relative h-[85vh] w-full overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Max Style Gradients: Vignette + Bottom Fade + Left Shade */}
                <div className="absolute inset-0 bg-gradient-to-r from-max-black via-max-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-max-black via-max-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[image:var(--image-gradient-vignette)] mix-blend-multiply" />
            </div>

            <div className="absolute bottom-[20%] left-0 z-10 w-full px-6 md:px-16 space-y-6 animate-fade-in-up">
                {/* Max uses bold, tracking-wide headers */}
                <h1 className="text-4xl md:text-7xl font-extrabold text-white max-w-3xl drop-shadow-2xl tracking-tight leading-tight">
                    {title}
                </h1>

                <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md line-clamp-3 leading-relaxed font-light">
                    {description}
                </p>

                <div className="flex gap-4 pt-4">
                    {/* Primary Action: Gradient/White Pill Button */}
                    <Link
                        href={`/watch/${id}`}
                        className="group flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        <Play className="w-6 h-6 fill-black group-hover:fill-max-accent transition-colors" />
                        VER AHORA
                    </Link>

                    {/* Secondary Action: Ghost Pill Button with Blur */}
                    <button className="flex items-center gap-2 bg-gray-600/40 text-white border border-gray-400/30 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-600/60 transition backdrop-blur-md hover:scale-105 duration-300">
                        <Info className="w-6 h-6" />
                        MÁS INFO
                    </button>
                </div>
            </div>
        </div>
    );
}
