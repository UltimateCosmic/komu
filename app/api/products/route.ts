import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Listar productos
export async function GET() {
  const products = await prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

// POST: Crear producto
export async function POST(req: Request) {
  const data = await req.json();
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      images: {
        create: data.images?.map((img: { url: string; alt?: string }) => ({
          url: img.url,
          alt: img.alt,
        })),
      },
    },
    include: { images: true },
  });
  return NextResponse.json(product);
}
