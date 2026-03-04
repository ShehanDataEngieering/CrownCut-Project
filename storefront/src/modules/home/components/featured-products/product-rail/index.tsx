import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <section className="tp-product-area pt-50 pb-30">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title-wrapper mb-30">
              <Text className="txt-xlarge">{collection.title}</Text>
            </div>
          </div>
        </div>
        <div className="row">
          {products &&
            products.map((product) => (
              <div className="col-xl-3 col-lg-4 col-sm-6 d-flex" key={product.id}>
                {/* @ts-ignore */}
                <ProductPreview product={product} region={region} isFeatured variant="gem" />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
