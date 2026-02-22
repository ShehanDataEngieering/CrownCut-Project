import { NextResponse } from "next/server"

export async function GET() {
  return new NextResponse("google-site-verification: google44e085a93c174269.html", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}
