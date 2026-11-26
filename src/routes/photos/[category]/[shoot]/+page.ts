
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const response = await fetch('/api/photos');

    if (!response.ok) {
        throw error(500, 'Failed to load photos');
    }

    const allPhotos = await response.json();

    console.log('URL params:', params);
    console.log('Available categories:', Object.keys(allPhotos));

    const category = allPhotos[params.category];

    if (!category) {
        console.error('Category not found:', params.category);
        throw error(404, 'Category not found');
    }

    console.log(
        'Available shootings:',
        Object.keys(category.shootings ?? {})
    );

    console.log('Requested shooting:', params.shooting);

    const shooting = category.shootings?.[params.shooting];

    if (!shooting) {
        console.error('Shooting not found:', params.shooting);
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
