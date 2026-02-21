"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

type GemstoneCategory = {
  id: string
  name: string
  slug: string
  image: string
  description?: string
}

const gemstoneCategories: GemstoneCategory[] = [
  { id: "1", name: "Sapphire Blue", slug: "sapphire-blue", image: "/assets/img/product/gem-1.jpg", description: "Beautiful blue sapphires from Sri Lanka" },
  { id: "2", name: "Sapphire Yellow", slug: "sapphire-yellow", image: "/assets/img/product/gem-2.jpg", description: "Stunning yellow sapphires" },
  { id: "3", name: "Sapphire White", slug: "sapphire-white", image: "/assets/img/product/gem-3.jpg", description: "Elegant white sapphires" },
  { id: "4", name: "Sapphire Bi-Color", slug: "sapphire-bi", image: "/assets/img/product/gem-4.jpg", description: "Unique bi-color sapphires" },
  { id: "5", name: "Sapphire Green", slug: "sapphire-green", image: "/assets/img/product/gem-5.jpg", description: "Rare green sapphires" },
  { id: "6", name: "Sapphire Pink", slug: "sapphire-pink", image: "/assets/img/product/gem-6.jpg", description: "Delicate pink sapphires" },
  { id: "7", name: "Sapphire Purple", slug: "sapphire-purple", image: "/assets/img/product/gem-7.jpg", description: "Royal purple sapphires" },
  { id: "8", name: "Sapphire Natural", slug: "sapphire-natural", image: "/assets/img/product/gem-8.jpg", description: "Natural unheated sapphires" },
  { id: "9", name: "Spinel", slug: "spinel", image: "/assets/img/product/spinel.jpg", description: "Vibrant spinel gemstones" },
  { id: "10", name: "Garnet", slug: "garnet", image: "/assets/img/product/garnet.jpg", description: "Rich red garnets" },
  { id: "11", name: "Spessartite", slug: "spessartite", image: "/assets/img/product/Spessartite.jpg", description: "Orange spessartite garnets" },
  { id: "12", name: "Topaz", slug: "topaz", image: "/assets/img/product/topaz.jpg", description: "Brilliant topaz gemstones" },
  { id: "13", name: "Quartz", slug: "quartz", image: "/assets/img/product/quarts.jpg", description: "Crystal clear quartz" },
  { id: "14", name: "Aquamarine", slug: "aquamarine", image: "/assets/img/product/aquamarine.jpg", description: "Ocean blue aquamarine" },
  { id: "15", name: "Chrysoberyl", slug: "chrysoberyl", image: "/assets/img/product/chrysoberyl.jpg", description: "Rare chrysoberyl stones" },
  { id: "16", name: "Zircon", slug: "zircon", image: "/assets/img/product/zircon.jpg", description: "Sparkling zircon gemstones" },
]

export default function GemstoneCategoriesPage() {
  return (
    <section className="tp-banner-area pb-60 tp-gem-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12">
            <div className="row">
              <div className="col-12">
                <div className="tp-gem-header">
                  <h3 className="mb-3">Gemstones</h3>
                  <p className="mb-4 text-muted">
                    Explore our collection of precious gemstones from Sri Lanka
                  </p>
                </div>

                <div className="tp-gem-grid">
                  {gemstoneCategories.map((category) => (
                    <LocalizedClientLink
                      key={category.id}
                      href={`/store?category=${category.slug}`}
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="tp-gem-card-inner">
                        <div className="tp-gem-card-image-wrap">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="tp-gem-card-image"
                          />
                        </div>

                        <div className="tp-gem-card-content">
                          <h6 className="mb-1">{category.name}</h6>
                          {category.description && (
                            <p className="mb-0 text-muted small">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tp-gem-section {
          padding-top: 140px;
        }

        .tp-gem-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .tp-gem-card {
          display: block;
          height: 100%;
        }

        .tp-gem-card-inner {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          background: #fff;
          border: 1.5px solid rgb(222, 222, 209);
          height: 100%;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .tp-gem-card:hover .tp-gem-card-inner {
          transform: translateY(-3px);
          box-shadow: 0 8px 18px rgba(180, 180, 165, 0.35);
        }

        .tp-gem-header {
          padding-top: 12px;
        }

        .tp-gem-card-image-wrap {
          width: 100%;
          height: 120px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(250, 250, 245);
        }

        .tp-gem-card-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          padding: 8px;
        }

        .tp-gem-card-content {
          padding: 12px;
        }

        @media (max-width: 991.98px) {
          .tp-gem-section {
            padding-top: 120px;
          }

          .tp-gem-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 767.98px) {
          .tp-gem-section {
            padding-top: 105px;
          }

          .tp-gem-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 479.98px) {
          .tp-gem-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
