"use client"

import { resolveCategoryImage } from "@lib/data/category-image-map"
import UnifiedGemCard from "@modules/common/components/unified-gem-card"

type GemstoneCategory = {
  id: string
  name: string
  handle: string
  description?: string | null
}

export default function GemstoneCategoriesPage({
  categories,
}: {
  categories: GemstoneCategory[]
}) {
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
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="tp-gem-card"
                    >
                      <UnifiedGemCard
                        href={`/categories/${encodeURIComponent(category.handle)}`}
                        imageUrl={resolveCategoryImage(category.handle)}
                        imageAlt={category.name}
                        title={category.name}
                      />
                    </div>
                  ))}

                  {categories.length === 0 && (
                    <div className="tp-gem-empty">No categories found.</div>
                  )}
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

        .tp-gem-header {
          padding-top: 12px;
        }

        .tp-gem-empty {
          grid-column: 1 / -1;
          border: 1px solid rgb(222, 222, 209);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          color: #666;
          background: #fff;
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
