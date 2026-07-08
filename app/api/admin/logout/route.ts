import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  await destroySession();
  // Redirect so the plain form POST lands back on the login page instead of
  // showing a JSON body. 303 forces the follow-up request to be a GET.
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
