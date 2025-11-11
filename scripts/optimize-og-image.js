const sharp = require('sharp');
const path = require('path');

async function optimizeOGImage() {
  const inputPath = path.join(__dirname, '../public/imagenes/casonaCartoon.png');
  const outputPath = path.join(__dirname, '../public/imagenes/og-image.jpg');

  try {
    await sharp(inputPath)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);

    console.log('✅ Imagen Open Graph optimizada exitosamente!');
    console.log('📍 Ubicación:', outputPath);
    
    const stats = require('fs').statSync(outputPath);
    console.log('📊 Tamaño:', Math.round(stats.size / 1024), 'KB');
  } catch (error) {
    console.error('❌ Error optimizando imagen:', error);
    process.exit(1);
  }
}

optimizeOGImage();
