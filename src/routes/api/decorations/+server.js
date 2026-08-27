import { json } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const DECORATIONS_DIR = path.resolve('static/decorations');

const ALLOWED_EXTENSIONS = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.gif'
]);

export async function GET() {
    const files = await readdir(DECORATIONS_DIR);

    const imageFiles = files.filter((file) => {
        const extension = path.extname(file).toLowerCase();
        return ALLOWED_EXTENSIONS.has(extension);
    });

    if (imageFiles.length === 0) {
        return json(
            { error: 'No decoration images found' },
            { status: 404 }
        );
    }

    const randomFile =
        imageFiles[Math.floor(Math.random() * imageFiles.length)];

    return json({
        name: randomFile,
        url: `/decorations/${randomFile}`
    });
}