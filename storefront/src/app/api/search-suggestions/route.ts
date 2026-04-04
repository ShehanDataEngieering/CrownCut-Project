import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [] })
  }

  try {
    const { products } = await sdk.store.product.list(
      {
        q,
        limit: 6,
        fields: 'id,title,handle,thumbnail',
      },
      { next: { revalidate: 60 } }
    )

    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        thumbnail: p.thumbnail,
      })),
    })
  } catch {
    return NextResponse.json({ products: [] })
  }
}
