import { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <section className="tp-store-section pb-5 tp-product-theme-page">
        <div className="container tp-product-theme-container" data-testid="product-container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm h-100 tp-product-theme-card">
                <div className="card-body p-3 p-lg-4 tp-product-gallery-body">
                  <ImageGallery images={product?.images || []} />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4">
                <div className="card border-0 shadow-sm tp-product-theme-card">
                  <div className="card-body p-4 p-lg-5">
                    <ProductInfo product={product} />
                  </div>
                </div>

                <div className="card border-0 shadow-sm tp-product-theme-card">
                  <div className="card-body p-4 p-lg-5 d-flex flex-column gap-4">
                    <ProductOnboardingCta />
                    <Suspense
                      fallback={
                        <ProductActions
                          disabled={true}
                          product={product}
                          region={region}
                        />
                      }
                    >
                      <ProductActionsWrapper id={product.id} region={region} />
                    </Suspense>
                  </div>
                </div>

                <div className="card border-0 shadow-sm tp-product-theme-card">
                  <div className="card-body p-4 p-lg-5">
                    <ProductTabs product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-5 tp-product-related-section"
        data-testid="related-products-container"
      >
        <div className="container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default ProductTemplate
