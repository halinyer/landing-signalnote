import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

const imagesToOptimize = [
  'Recurso 18historia zoom.png',
  'Gemini_Generated_Image_5fas4k5fas4k5fas.png',
  'Gemini_Generated_Image_w3o2qxw3o2qxw3o2.png',
  'ChatGPT Image Jun 10, 2026, 11_57_56 PM.png'
];

async function optimizeImages() {
  for (const img of imagesToOptimize) {
    const inputPath = path.join(publicDir, img);
    if (!fs.existsSync(inputPath)) {
      console.log(`Not found: ${inputPath}`);
      continue;
    }
    const outputPath = inputPath.replace('.png', '.webp');
    console.log(`Optimizing ${img}...`);
    try {
      await sharp(inputPath)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true }) // Resize to max 1920px dimensions
        .webp({ quality: 80 }) // Convert to webp with 80% quality
        .toFile(outputPath);
      console.log(`Optimized -> ${outputPath}`);
    } catch (err) {
      console.error(`Error optimizing ${img}:`, err);
    }
  }
}

optimizeImages();
