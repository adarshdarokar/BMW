const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const logoDir = path.join(publicDir, 'bmw-logo');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

// 1. Copy Video file
const sourceVideo = path.join(__dirname, 'BMW .mp4');
const targetVideo = path.join(publicDir, 'BMW.mp4');

if (fs.existsSync(sourceVideo)) {
  fs.copyFileSync(sourceVideo, targetVideo);
  console.log(`Copied video from ${sourceVideo} to ${targetVideo}`);
} else {
  console.warn(`Source video not found at ${sourceVideo}`);
}

// 2. Copy and rename logo frames
const sourceLogoDir = path.join(__dirname, 'bmw logo');
if (fs.existsSync(sourceLogoDir)) {
  const files = fs.readdirSync(sourceLogoDir);
  console.log(`Found ${files.length} files in source logo directory.`);

  let copiedCount = 0;
  files.forEach(file => {
    const match = file.match(/ezgif-frame-(\d+)\.jpg/i);
    if (match) {
      const frameNum = parseInt(match[1], 10);
      const paddedNum = String(frameNum).padStart(4, '0');
      const targetFilename = `frame_${paddedNum}.webp`;
      
      const sourcePath = path.join(sourceLogoDir, file);
      const targetPath = path.join(logoDir, targetFilename);
      
      fs.copyFileSync(sourcePath, targetPath);
      copiedCount++;
    }
  });
  console.log(`Successfully copied and renamed ${copiedCount} frames to ${logoDir}`);
} else {
  console.warn(`Source logo directory not found at ${sourceLogoDir}`);
}
