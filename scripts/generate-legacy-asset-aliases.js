const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');

const legacyAliasMap = {
  'logo.png': 'assets/images/brand/logo.png',
  'peace-biz-logo-en.png': 'assets/images/brand/logo-en.png',
  'it-solution.webp': 'assets/images/services/it-solution.webp',
  'eco-solution.webp': 'assets/images/services/eco-solution.webp',
  'office-solution.webp': 'assets/images/services/office-solution.webp',
  'primesign.webp': 'assets/images/services/primesign.webp',
  'air-conditioner.webp': 'assets/images/services/air-conditioner.webp',
  'new-electricity-retailer.webp': 'assets/images/services/new-electricity-retailer.webp',
  'ledvision.webp': 'assets/images/services/ledvision.webp',
  'herosection_background_poster.webp': 'assets/images/top/hero/herosection_background_poster.webp',
  'herosection_background.webm': 'assets/videos/top/herosection_background.webm',
  'herosection_background.mp4': 'assets/videos/top/herosection_background.mp4',
  'recruit-background.mp4': 'assets/videos/recruit/recruit-background.mp4',
  'tokyo-hq.webp': 'assets/images/about/offices/tokyo-hq.webp',
  'sendai-branch.webp': 'assets/images/about/offices/sendai-branch.webp',
  'fukuoka-branch.webp': 'assets/images/about/offices/fukuoka-branch.webp',
  'about-message-hero-960.webp': 'assets/images/about/about-message-hero-960.webp',
  'about-message-hero-1440.webp': 'assets/images/about/about-message-hero-1440.webp',
  'top-ownersvoice-primesign.webp': 'assets/images/top/owners-voice/top-ownersvoice-primesign.webp',
  'top-ownersvoice-ledsignage.webp': 'assets/images/top/owners-voice/top-ownersvoice-ledsignage.webp',
  'top-ownersvoice-aircon.webp': 'assets/images/top/owners-voice/top-ownersvoice-aircon.webp',
  'top-ownersvoice-officesupply.webp': 'assets/images/top/owners-voice/top-ownersvoice-officesupply.webp',
};

for (let i = 1; i <= 16; i += 1) {
  legacyAliasMap[`about-image-carousel-${i}.webp`] = `assets/images/about/carousel/about-image-carousel-${i}.webp`;
}

[
  'about-philosophy-innovation-1.webp',
  'about-philosophy-innovation-2.webp',
  'about-philosophy-passion-1.webp',
  'about-philosophy-passion-2.webp',
  'about-philosophy-speed-1.webp',
  'about-philosophy-speed-2.webp',
  'about-philosophy-team-1.webp',
  'about-philosophy-team-2.webp',
].forEach((fileName) => {
  legacyAliasMap[fileName] = `assets/images/about/philosophy/${fileName}`;
});

let generatedCount = 0;
for (const [legacyPath, canonicalPath] of Object.entries(legacyAliasMap)) {
  const source = path.join(buildDir, canonicalPath);
  const destination = path.join(buildDir, legacyPath);

  if (!fs.existsSync(source)) {
    console.warn(`Skipped alias (source not found): ${canonicalPath}`);
    continue;
  }

  fs.copyFileSync(source, destination);
  generatedCount += 1;
}

console.log(`Generated ${generatedCount} legacy asset aliases in build/.`);
