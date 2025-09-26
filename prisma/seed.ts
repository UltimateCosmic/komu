// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Productos mock corregidos
  const products = [
    {
      name: "Pizarra De Corcho Económica 40 X 60 Cm",
      description:
        "Pizarra de corcho de alta calidad y tamaño mediano (40 x 60 cm), ideal para uso en el hogar, la oficina o el aula.",
      price: 29.6,
      category: "Corcho",
      images: {
        create: [
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-40x60-cm-85900-default-1.jpg",
            alt: "Pizarra de Corcho 40x60"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-30x40-cm-85898-default-1.jpg",
            alt: "Pizarra de Corcho 30x40"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-20x30-cm-85899-default-1.jpg",
            alt: "Pizarra de Corcho 20x30"
          }
        ]
      }
    },
    {
      name: "Pizarra Acrílica Económica 20 X 30 Cm",
      description:
        "Pizarra acrílica de alta calidad y tamaño compacto (20 x 30 cm), superficie suave y fácil de limpiar.",
      price: 8.9,
      category: "Acrílica",
      images: {
        create: [
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-acrilica-economica-20x30-cm-85901-default-1.jpg",
            alt: "Pizarra Acrílica 20x30"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-acrilica-econo-30x40-cm-94988-default-1.jpg",
            alt: "Pizarra Acrílica 30x40"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-laminada-blanca-090-x-150-mt-2510-default-1.jpg",
            alt: "Pizarra Laminada 90x150"
          }
        ]
      }
    },
    {
      name: "Pizarra Laminada 1.00 X 1.50 Mt Blanca",
      description: "Descubre esta pizarra blanca laminada para cálculos y escritura en gran formato.",
      price: 184.7,
      category: "Blanca",
      images: {
        create: [
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-lamin-blanc-100-x-150-mt-4952-default-1.jpg",
            alt: "Pizarra Laminada 100x150"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-laminada-blanca-080-x-120-mt-1190-default-1.jpg",
            alt: "Pizarra Laminada 80x120"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-lamin-blanc-120-x-180-mt-1414-default-1.jpg",
            alt: "Pizarra Laminada 120x180"
          }
        ]
      }
    },
    {
      name: "Pizarra Acrílica Económica 30 X 40 Cm",
      description: "Pizarra acrílica económica y duradera en formato 30 x 40 cm.",
      price: 13.4,
      category: "Acrílica",
      images: {
        create: [
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-acrilica-econo-30x40-cm-94988-default-1.jpg",
            alt: "Pizarra Acrílica 30x40"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-laminada-blanca-080-x-120-mt-1190-default-1.jpg",
            alt: "Pizarra Laminada 80x120"
          },
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-laminada-blanca-090-x-150-mt-2510-default-1.jpg",
            alt: "Pizarra Laminada 90x150"
          }
        ]
      }
    },
    {
      name: "Pizarra Multiusos Arti Creativo 20.8 X 29.5 Cm",
      description: "Pizarra fabricada en MDF, irrompible e ideal para dibujar, escribir y planificar.",
      price: 10.2,
      category: "Multiusos",
      images: {
        create: [
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-multiusos-arti-208-x-295-cm-35495-default-1.jpg",
            alt: "Pizarra Multiusos Arti Creativo"
          }
        ]
      }
    },
    {
      name: "Pizarra De Corcho Económica 20 X 30 Cm",
      description: "Pizarra de corcho compacta (20 x 30 cm), ideal para notas y recordatorios en espacios pequeños.",
      price: 10.7,
      category: "Corcho",
      images: {
        create: [
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-20x30-cm-85899-default-1.jpg",
            alt: "Pizarra de Corcho 20x30"
          }
        ]
      }
    },
    {
      name: "Pizarra De Corcho Importada 0.45 X 0.60 M",
      description: "Pizarra de corcho importada (0.45 x 0.60 m), superficie resistente y fácil de usar.",
      price: 49.1,
      category: "Corcho",
      images: {
        create: [
          {
            url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-045-x-060-mt-1433-default-1.jpg",
            alt: "Pizarra de Corcho Importada 45x60"
          }
        ]
      }
    },
    {
      name: "Producto de prueba sin imágen",
      description: "Una pizarra completamente imaginaria.",
      price: 49.1,
      category: "Corcho",
      images: {
        create: []
      }
    }
  ]

  // Borrar productos previos para evitar duplicados
  await prisma.image.deleteMany()
  await prisma.product.deleteMany()

  // Insertar productos
  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log("Se insertaron productos de prueba en la base de datos")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
