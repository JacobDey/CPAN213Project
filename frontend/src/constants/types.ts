export type Game = {
    aliases?: string;
    api_detail_url?: string;
    characters?: string[];
    concepts?: string[];
    date_added?: string;
    date_last_updated?: string;
    deck?: string;
    description?: string;
    developers?: string[];
    expected_release_day?: number | null;
    expected_release_month?: number | null;
    expected_release_quarter?: number | null;
    expected_release_year?: number | null;
    first_appearance_characters?: string[];
    first_appearance_concepts?: string[];
    first_appearance_locations?: string[];
    first_appearance_objects?: string[];
    first_appearance_people?: string[];
    franchises?: string[];
    genres?: string[];
    guid?: string;
    id: number;
    image?: {
        icon_url?: string;
        medium_url?: string;
        screen_url?: string;
        small_url?: string;
        super_url?: string;
        thumb_url?: string;
        tiny_url?: string;
    };
    images?: Array<{
        icon_url?: string;
        medium_url?: string;
        screen_url?: string;
        small_url?: string;
        super_url?: string;
        thumb_url?: string;
        tiny_url?: string;
    }>;
    image_tags?: string[];
    killed_characters?: string[];
    locations?: string[];
    name: string;
    number_of_user_reviews?: number;
    objects?: string[];
    original_game_rating?: string[];
    original_release_date: string;
    people?: string[];
    platforms?: string[];
    publishers?: string[];
    releases?: string[];
    dlcs?: string[];
    reviews?: string[];
    similar_games?: string[];
    site_detail_url?: string;
    themes?: string[];
    videos?: Array<{
        name: string;
        url: string;
    }>;
};

export type Rating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type Review = {
    id: number,
    gameGUID: string,
    name: string;
    date: string;
    description: string | null;
    rating: Rating;
};
