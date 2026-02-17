
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { MovieRow } from "@/components/ui/MovieRow";
import { HubsRow } from "@/components/ui/HubsRow";
import { Top10Row } from "@/components/ui/Top10Row";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabaseClient";
import { CategoryWithVideos } from "@/types/database";
import { normalizeMedia } from "@/lib/mediaUtils";

// Forced revalidation for deployment V4
export const revalidate = 0;

export default async function Home() {
  // 1. Fetch categories with their videos
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*, videos(*)')
    .order('id');

  if (error) {
    console.error("Error fetching categories:", error);
  }
  const typedCategories = (categories as CategoryWithVideos[]) || [];

  // 2. Select Featured Videos for Carousel (ROBUST & NORMALIZED)
  const featuredSlides = typedCategories
    .flatMap(c => c.videos || [])
    .filter(v => v.is_series === true || v.title.includes('1940') || v.title.includes('Trapananda') || v.title.includes('Atlas'))
    .slice(0, 5)
    .map(v => normalizeMedia(v)) // Sanitización Centralizada
    .map(v => ({
      id: v.id,
      title: v.title,
      description: v.description,
      imageUrl: v.thumbnailUrl, // Thumbnail garantizado por normalizeMedia
      is_series: v.isSeries,
      youtubeId: v.youtubeId // NEW: Passed for video background
    }));

  return (
    <main className="min-h-screen bg-max-black relative overflow-x-hidden">
      <HeroCarousel slides={featuredSlides} />

      {/* ... (HubsRow y Top10Row igual) ... */}
      <div className="relative z-20 space-y-12 pb-24 -mt-10" id="deployment-marker-v5">

        {/* ... (HubsRow) ... */}
        <HubsRow />
        <Top10Row movies={featuredSlides} />

        {/* Content Rows with Varied Layouts */}
        {typedCategories.map((cat, index) => (
          cat.videos && cat.videos.length > 0 && (
            <MovieRow
              key={cat.id}
              title={cat.name}
              variant={cat.name.toLowerCase().includes('series') ? 'portrait' : 'landscape'}
              movies={cat.videos.map(v => normalizeMedia(v)).map(m => ({
                id: m.id,
                title: m.title,
                imageUrl: m.thumbnailUrl,
                is_series: m.isSeries,
                url: m.videoUrl,
                youtubeId: m.youtubeId // NEW: Explicit pass for Smart Cards
              }))}
            />
          )
        ))}

        {typedCategories.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <p>No hay contenido disponible aún.</p>
          </div>
        )}
      </div>

      {/* NEW: Professional Footer */}
      <Footer />
    </main>
  );
}
