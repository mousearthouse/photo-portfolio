import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const response = await fetch('/api/photos');

    if (!response.ok) {
        throw error(500, 'Failed to load photos');
    }

    const shooting = allPhotos[params.category]?.shootings?.[params.shooting];

    if (!shooting) {
        throw error(404, 'Shooting not found');
    }

    return {
        category: params.category,
        shooting: shooting.title,
        photos: shooting.photos
    };
}