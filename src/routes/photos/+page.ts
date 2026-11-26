import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
    const response = await fetch('/api/photos');

    if (!response.ok) {
        throw error(500, 'Failed to load photos');
    }

    const photos = await response.json();

    return {
        photos
    };
}