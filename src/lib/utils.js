// src/lib/utils.js

import { NextResponse } from "next/server";

import { getCorsHeaders } from "./cors";

export function printExceptionLog(logMessage, error) {
  console.log(`==>${logMessage} Exception`);

  console.log(error);
}

export function errorResponse(message, status, origin) {
  return NextResponse.json(
    {
      message: message,
    },

    {
      status: status,

      headers: getCorsHeaders(origin),
    },
  );
}

export function successResponse(jsonData, status, origin) {
  return NextResponse.json(jsonData, {
    status: status,

    headers: getCorsHeaders(origin),
  });
}
