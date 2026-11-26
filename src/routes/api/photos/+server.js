import { json } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PHOTOS_DIR = '/photos';
const CONFIG_PATH = path.join(PHOTOS_DIR, 'shootings.json');

const ALLOWED_EXTENSIONS = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.avif'
]);

export async function GET() {
    try {
        const config = JSON.parse(
            await (await import('node:fs/promises'))
                .readFile(CONFIG_PATH, 'utf-8')
        );

        const result = {};

        for (const [categorySlug, category] of Object.entries(config)) {
            const categoryPath = path.join(PHOTOS_DIR, categorySlug);

            result[categorySlug] = {
                title: category.title,
                shootings: {}
            };

            for (const [shootingSlug, shooting] of Object.entries(category.shootings)) {
                const shootingPath = path.join(
                    categoryPath,
                    shooting.folder
                );

                const files = await readdir(shootingPath);

                const imageFiles = files
                    .filter(file =>
                        ALLOWED_EXTENSIONS.has(
                            path.extname(file).toLowerCase()
                        )
                    )
                    .sort((a, b) => a.localeCompare(b));

                const photos = await Promise.all(
                    imageFiles.map(async file => {
                        const filePath = path.join(shootingPath, file);
                        const metadata = await sharp(filePath).metadata();

                        return {
                            name: file,
                            url: `/photos/${categorySlug}/${encodeURIComponent(shooting.folder)}/${encodeURIComponent(file)}`,
                            width: metadata.width,
                            height: metadata.height
                        };
                    })
                );

                const cover = shooting.cover;

                result[categorySlug].shootings[shootingSlug] = {
                    title: shooting.title,
                    cover: photos.find(photo => photo.name === cover) ?? photos[0] ?? null,
                    photos
                };
            }
        }

        return json(result);

    } catch (error) {
        console.error('Photos API error:', error);
        return json(
            { error: 'Failed to load photos' },
            { status: 500 }
        );
    }
}
