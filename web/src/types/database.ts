export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Video {
    id: number;
    title: string;
    description: string | null;
    url: string;
    thumbnail_url: string | null;
    category_id: number | null;
    published_at: string;
    created_at: string;
    // New fields for series
    is_series: boolean;
    series_id: number | null;
    season_number: number | null;
    episode_number: number | null;
    // Joins
    category?: Category;
    tags?: Tag[];
}

export interface CategoryWithVideos extends Category {
    videos: Video[];
}
