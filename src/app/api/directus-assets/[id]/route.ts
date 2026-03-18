import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const directusUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "") ?? "";
  const token = process.env.DIRECTUS_STATIC_TOKEN ?? "";

  if (!directusUrl || !token) {
    return new NextResponse("Missing Directus environment variables", {
      status: 500,
    });
  }

  const directusRes = await fetch(`${directusUrl}/assets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!directusRes.ok) {
    return new NextResponse(directusRes.statusText || "Directus asset error", {
      status: directusRes.status,
    });
  }

  const contentType =
    directusRes.headers.get("content-type") ?? "application/octet-stream";
  const cacheControl = `public, max-age=3600, s-maxage=3600, stale-while-revalidate=60`;

  const body = await directusRes.arrayBuffer();
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": contentType,
      "cache-control": cacheControl,
    },
  });
}

