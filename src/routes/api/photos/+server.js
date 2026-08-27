import { json } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PHOTOS_DIR = path.resolve('static/photos');

const ALLOWED_EXTENSIONS = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.avif'
]);

export async function GET() {
    const categories = await readdir(PHOTOS_DIR, {
        withFileTypes: true
    });

    const result = {};

    for (const category of categories) {
        if (!category.isDirectory()) {
            continue;
        }

        const categoryPath = path.join(
            PHOTOS_DIR,
            category.name
        );

        const files = await readdir(categoryPath);

        const imageFiles = files
    .filter((file) => {
        const extension = path.extname(file).toLowerCase();

        return ALLOWED_EXTENSIONS.has(extension);
    })
    .sort();

    result[category.name] = await Promise.all(
        imageFiles.map(async (file) => {
            const filePath = path.join(categoryPath, file);

            const metadata = await sharp(filePath).metadata();

            const orientation =
                metadata.width > metadata.height
                    ? 'horizontal'
                    : 'vertical';

            return {
                name: file,
                url: `/photos/${category.name}/${file}`,
                orientation,
                width: metadata.width,
                height: metadata.height
            };
        })
    );
    }

    return json(result);
}