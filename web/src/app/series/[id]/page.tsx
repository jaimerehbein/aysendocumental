import { supabase } from "@/lib/supabaseClient";
import { normalizeMedia } from "@/lib/mediaUtils";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { BrandSeriesView } from "@/components/ui/BrandSeriesView";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SeriesPage({ params }: PageProps) {
    const { id } = await params;

    const { data: series, error } = await supabase
        .from('videos')
        .select('*, category:categories(*)')
        .eq('id', id)
        .eq('is_series', true)
        .single();

    if (error || !series) {
        console.error("SeriesPage Error - ID:", id, "Error:", error, "Data:", series);
        notFound();
    }

    const { data: episodes } = await supabase
        .from('videos')
        .select('*')
        .eq('series_id', id)
        .order('season_number', { ascending: true })
        .order('episode_number', { ascending: true });

    // NORMALIZATION LAYER
    const normalizedSeries = normalizeMedia(series);
    const normalizedEpisodes = (episodes || []).map(ep => normalizeMedia(ep));

    return (
        <main className="min-h-screen bg-max-black">
            <BrandSeriesView
                series={{
                    ...series,
                    thumbnail_url: normalizedSeries.thumbnailUrl
                }}
                episodes={normalizedEpisodes.map(ep => ({
                    id: ep.id,
                    title: ep.title,
                    description: ep.description || "",
                    thumbnail_url: ep.thumbnailUrl, // Now safe (no maxresdefault)
                    episode_number: ep.season_number || 1, // Mapping fix: normalizeMedia keeps raw but lets fallback
                    season_number: ep.season_number || 1
                }))}
            />
            <Footer />
        </main>
    );
}
