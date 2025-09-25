import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Listar productos" });
}

export async function POST() {
  return NextResponse.json({ message: "Crear producto" });
}
