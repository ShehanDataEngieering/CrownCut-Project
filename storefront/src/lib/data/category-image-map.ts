const DEFAULT_CATEGORY_IMAGE = "/assets/img/product/gem-1.jpg"

const FALLBACK_CATEGORY_IMAGES = [
  "/assets/img/product/gem-1.jpg",
  "/assets/img/product/gem-2.jpg",
  "/assets/img/product/gem-3.jpg",
  "/assets/img/product/gem-4.jpg",
  "/assets/img/product/gem-5.jpg",
  "/assets/img/product/gem-6.jpg",
  "/assets/img/product/gem-7.jpg",
  "/assets/img/product/gem-8.jpg",
]

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "sapphire-blue": "/assets/img/product/gem-1.jpg",
  "sapphire-yellow": "/assets/img/product/gem-2.jpg",
  "sapphire-white": "/assets/img/product/gem-3.jpg",
  "sapphire-bi": "/assets/img/product/gem-4.jpg",
  "sapphire-green": "/assets/img/product/gem-5.jpg",
  "sapphire-pink": "/assets/img/product/gem-6.jpg",
  "sapphire-purple": "/assets/img/product/gem-7.jpg",
  "sapphire-natural": "/assets/img/product/gem-8.jpg",
  spinel: "/assets/img/product/spinel.jpg",
  garnet: "/assets/img/product/garnet.jpg",
  spessartite: "/assets/img/product/Spessartite.jpg",
  topaz: "/assets/img/product/topaz.jpg",
  quartz: "/assets/img/product/quarts.jpg",
  aquamarine: "/assets/img/product/aquamarine.jpg",
  chrysoberyl: "/assets/img/product/chrysoberyl.jpg",
  zircon: "/assets/img/product/zircon.jpg",
}

const hashString = (input: string) => {
  // Simple deterministic hash for stable fallbacks (no crypto needed)
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function resolveCategoryImage(handle: string): string {
  const key = (handle || "").toLowerCase().trim()

  if (key && CATEGORY_IMAGE_MAP[key]) {
    return CATEGORY_IMAGE_MAP[key]
  }

  if (!key) {
    return DEFAULT_CATEGORY_IMAGE
  }

  const idx = hashString(key) % FALLBACK_CATEGORY_IMAGES.length
  return FALLBACK_CATEGORY_IMAGES[idx] || DEFAULT_CATEGORY_IMAGE
}
