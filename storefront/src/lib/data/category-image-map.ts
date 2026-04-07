const BASE = "/assets/img/product/gems-crowncut"

const DEFAULT_CATEGORY_IMAGE = `${BASE}/apaxems_a_frontal_view_blue_sapphire_oval_cut_on_a_white_backgr_81eec157-e0fa-4031-9723-fa00a3018c1a.webp`

const FALLBACK_CATEGORY_IMAGES = [
  `${BASE}/apaxems_a_frontal_view_blue_sapphire_oval_cut_on_a_white_backgr_81eec157-e0fa-4031-9723-fa00a3018c1a.webp`,
  `${BASE}/apaxems_a_frontal_view_yellow_sapphire_oval_cut_on_a_white_back_ada26a21-030f-4ebe-9af8-91eddf10c4f0.webp`,
  `${BASE}/apaxems_a_frontal_view_white_sapphire_oval_cut_on_a_white_backg_bb243de9-d7a3-4852-8584-ca0c6209dd46.webp`,
  `${BASE}/apaxems_a_frontal_view_pinksapphire_oval_cut_on_a_white_backgro_9aa743c2-13f8-40e0-afe4-09e7cfc9bdd9.webp`,
  `${BASE}/apaxems_a_frontal_view_green_sapphire_oval_cut_on_a_white_backg_178d8cc6-3831-4884-a159-a00e180390a6.webp`,
  `${BASE}/apaxems_a_frontal_view_aquamarine_oval_cut_on_a_white_backgroun_4d3d0f63-66f1-405d-8cd6-8cc1b5626349.webp`,
  `${BASE}/apaxems_a_frontal_view_vivid_red_garnet_oval_cut_on_a_white_bac_0b03f727-78c3-4761-97a7-110772af5243.webp`,
  `${BASE}/apaxems_a_frontal_view_orange_topaz_oval_cut_on_a_white_backgro_7b89a8ce-77d6-4bf6-9ed3-c9003f39e7cb.webp`,
]

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "sapphire--blue":   `${BASE}/apaxems_a_frontal_view_blue_sapphire_oval_cut_on_a_white_backgr_81eec157-e0fa-4031-9723-fa00a3018c1a.webp`,
  "sapphire--yellow": `${BASE}/apaxems_a_frontal_view_yellow_sapphire_oval_cut_on_a_white_back_ada26a21-030f-4ebe-9af8-91eddf10c4f0.webp`,
  "sapphire--white":  `${BASE}/apaxems_a_frontal_view_white_sapphire_oval_cut_on_a_white_backg_bb243de9-d7a3-4852-8584-ca0c6209dd46.webp`,
  "sapphire--bi":     `${BASE}/apaxems_a_frontal_view_in_north_to_south_bi_color_sapphire_with_993e4213-5fad-4238-9c87-ac0e92c8cbd2.webp`,
  "sapphire--green":  `${BASE}/apaxems_a_frontal_view_green_sapphire_oval_cut_on_a_white_backg_178d8cc6-3831-4884-a159-a00e180390a6.webp`,
  "sapphire--pink":   `${BASE}/apaxems_a_frontal_view_pinksapphire_oval_cut_on_a_white_backgro_9aa743c2-13f8-40e0-afe4-09e7cfc9bdd9.webp`,
  "sapphire--purple": `${BASE}/apaxems_a_frontal_view_purple_sapphire_oval_cut_on_a_white_back_39e5e120-f20d-49c5-a8c3-ea839f3cb598 (1).webp`,
  sapphirenaxta:      `${BASE}/sapphirenatxtal-jjx-176-4.webp`,
  spinel:             `${BASE}/apaxems_a_frontal_view_coca_cola_red_spinel_oval_cut_on_a_white_2f93ed78-38f2-47e2-8e87-6609493c5cb5.webp`,
  garnet:             `${BASE}/apaxems_a_frontal_view_vivid_red_garnet_oval_cut_on_a_white_bac_0b03f727-78c3-4761-97a7-110772af5243.webp`,
  spessartite:        `${BASE}/apaxems_a_frontal_view_spessartite_oval_cut_on_a_white_backgrou_3f937c88-f81a-4d09-9410-4435aeeedbc6.webp`,
  topaz:              `${BASE}/apaxems_a_frontal_view_orange_topaz_oval_cut_on_a_white_backgro_7b89a8ce-77d6-4bf6-9ed3-c9003f39e7cb.webp`,
  quarts:             `${BASE}/apaxems_The_image_shows_a_polished_pink_gemstone_most_likely_ro_2c8723e0-7fa2-4bb4-9203-10d3b3f01c95.webp`,
  aquamarine:         `${BASE}/apaxems_a_frontal_view_aquamarine_oval_cut_on_a_white_backgroun_4d3d0f63-66f1-405d-8cd6-8cc1b5626349.webp`,
  chrysoberyl:        `${BASE}/apaxems_a_frontal_view_chrysoberyl_oval_cut_on_a_white_backgrou_9f7fcf51-a9c7-436f-960a-d0deba443fb3.webp`,
  zircon:             `${BASE}/apaxems_a_frontal_view_blue_zircon_oval_cut_on_a_white_backgrou_06ad3cc5-9acf-42ec-a089-327fc01ec4aa.webp`,
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
