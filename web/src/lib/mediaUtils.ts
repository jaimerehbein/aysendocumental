
export interface MediaItem {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    isSeries: boolean;
    youtubeId: string | null;
}

/**
 * Extrae el ID de YouTube de cualquier formato de URL conocido.
 */
export function getYoutubeId(url: string | null | undefined): string | null {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Normaliza un objeto de video crudo de la base de datos a un MediaItem seguro.
 * Aplica fallbacks de imagen y valida campos.
 */
export function normalizeMedia(raw: any): MediaItem {
    const youtubeId = getYoutubeId(raw.url);

    // Estrategia de Thumbnail
    let thumb = raw.thumbnail_url;

    // REGLA DE ORO: Para videos de archivo, 'maxresdefault' es peligroso (3 puntos grises).
    // Forzamos 'sddefault' (Standard Definition) que siempre existe y se ve bien.
    if (thumb && thumb.includes('maxresdefault')) {
        thumb = thumb.replace('maxresdefault', 'sddefault');
    }

    // 1. Si no hay thumbnail pero hay ID de YouTube, construir URL oficial
    if (!thumb && youtubeId) {
        thumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    }

    // 2. Si la URL es local/relativa (rota), forzar YouTube o Placeholder
    if (thumb && thumb.startsWith('/')) {
        if (youtubeId) {
            thumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
        } else {
            thumb = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"; // Patagonia Fallback
        }
    }

    // 3. Fallback final si sigue null
    if (!thumb) {
        thumb = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80";
    }

    return {
        id: raw.id,
        title: raw.title || "Título Desconocido",
        description: raw.description || "",
        videoUrl: raw.url || "",
        thumbnailUrl: thumb,
        isSeries: raw.is_series || false,
        youtubeId: youtubeId
    };
}
