const UPSTREAM = "https://homepage-counter.zhuoluozhao.workers.dev";

const ALLOWED_ORIGINS = new Set([
  "https://zhuoluozhao.github.io",
  "https://pandaab.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function corsHeaders(origin) {
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://zhuoluozhao.github.io";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

export default async (req) => {
  const origin = req.headers.get("origin");
  const url = new URL(req.url);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method === "POST" && origin && !ALLOWED_ORIGINS.has(origin)) {
    return Response.json(
      { error: "Forbidden origin" },
      { status: 403, headers: corsHeaders(origin) }
    );
  }

  const init = {
    method: req.method,
    headers: {
      Origin: "https://zhuoluozhao.github.io",
    },
  };

  if (req.method === "POST") {
    const bodyText = await req.text();
    if (bodyText) {
      init.headers["Content-Type"] = "application/json";
      init.body = bodyText;
    }
  }

  const upstreamRes = await fetch(`${UPSTREAM}${url.pathname}`, init);
  const text = await upstreamRes.text();

  return new Response(text, {
    status: upstreamRes.status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
    },
  });
};

export const config = {
  path: ["/stats", "/view", "/like"],
};
