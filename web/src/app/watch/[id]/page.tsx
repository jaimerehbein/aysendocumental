import WatchView from '@/components/WatchView';
import { supabase } from '@/lib/supabaseClient';
import { normalizeMedia } from '@/lib/mediaUtils';
import { notFound } from 'next/navigation';

// Revalidar cada 60 segundos
export const revalidate = 60;

export default async function WatchPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // 1. Fetch main video
    const { data: video, error } = await supabase
        .from('videos')
        .select('*, category:categories(*)')
        .eq('id', id)
        .single();

    if (error || !video) {
        console.error("WatchPage Error - ID:", id, "Error:", error, "Data:", video);
        notFound();
    }

    const categoryName = video.category?.name || "Documental";
    const year = new Date(video.published_at).getFullYear();

    // 2. Fetch "More Like This" (Videos in same category, excluding current)
    const { data: relatedVideos } = await supabase
        .from('videos')
        .select('id, title, thumbnail_url, created_at')
        .eq('category_id', video.category?.id)
        .neq('id', id)
        .limit(4);

    // NORMALIZATION LAYER
    const normalizedVideo = normalizeMedia(video);
    const normalizedRelated = (relatedVideos || []).map(v => normalizeMedia(v));

    return (
        <WatchView
            video={{
                ...video,
                url: normalizedVideo.videoUrl,
                thumbnail_url: normalizedVideo.thumbnailUrl
            }}
            relatedVideos={normalizedRelated.map(v => ({
                id: v.id.toString(),
                title: v.title,
                thumbnail_url: v.thumbnailUrl
            }))}
            categoryName={categoryName}
            year={year}
        />
    );
}
