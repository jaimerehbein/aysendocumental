"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Info } from 'lucide-react';
import AysenPlayer, { AysenPlayerRef } from '@/components/AysenPlayer';

interface Video {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail_url: string | null;
    created_at: string;
    published_at: string;
}

interface RelatedVideo {
    id: string;
    title: string;
    thumbnail_url: string | null;
}

interface WatchViewProps {
    video: Video;
    relatedVideos: RelatedVideo[];
    categoryName: string;
    year: number;
}

// Fallback image for missing thumbnails (Aysén landscape)
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518182170546-0766ce6fec93?q=80&w=2600&auto=format&fit=crop';

export default function WatchView({ video, relatedVideos, categoryName, year }: WatchViewProps) {
    const playerRef = useRef<AysenPlayerRef>(null);

    const handlePlay = () => {
        if (playerRef.current) {
            playerRef.current.play();
            // Optional: Smooth scroll to player if needed
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Extract Video ID logic
    let videoId = video.url;
    if (video.url && video.url.includes('v=')) {
        videoId = video.url.split('v=')[1]?.split('&')[0];
    } else if (video.url && video.url.includes('youtu.be')) {
        videoId = video.url.split('/').pop() || videoId;
    }

    return (
        <div className="min-h-screen bg-netflix-black text-white">
            <nav className="fixed top-0 w-full z-50 p-6 flex items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition pointer-events-auto group">
                    <div className="bg-black/50 p-2 rounded-full group-hover:bg-netflix-red transition">
                        <ArrowLeft className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg shadow-black drop-shadow-md">Volver al catálogo</span>
                </Link>
            </nav>

            <div className="pt-24 px-4 md:px-16 max-w-7xl mx-auto space-y-12 pb-20">
                {/* Prop: Hero Video Player */}
                <section>
                    <AysenPlayer
                        ref={playerRef}
                        videoId={videoId}
                        autoplay={true}
                        poster={video.thumbnail_url || DEFAULT_IMAGE}
                    />
                </section>

                <div className="grid md:grid-cols-[2fr_1fr] gap-12">
                    {/* Left Column: Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-5xl font-bold">{video.title}</h1>
                            <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                                <span className="text-green-500 text-base">98% Match</span>
                                <span>{year}</span>
                                <span className="border border-gray-600 px-2 rounded text-xs bg-gray-800">HD</span>
                                <span>{categoryName}</span>
                            </div>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                            {video.description}
                        </p>

                        <div className="flex gap-4 pt-4">
                            {/* Functional Play Button */}
                            <button
                                onClick={handlePlay}
                                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition"
                            >
                                <Play className="w-5 h-5 fill-black" />
                                <span>Reproducir</span>
                            </button>
                            <button className="flex items-center gap-2 bg-gray-600/70 text-white px-6 py-2 rounded font-bold hover:bg-gray-600/50 transition">
                                <Info className="w-5 h-5" />
                                <span>Más Información</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Details & Tags */}
                    <div className="bg-neutral-900/50 p-6 rounded-lg h-fit border border-neutral-800">
                        <h3 className="text-gray-500 font-medium mb-4 text-sm uppercase tracking-wide">Detalles del Título</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-500">Género:</span>
                                <span className="text-white hover:underline cursor-pointer">{categoryName}</span>
                            </li>
                            <li className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-500">Región:</span>
                                <span className="text-white">Aysén, Patagonia</span>
                            </li>
                            <li className="grid grid-cols-[100px_1fr]">
                                <span className="text-gray-500">Agregado:</span>
                                <span className="text-white">{new Date(video.created_at).toLocaleDateString()}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* "More Like This" Section */}
                {relatedVideos && relatedVideos.length > 0 && (
                    <section className="border-t border-gray-800 pt-10">
                        <h3 className="text-2xl font-bold mb-6">Más títulos similares</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedVideos.map((relVideo) => (
                                <Link key={relVideo.id} href={`/watch/${relVideo.id}`} className="group relative aspect-video bg-neutral-800 rounded-md overflow-hidden cursor-pointer">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition transform group-hover:scale-110 duration-500"
                                        style={{ backgroundImage: `url(${relVideo.thumbnail_url || DEFAULT_IMAGE})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-4 text-center">
                                        <div className="bg-white rounded-full p-2 mb-2 scale-0 group-hover:scale-100 transition delay-100">
                                            <Play className="w-6 h-6 text-black fill-black pl-1" />
                                        </div>
                                        <h4 className="font-bold text-sm">{relVideo.title}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
