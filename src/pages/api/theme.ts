import type { APIRoute } from "astro";

export const prerender = false;

const THEME_PATH = "/api/v1/theme";

function getThemeApiBaseUrl(): string {
  const baseUrlRaw =
    import.meta.env.THEME_API_BASE_URL ??
    import.meta.env.PUBLIC_THEME_API_BASE_URL ??
    "";
  const baseUrl = String(baseUrlRaw).trim().replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error(
      "Missing THEME_API_BASE_URL. Configure it in your environment.",
    );
  }

  return baseUrl;
}

function buildUpstreamUrl(requestUrl: URL): string {
  const upstream = new URL(THEME_PATH, getThemeApiBaseUrl());
  requestUrl.searchParams.forEach((value, key) => {
    upstream.searchParams.set(key, value);
  });
  return upstream.toString();
}

async function proxyTheme(
  method: "GET" | "POST",
  request: Request,
): Promise<Response> {
  try {
    const upstreamUrl = buildUpstreamUrl(new URL(request.url));

    const response = await fetch(upstreamUrl, {
      method,
      headers:
        method === "POST"
          ? {
              "Content-Type": "application/json",
            }
          : undefined,
      body: method === "POST" ? await request.text() : undefined,
    });

    const bodyText = await response.text();

    return new Response(bodyText, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Theme proxy error", error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Theme service is currently unavailable.",
      }),
      {
        status: 502,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export const GET: APIRoute = async ({ request }) => {
  return proxyTheme("GET", request);
};

export const POST: APIRoute = async ({ request }) => {
  return proxyTheme("POST", request);
};
