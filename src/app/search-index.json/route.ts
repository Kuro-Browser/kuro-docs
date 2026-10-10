import { assertContentMatchesNav, buildSearchIndex } from "@/content";

// Generated once at build time and served as a static file.
export const dynamic = "force-static";

export function GET() {
  assertContentMatchesNav();
  return Response.json(buildSearchIndex(), {
    headers: { "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
