//src/app/api/auth/logout/route.js
import { getCorsHeaders } from "@/lib/cors";
import { NextResponse } from "next/server";

export async function GET(request) {
  const origin = request.headers.get("origin");

  const response = NextResponse.json(
    {
      message: "Logout successful",
    },
    {
      status: 200,
      headers: getCorsHeaders(origin),
    },
  );
  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
