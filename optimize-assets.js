import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('--- BMW ASSET OPTIMIZATION SYSTEM ---');
  
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.warn('Sharp is not installed or available yet. Skipping WebP compression for this run.');
    console.info('Please run "npm install" to install all dependencies including sharp.');
    process.exit(0);
  }

  const publicDir = path.join(__dirname, 'public');
  const logoOutputDir = path.join(publicDir, 'bmw-logo');
  const sourceLogoDir = path.join(__dirname, 'bmw logo');

  // Ensure public directories exist
  if (!fs.existsSync(logoOutputDir)) {
    fs.mkdirSync(logoOutputDir, { recursive: true });
  }

  // 1. Transcode Frame Sequence from JPEG to optimized WebP
  if (fs.existsSync(sourceLogoDir)) {
    const files = fs.readdirSync(sourceLogoDir);
    console.log(`Found ${files.length} raw frames in "${sourceLogoDir}".`);
    
    let processedCount = 0;
    for (const file of files) {
      const match = file.match(/ezgif-frame-(\d+)\.jpg/i);
      if (match) {
        const frameNum = parseInt(match[1], 10);
        // Standardize padding to 3 digits (e.g. 001, 010, 100)
        const paddedNum = String(frameNum).padStart(3, '0');
        const targetFilename = `frame_${paddedNum}.webp`;
        
        const sourcePath = path.join(sourceLogoDir, file);
        const targetPath = path.join(logoOutputDir, targetFilename);

        // Check if WebP already exists and is newer to speed up builds
        let shouldProcess = true;
        if (fs.existsSync(targetPath)) {
          const sourceStat = fs.statSync(sourcePath);
          const targetStat = fs.statSync(targetPath);
          if (targetStat.mtime > sourceStat.mtime) {
            shouldProcess = false;
          }
        }

        if (shouldProcess) {
          await sharp(sourcePath)
            .webp({ quality: 75 })
            .toFile(targetPath);
          processedCount++;
        }
      }
    }
    
    if (processedCount > 0) {
      console.log(`Successfully compressed and converted ${processedCount} frames to WebP in "${logoOutputDir}".`);
    } else {
      console.log('All WebP logo frames are up to date.');
    }

    // Clean up any old JPEGs and fake WebPs in the public/bmw-logo directory to prevent bloating build output
    const outputFiles = fs.readdirSync(logoOutputDir);
    let deletedCount = 0;
    outputFiles.forEach(file => {
      const isJpg = file.endsWith('.jpg');
      const isCorrectWebp = /^frame_\d{3}\.webp$/.test(file);
      if (isJpg || !isCorrectWebp) {
        fs.unlinkSync(path.join(logoOutputDir, file));
        deletedCount++;
      }
    });
    if (deletedCount > 0) {
      console.log(`Cleaned up ${deletedCount} deprecated/unused files in "${logoOutputDir}".`);
    }
  } else {
    console.warn(`Source logo directory not found at "${sourceLogoDir}".`);
  }

  // 2. Transcode heavy UI PNG assets (exterior and interior) to WebP
  const assetsDir = path.join(publicDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const pngs = ['exterior.png', 'interior.png'];
    for (const pngName of pngs) {
      const sourcePath = path.join(assetsDir, pngName);
      if (fs.existsSync(sourcePath)) {
        const webpName = pngName.replace('.png', '.webp');
        const targetPath = path.join(assetsDir, webpName);
        
        let shouldProcess = true;
        if (fs.existsSync(targetPath)) {
          const sourceStat = fs.statSync(sourcePath);
          const targetStat = fs.statSync(targetPath);
          if (targetStat.mtime > sourceStat.mtime) {
            shouldProcess = false;
          }
        }

        if (shouldProcess) {
          console.log(`Compressing and converting "${pngName}" to WebP...`);
          await sharp(sourcePath)
            .webp({ quality: 80, effort: 6 })
            .toFile(targetPath);
          console.log(`Generated optimized WebP at "${targetPath}".`);
        }
      }
    }
  }

  console.log('--- ASSET OPTIMIZATION COMPLETE ---');
}

run().catch(err => {
  console.error('Error optimizing assets:', err);
  process.exit(1);
});
