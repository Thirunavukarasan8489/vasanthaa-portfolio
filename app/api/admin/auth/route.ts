import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const serverPasscode = process.env.ADMIN_PASSCODE || "vasanthaa2026";
    const authStorageKey = process.env.AUTH_STORAGE_KEY || "vasanthaa_admin_auth";

    if (passcode === serverPasscode) {
      return NextResponse.json({
        success: true,
        authStorageKey,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid access passcode. Please try again." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication request failed." },
      { status: 500 }
    );
  }
}
