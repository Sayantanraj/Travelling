// Location-accurate photos per destination, downloaded into /public/tours/
// (see scripts/download-images.mjs). Served locally — no runtime hotlinking,
// no rate limits. Owner can replace any /public/tours/<key>.jpg with their own.

const KEYS = [
  "vizag", "hyderabad", "jagdalpur", "south-india", "kerala",
  "kinnaur", "kashmir", "houseboat", "tulip", "manali", "manikaran", "kasol",
  "amritsar", "dharamshala", "nainital", "silk-route", "ladakh", "spiti",
  "chardham", "haridwar", "shillong", "lava", "dooars", "kaziranga", "gangtok",
  "pelling", "tawang", "darjeeling", "sittong", "namchi", "kamakhya",
  "taj", "benaras", "varanasi", "ayodhya", "mp", "purulia",
  "rajasthan", "jaipur", "gujarat", "mumbai",
  "andaman", "goa", "puri", "digha", "sundarban", "daringbari",
  "nepal", "bhutan", "thailand", "bangladesh",
] as const;

export const destImages: Record<string, string> = Object.fromEntries(
  KEYS.map((k) => [k, `/tours/${k}.jpg`])
);

// Resolve a heroImage path like "/tours/kashmir.jpg" -> local accurate photo.
export function resolveImage(heroImage: string): string {
  const key = heroImage.replace("/tours/", "").replace(".jpg", "");
  return destImages[key] ?? destImages.taj;
}

// Hero montage (Ken Burns cross-fade) — accurate iconic shots:
// Kashmir's Dal Lake, Andaman's Radhanagar beach, the Taj Mahal, Tawang in snow.
export const heroMontage = [
  destImages.kashmir,
  destImages.andaman,
  destImages.taj,
  destImages.tawang,
];

// Hero background video (muted, looping) — the original aerial sea/ocean clip.
// Gracefully falls back to the Ken-Burns image montage if it fails to load.
export const heroVideo =
  "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"; // aerial sea
