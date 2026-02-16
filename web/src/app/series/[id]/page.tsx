import { supabase } from "@/lib/supabaseClient";
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

    return (
        <main className="min-h-screen bg-max-black">
            <BrandSeriesView
                series={series}
                episodes={(episodes || []).map(ep => ({
                    id: ep.id,
                    title: ep.title,
                    description: ep.description || "",
                    thumbnail_url: ep.thumbnail_url || "",
                    episode_number: ep.episode_number || 1,
                    season_number: ep.season_number || 1
                }))}
            />
            <Footer />
        </main>
    );
}
