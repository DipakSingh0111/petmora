import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  return NextResponse.json({ ok: true });
}
