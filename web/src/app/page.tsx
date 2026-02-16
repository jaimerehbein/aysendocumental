
import { Hero } from "@/components/ui/Hero";
import { MovieRow } from "@/components/ui/MovieRow";
import { CategoryHubs } from "@/components/ui/CategoryHubs";
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

  // 2. Select featured video
  const featuredVideo = typedCategories[0]?.videos?.[0];

  const heroProps = featuredVideo ? {
    id: featuredVideo.id,
    title: featuredVideo.title,
    description: featuredVideo.description || "",
    imageUrl: featuredVideo.thumbnail_url || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
  } : {
    id: 0,
    title: "Bienvenido a Aysén Documental",
    description: "Explora la colección audiovisual más completa de la Patagonia.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
  };

  return (
    <main className="min-h-screen bg-max-black relative">
      <Hero {...heroProps} />

      {/* Container with negative margin to overlap Hero gradient slightly if desired, or just stack */}
      <div className="relative z-20 space-y-4 pb-16">

        {/* NEW: Category Hubs (Quick Nav) */}
        <CategoryHubs />

        {/* Content Rows with Varied Layouts */}
        {typedCategories.map((cat, index) => (
          cat.videos && cat.videos.length > 0 && (
            <MovieRow
              key={cat.id}
              title={cat.name}
              // Alternate variants for visual interest:
              // Even index = Landscape (Cinematic), Odd index = Portrait (Poster)
              variant={index % 2 === 0 ? 'landscape' : 'portrait'}
              movies={cat.videos.map(v => ({
                id: v.id,
                title: v.title,
                imageUrl: v.thumbnail_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
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
