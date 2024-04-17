import { Place } from "@/app/lib/definitions"
import { Map } from "@/app/lib/definitions"

type PartialPlace = Omit<Place, 'have_been' | 'map_id'>;

export const examplePlaces: PartialPlace[] = [
    {
        id: '1',
        name: 'Via Carota',
        category: 'restaurant',
        description: "Their insalate verde 🤤 To die for! Been too many times to count.",
        lat: -74,
        lng: 40,
    },
    {
        id: '2',
        name: 'Banff National Park',
        category: 'nature',
        description: "Was here with mom and dad back in 2014. Still thinking of the beauty. Gotta go back some day!",
        lat: -116,
        lng: 51,
    },
    {
        id: '3',
        name: 'Where I met Mateo ❤️',
        category: 'memory',
        description: "Where I met Mateo for the first time when some of his friends and some of mine struck up a conversation on a lovely summer night. Want to go back with him.",
        lat: -75, lng: 6,
    },
    {
        id: '4',
        name: 'Best breakfast ever!',
        category: 'restaurant',
        description: "Such a good breakfast! Anne and I were here on our long trip in 2023. Loved the zucchini hash brown. Wanna go back. Place is called benedict Café.",
        lat: 76.94376,
        lng: 43.26001,
    },
    {
        id: '5',
        name: 'Spirited Away in real life',
        category: 'sight',
        description: "Place with a lot of restaurants and a tower in middle from where you can overlook Osaka in its entirety. The place feels like walking around the fantasy world in Spirited Away.",
        lat: 135.50632,
        lng: 34.65255,
    },
    {
        id: '6',
        name: 'Authentic coffee ☕️',
        category: 'cafe',
        description: "Real ethiopian coffee. Busy and feels very real. Get a macchiato like the locals!",
        lat: 38.75077,
        lng: 9.03084,
    },
    {
        id: '7',
        name: 'Chiltern Firehouse',
        category: 'accommodation',
        description: "Probably the best hotel I've stayed at. Expensive, but worth it. Gotta splurge once in a while, right?",
        lat: -0.15499,
        lng: 51.51863,
    },
    {
        id: '8',
        name: 'Best Art Museum?',
        category: 'museum',
        description: "Visited with mom and dad back in 2012. Remember it as the first time art really 'clicked' for me. Gotta go back to explore again.",
        lat: 151.21735,
        lng: -33.86887,
    },
    {
        id: '9',
        name: 'Skeleton Coast',
        category: 'nature',
        description: "Wild place. Still thinking of that time we explored this national park in 70-series Landcruiser. What a dream.",
        lat: 12.79347,
        lng: -19.26697,
    },
    {
        id: '10',
        name: 'Magical city',
        category: 'sight',
        description: "Saw some videos of this city on Instagram. Looked like Prince of Persia in real life. Really want to go one day.",
        lat: 54.35674,
        lng: 31.89087,
    },
    {
        id: '11',
        name: 'Timbuktu!',
        category: 'memory',
        description: "Feel lucky to have visited this place. Felt like going back in time.",
        lat: -3.00803,
        lng: 16.77432,
    },
    {
        id: '12',
        name: 'Great Coffee',
        category: 'cafe',
        description: "Peter recommended this place after he'd been to Buenos Aires. Should be great.",
        lat: -58.45583,
        lng: -34.55460,
    },
]

type PartialMap = Omit<Map, 'user_id' | 'created_at' | 'updated_at'>;

export const exampleMaps: PartialMap[] = [
    { id: 1, name: "Best CPH Restaurants", description: 'Best culinary experiences I had in Copenhagen.', emoji: '🍽️' },
    { id: 2, name: "Amazing Nature", description: "Seen in real life or online.", emoji: '🌲' },
    { id: 3, name: "Cofee Shops", description: 'Cute coffee shops I stumbled upon.', emoji: '☕' },
    { id: 4, name: "Memories", description: 'Never forget these.', emoji: '🧠' },
    { id: 5, name: "My Favorite Museums", description: 'Inspiring art and history.', emoji: '🖼️' },
    { id: 6, name: "Sights That Are Worth It", description: 'Statue Of Liberty, go home.', emoji: '🗼' },
    { id: 7, name: "Cute Hotels I Found", description: 'From quaint to extravagant.', emoji: '🏨' },
    { id: 8, name: "Best Burgers", description: "Traditional and veggie.", emoji: '🍔' },
]
