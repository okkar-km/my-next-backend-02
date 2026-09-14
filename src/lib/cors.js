const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]
  .filter(Boolean)
  .map((origin) => origin.replace(/\/$/, ""));

export function getCorsHeaders(origin) {
  const cleanOrigin = origin ? origin.replace(/\/$/, "") : undefined;
  const isAllowed = cleanOrigin && allowedOrigins.includes(cleanOrigin);

  return {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": isAllowed
      ? cleanOrigin
      : allowedOrigins[0] || "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

// Static fallback for routes that don't need dynamic origin
export default getCorsHeaders(process.env.FRONTEND_URL || "http://localhost:5173");
