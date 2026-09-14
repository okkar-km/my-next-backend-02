import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/auth";
import { getClientPromise } from "@/lib/mongodb";
import { errorResponse, successResponse } from "@/lib/utils";

export async function PUT(request) {
  // Only admin can change another user's password
  if (!isAdmin(request)) {
    return errorResponse("Forbidden", 403);
  }

  try {
    const data = await request.json();

    const { userId, password } = data;

    if (!userId || !password) {
      return errorResponse(
        "User ID and password are required",
        400,
      );
    }

    if (password.length < 6) {
      return errorResponse(
        "Password must be at least 6 characters",
        400,
      );
    }

    const client = await getClientPromise();

    const db = client.db(process.env.DB_NAME);

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("user").updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          password: hashedPassword,
        },
      },
    );

    if (result.matchedCount === 0) {
      return errorResponse("User not found", 404);
    }

    return successResponse(
      {
        message: "Password changed successfully",
      },
      200,
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      "Change Password Internal Error",
      500,
    );
  }
}