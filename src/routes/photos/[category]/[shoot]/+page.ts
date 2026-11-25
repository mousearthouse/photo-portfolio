import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const response = await fetch('/api/photos');

    if (!response.ok) {
        throw error(500, 'Failed to load photos');
    }

    const allPhotos = await response.json();

    const shootingPhotos =
        allPhotos[params.category]?.[params.shooting];

    if (!shootingPhotos) {
        throw error(404, 'Shooting not found');
    }

    return {
        category: params.category,
        shooting: params.shooting,
        photos: shootingPhotos
    };
}