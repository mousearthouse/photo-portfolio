
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const response = await fetch('/api/photos');

    if (!response.ok) {
        throw error(500, 'Failed to load photos');
    }

    const allPhotos = await response.json();

    const category = allPhotos[params.category];

    if (!category) {
        throw error(404, 'Category not found');
    }

    const shooting = category.shootings?.[params.shooting];

    if (!shooting) {
        throw error(404, 'Shooting not found');
    }

    return {
        category: {
            slug: params.category,
            title: category.title
        },
        shooting: {
            slug: params.shooting,
            title: shooting.title
        },
        photos: shooting.photos
    };
}
