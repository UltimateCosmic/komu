import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/[id]
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // 👈 importante: Promise<{ id }>
) {
  const { id } = await context.params // 👈 await para extraer el id

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (err) {
    console.error("Error al obtener producto:", err)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
