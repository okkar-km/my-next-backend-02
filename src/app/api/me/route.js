//src/app/api/me/route.js
import { verifyJWT } from "@/lib/auth";
import { getCorsHeaders } from "@/lib/cors";
import { errorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export function GET(request) {
  const origin = request.headers.get("origin");
  const user = verifyJWT(request);

  if (!user) {
    return errorResponse("Unauthorized Request", 401, origin);
  }

  return NextResponse.json(
    {
      user: {
        _id: user.id,
        email: user.email,
        username: user.username,
      },
    },
    {
      status: 200,
      headers: getCorsHeaders(origin),
    },
  );
}
