import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const svg = new URL('../public/images/amazon-boost-logo.svg', import.meta.url);
const png = new URL('../public/images/amazon-boost-logo.png', import.meta.url);

await sharp(fileURLToPath(svg)).resize(800, 800).png().toFile(fileURLToPath(png));
