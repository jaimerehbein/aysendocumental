
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { MovieRow } from "@/components/ui/MovieRow";
import { HubsRow } from "@/components/ui/HubsRow";
import { Top10Row } from "@/components/ui/Top10Row";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabaseClient";
import { CategoryWithVideos } from "@/types/database";

// Revalidar cada 60 segundos (Incremental Static Regeneration)
export const revalidate = 60;

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

  // 2. Select Featured Videos for Carousel
  // We prioritize series containers and some top standalone documentaries
  const featuredSlides = typedCategories
    .flatMap(c => c.videos || [])
    .filter(v => v.is_series === true || v.title.includes('1940') || v.title.includes('Trapananda') || v.title.includes('Atlas'))
    .slice(0, 5)
    .map(v => ({
      id: v.id,
      title: v.title,
      description: v.description || "Explora la profundidad de la Patagonia a través de este registro único.",
      imageUrl: v.thumbnail_url || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      is_series: v.is_series
    }));

  return (
    <main className="min-h-screen bg-max-black relative overflow-x-hidden">
      <HeroCarousel slides={featuredSlides} />

      {/* Container with spacing for the sticky navbar and overall flow */}
      <div className="relative z-20 space-y-12 pb-24 -mt-10">

        {/* NEW: Circular Hubs (HBO Max Style) */}
        <HubsRow />

        {/* TOP 10 SECTION */}
        <Top10Row movies={featuredSlides} />

        {/* Content Rows with Varied Layouts */}
        {typedCategories.map((cat, index) => (
          cat.videos && cat.videos.length > 0 && (
            <MovieRow
              key={cat.id}
              title={cat.name}
              variant={cat.name.toLowerCase().includes('series') ? 'portrait' : 'landscape'}
              movies={cat.videos.map(v => ({
                id: v.id,
                title: v.title,
                imageUrl: v.thumbnail_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
                is_series: v.is_series,
                url: v.url
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
