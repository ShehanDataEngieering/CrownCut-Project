import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { HttpTypes } from "@medusajs/types"
import UnifiedGemCard from "@modules/common/components/unified-gem-card"

export default function ProductPreview({
  product,
  isFeatured,
  region,
  variant = "default",
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  variant?: "default" | "gem"
}) {
  // Use the product data directly - already has price info from parent query
  const { cheapestPrice } = getProductPrice({
    product: product,
  })

  if (variant === "gem") {
    const image = product.thumbnail || product.images?.[0]?.url

    return (
      <UnifiedGemCard
        href={`/products/${product.handle}`}
        imageUrl={image}
        imageAlt={product.title}
        title={product.title}
        meta={cheapestPrice ? <PreviewPrice price={cheapestPrice} /> : null}
      />
    )
  }

  return (
    <div className="card h-100">
      <div className="position-relative">
        <LocalizedClientLink href={`/products/${product.handle}`} showLoadingOnNavigate>
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </LocalizedClientLink>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <LocalizedClientLink href={`/products/${product.handle}`} showLoadingOnNavigate>
            {product.title}
          </LocalizedClientLink>
        </h5>
        <div className="mt-2">
          <div className="d-flex align-items-center gap-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </div>
  )
}
