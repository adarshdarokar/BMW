const fs = require('fs');
const path = require('path');

try {
  const pngLogoPath = path.join(__dirname, 'public', 'logo.png');
  const jpgLogoPath = path.join(__dirname, 'public', 'logo.jpg');
  const svgPath = path.join(__dirname, 'public', 'favicon.svg');
  
  let logoPath = '';
  let mimeType = '';
  
  if (fs.existsSync(pngLogoPath)) {
    logoPath = pngLogoPath;
    mimeType = 'image/png';
  } else if (fs.existsSync(jpgLogoPath)) {
    logoPath = jpgLogoPath;
    mimeType = 'image/jpeg';
  } else {
    console.error('logo.png or logo.jpg not found in public folder');
    process.exit(1);
  }

  const imageBuffer = fs.readFileSync(logoPath);
  const base64Data = imageBuffer.toString('base64');
  
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circleClip">
      <circle cx="50" cy="50" r="50" />
    </clipPath>
  </defs>
  <image 
    href="data:${mimeType};base64,${base64Data}" 
    width="100" 
    height="100" 
    preserveAspectRatio="xMidYMid slice" 
    clip-path="url(#circleClip)" 
  />
</svg>`;

  fs.writeFileSync(svgPath, svgContent);
  console.log('Successfully generated circular favicon.svg from logo image');
} catch (error) {
  console.error('Error generating favicon:', error);
}
