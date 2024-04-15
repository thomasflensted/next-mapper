// USER TYPES
export type User = {
    id: number;
    email: string;
    password: string;
}

export type CreateUser = Omit<User, 'id'>;

export type UserDetails = {
    id: number;
    first_name: string;
    last_name: string;
    // profile_picture: string;
    user_id: number;
}

export type CreateUserDetails = Omit<UserDetails, 'id' | 'profile_picture'>;

// MAP TYPES
export type Map = {
    id: number;
    name: string;
    description: string;
    emoji: string,
    created_at: string,
    updated_at: string,
    user_id: number;
}

export type CreateMap = Omit<Map, 'id'>;

// PLACE TYPES
export type Place = {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
    category: PlaceCategory;
    have_been: boolean;
    map_id: string;
    emoji: string;
}

export type CreatePlace = Omit<Place, 'id'>;

// MAP STATE TYPES
export type PlaceCategory = 'restaurant' | 'cafe' | 'museum' | 'nature' | 'sight' | 'accommodation' | 'memory' | 'other';
export const NUMBER_OF_FILTERS = 8;

export type View = 'marker' | 'list';

export type Filter = PlaceCategory[];