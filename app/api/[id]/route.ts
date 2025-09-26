// /app/api/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { images: true }, // incluye las imágenes si existen
    });

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("Error al obtener producto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        // ⚠️ aquí decides cómo manejar imágenes (ejemplo simple):
        images: {
          deleteMany: {}, // borra las imágenes previas
          create: body.images || [], // y crea nuevas
        },
      },
      include: { images: true },
    });

    return NextResponse.json(updatedProduct);
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: `Producto ${params.id} eliminado` });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}