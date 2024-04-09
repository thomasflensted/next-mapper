// USER TYPES
export type User = {
    id: string;
    email: string;
    password: string;
}

export type CreateUser = Omit<User, 'id'>;

export type UserDetails = {
    id: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    user_id: string;
}

export type CreateUserDetails = Omit<UserDetails, 'id'>;


// PLACE TYPES
export type Place = {
    id: string;
    name: string;
    description: string;
    lat: number;
    lng: number;
    category: PlaceCategory;
    have_been: boolean;
    map_id: string;
}

export type CreatePlace = Omit<Place, 'id'>;

// MAP TYPES
export type Map = {
    id: string;
    name: string;
    desctiption: string;
    user_id: string;
}

export type CreateMap = Omit<Map, 'id'>;


// MAP STATE TYPES
export type PlaceCategory = 'restaurant' | 'cafe' | 'museum' | 'nature' | 'sight' | 'accommodation' | 'memory' | 'other';

export type View = 'marker' | 'list';