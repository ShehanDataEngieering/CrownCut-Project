"use client"

import { resolveCategoryImage } from "@lib/data/category-image-map"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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
                    <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${encodeURIComponent(category.handle)}`}
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="tp-gem-card-inner">
                        <div className="tp-gem-card-image-wrap">
                          <img
                            src={resolveCategoryImage(category.handle)}
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
