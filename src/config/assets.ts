const PUBLIC_URL = process.env.PUBLIC_URL || '';

const withPublicUrl = (path: string): string => `${PUBLIC_URL}${path}`;

export const assetPaths = {
  brand: {
    logo: withPublicUrl('/assets/images/brand/logo.png'),
    logoEn: withPublicUrl('/assets/images/brand/logo-en.png'),
  },
  services: {
    itSolution: withPublicUrl('/assets/images/services/it-solution.webp'),
    ecoSolution: withPublicUrl('/assets/images/services/eco-solution.webp'),
    officeSolution: withPublicUrl('/assets/images/services/office-solution.webp'),
    primeSign: withPublicUrl('/assets/images/services/primesign.webp'),
    airConditioner: withPublicUrl('/assets/images/services/air-conditioner.webp'),
    newElectricityRetailer: withPublicUrl('/assets/images/services/new-electricity-retailer.webp'),
    ledVision: withPublicUrl('/assets/images/services/ledvision.webp'),
  },
  top: {
    heroPoster: withPublicUrl('/assets/images/top/hero/herosection_background_poster.webp'),
    ownerVoicePrimeSign: withPublicUrl('/assets/images/top/owners-voice/top-ownersvoice-primesign.webp'),
    ownerVoiceLedSignage: withPublicUrl('/assets/images/top/owners-voice/top-ownersvoice-ledsignage.webp'),
    ownerVoiceAircon: withPublicUrl('/assets/images/top/owners-voice/top-ownersvoice-aircon.webp'),
    ownerVoiceOfficeSupply: withPublicUrl('/assets/images/top/owners-voice/top-ownersvoice-officesupply.webp'),
  },
  videos: {
    topHeroWebm: withPublicUrl('/assets/videos/top/herosection_background.webm'),
    topHeroMp4: withPublicUrl('/assets/videos/top/herosection_background.mp4'),
    recruitBackground: withPublicUrl('/assets/videos/recruit/recruit-background.mp4'),
  },
};

export const withPublicAssetPath = withPublicUrl;
