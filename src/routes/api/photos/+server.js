import { json } from '@sveltejs/kit';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PHOTOS_DIR = '/photos';

const ALLOWED_EXTENSIONS = new Set([
	'.jpg',
	'.jpeg',
	'.png',
	'.webp',
	'.avif'
]);

async function getOrder(categoryPath) {
	const orderPath = path.join(categoryPath, 'order.txt');

	try {
		const content = await readFile(orderPath, 'utf-8');
		return content
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);
	} catch {
		return [];
	}
}

export async function GET() {
	const categories = await readdir(PHOTOS_DIR, { withFileTypes: true });

	const result = {};

	for (const category of categories) {
		if (!category.isDirectory()) continue;

		const categoryPath = path.join(PHOTOS_DIR, category.name);
		const shootings = await readdir(categoryPath, { withFileTypes: true });

		const shootingDirs = shootings
			.filter((s) => s.isDirectory())
			.map((s) => s.name);

		const order = await getOrder(categoryPath);

		const ordered = [
			...order.filter((name) => shootingDirs.includes(name)),
			...shootingDirs
				.filter((name) => !order.includes(name))
				.sort((a, b) => a.localeCompare(b))
		];

		result[category.name] = {};

		for (const shootingName of ordered) {
			const shootingPath = path.join(categoryPath, shootingName);
			const files = await readdir(shootingPath);

			const imageFiles = files
				.filter((file) => {
					const ext = path.extname(file).toLowerCase();
					return ALLOWED_EXTENSIONS.has(ext);
				})
				.sort();

			result[category.name][shootingName] = await Promise.all(
				imageFiles.map(async (file) => {
					const filePath = path.join(shootingPath, file);
					const metadata = await sharp(filePath).metadata();

					const orientation =
						metadata.width > metadata.height ? 'horizontal' : 'vertical';

					return {
						name: file,
						url: `/photos/${category.name}/${shootingName}/${file}`,
						orientation,
						width: metadata.width,
						height: metadata.height
					};
				})
			);
		}
	}

	return json(result);
}