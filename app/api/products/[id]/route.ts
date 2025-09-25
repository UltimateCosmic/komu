import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `Obtener producto ${params.id}` });
}

export async function PUT(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `Actualizar producto ${params.id}` });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `Eliminar producto ${params.id}` });
}
