import WatchView from '@/components/WatchView';
import { supabase } from '@/lib/supabaseClient';
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
        console.error("Error fetching video:", error);
        notFound();
    }

    // @ts-ignore: Supabase types complexity
    const categoryName = video.category?.name || "Documental";
    const year = new Date(video.published_at).getFullYear();

    // 2. Fetch "More Like This" (Videos in same category, excluding current)
    // @ts-ignore
    const categoryId = video.category?.id;
    const { data: relatedVideos } = await supabase
        .from('videos')
        .select('id, title, thumbnail_url, created_at')
        .eq('category_id', categoryId)
        .neq('id', id)
        .limit(4);

    return (
        <WatchView
            video={video}
            relatedVideos={relatedVideos || []}
            categoryName={categoryName}
            year={year}
        />
    );
}
