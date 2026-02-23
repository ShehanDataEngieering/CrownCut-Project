import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ReactNode } from "react"

type UnifiedGemCardProps = {
  href: string
  imageUrl?: string | null
  imageAlt: string
  title: string
  meta?: ReactNode
}

export default function UnifiedGemCard({
  href,
  imageUrl,
  imageAlt,
  title,
  meta,
}: UnifiedGemCardProps) {
  return (
    <LocalizedClientLink
      href={href}
      className="tp-unified-gem-card d-block h-100"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="tp-unified-gem-card-inner">
        <div className="tp-unified-gem-card-image-wrap">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="tp-unified-gem-card-image"
            />
          ) : (
            <div className="text-muted small">No image</div>
          )}
        </div>
        <div className="tp-unified-gem-card-content">
          <h6 className="mb-1 tp-unified-gem-card-title">{title}</h6>
          {meta ? <div className="d-flex align-items-center gap-2 tp-unified-gem-card-meta">{meta}</div> : null}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
