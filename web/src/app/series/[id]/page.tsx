import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import { Play, ChevronLeft, Calendar, Clock, Tv } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

interface PageProps {
    params: { id: string };
}

export default async function SeriesPage({ params }: PageProps) {
    const { id } = params;

    // 1. Fetch Series Parent Metadata
    const { data: series, error } = await supabase
        .from('videos')
        .select('*, category:categories(*)')
        .eq('id', id)
        .eq('is_series', true)
        .single();

    if (error || !series) {
        console.error("Error fetching series:", error);
        notFound();
    }

    // 2. Fetch Episodes for this series
    const { data: episodes } = await supabase
        .from('videos')
        .select('*')
        .eq('series_id', id)
        .order('episode_number', { ascending: true });

    const episodesList = episodes || [];

    return (
        <main className="min-h-screen bg-max-black">
            {/* 1. Series Hero Section (HBO Max Style) */}
            <div className="relative h-[72vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={series.thumbnail_url || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"}
                        alt={series.title}
                        className="w-full h-full object-cover opacity-60"
                        style={{ objectPosition: 'center 20%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-max-black via-max-black/40 to-transparent z-[1]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-max-black via-max-black/20 to-transparent z-[1]" />
                </div>

                <div className="absolute bottom-12 left-0 z-10 w-full px-6 md:px-16 space-y-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition group mb-4 text-xs font-black tracking-widest">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        VOLVER AL INICIO
                    </Link>

                    <h1 className="text-4xl md:text-7xl font-black text-white max-w-4xl tracking-tighter uppercase leading-[0.9]">
                        {series.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-black text-max-accent tracking-[0.2em] uppercase mb-4">
                        <span className="flex items-center gap-2 border border-max-accent/30 px-2 py-0.5 rounded"><Tv className="w-3 h-3" /> SERIE ORIGINAL</span>
                        <span className="text-gray-700">•</span>
                        <span>{episodesList.length} EPISODIOS</span>
                        <span className="text-gray-700">•</span>
                        <span>4K Ultra HD</span>
                    </div>

                    <p className="text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed font-medium line-clamp-3">
                        {series.description}
                    </p>

                    <div className="flex gap-4 pt-6">
                        <Link
                            href={episodesList.length > 0 ? `/watch/${episodesList[0].id}` : '#'}
                            className="bg-white text-black px-10 py-4 rounded-full font-black tracking-widest text-xs hover:scale-105 transition-transform duration-300 shadow-2xl flex items-center gap-2 hover:bg-max-accent hover:text-white"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            REPRODUCIR T1:E1
                        </Link>

                        <button className="bg-gray-800/60 text-white border border-gray-700 px-6 py-4 rounded-full font-black tracking-widest text-xs backdrop-blur-md hover:bg-gray-700/80 transition shadow-xl">
                            AÑADIR A MI LISTA
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Episode List Section */}
            <div className="px-6 md:px-16 py-12 bg-max-black relative z-20">
                <div className="flex items-center justify-between mb-12 border-b border-gray-800 pb-6">
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter flex items-center gap-4">
                        EPISODIOS
                        <span className="text-gray-600 font-bold text-xs uppercase tracking-[0.3em] bg-gray-900 px-3 py-1 rounded">
                            Temporada 1
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {episodesList.map((ep) => (
                        <Link
                            key={ep.id}
                            href={`/watch/${ep.id}`}
                            className="group flex flex-col gap-4"
                        >
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-900">
                                <img
                                    src={ep.thumbnail_url?.replace('maxresdefault.jpg', 'mqdefault.jpg') || "https://images.unsplash.com/photo-1548682855-f71bb4809e08"}
                                    alt={ep.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                        <Play className="w-5 h-5 text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-2 left-2 bg-max-accent px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-tighter">
                                    E{ep.episode_number}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-white text-sm md:text-base font-bold group-hover:text-max-accent transition-colors leading-tight">
                                    {ep.title}
                                </h3>
                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-medium">
                                    {ep.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {episodesList.length === 0 && (
                    <div className="text-center py-24 text-gray-800 border-2 border-dashed border-gray-900 rounded-3xl">
                        <Tv className="w-16 h-16 mx-auto mb-4 opacity-10" />
                        <p className="text-xl font-bold tracking-tight opacity-20">ESTA TEMPORADA AÚN NO TIENE EPISODIOS DISPONIBLES</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
