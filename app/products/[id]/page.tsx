/*
interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <div>Detalle del producto con id: {params.id}</div>;
}
*/

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: { url: string; alt?: string }[]
}

type CartItem = {
  product: Product
  quantity: number
}

// Same mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Pizarra De Corcho Económica 40 X 60 Cm",
    description:
      "Pizarra de corcho de alta calidad y tamaño mediano (40 x 60 cm), ideal para uso en el hogar, la oficina o el aula. Superficie duradera y fácil de usar, perfecta para fijar notas, recordatorios y fotos con chinchetas. Ligera y fácil de instalar.",
    price: 29.6,
    category: "Corcho",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-40x60-cm-85900-default-1.jpg",
        alt: "Pizarra de Corcho 40x60",
      },
    ],
  },
  {
    id: "2",
    name: "Pizarra Acrílica Económica 20 X 30 Cm",
    description:
      "Pizarra acrílica de alta calidad y tamaño compacto (20 x 30 cm), superficie suave y fácil de limpiar. Compatible con marcadores de borrado en seco.",
    price: 8.9,
    category: "Acrílica",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-acrilica-economica-20x30-cm-85901-default-1.jpg",
        alt: "Pizarra Acrílica 20x30",
      },
    ],
  },
  {
    id: "3",
    name: "Pizarra Laminada 1.00 X 1.50 Mt Blanca",
    description: "Descubre esta pizarra blanca laminada para cálculos y escritura en gran formato.",
    price: 184.7,
    category: "Blanca",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-lamin-blanc-100-x-150-mt-4952-default-1.jpg",
        alt: "Pizarra Laminada 100x150",
      },
    ],
  },
  {
    id: "4",
    name: "Pizarra Acrílica Económica 30 X 40 Cm",
    description: "Pizarra acrílica económica y duradera en formato 30 x 40 cm.",
    price: 13.4,
    category: "Acrílica",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-acrilica-econo-30x40-cm-94988-default-1.jpg",
        alt: "Pizarra Acrílica 30x40",
      },
    ],
  },
  {
    id: "5",
    name: "Pizarra Multiusos Arti Creativo 20.8 X 29.5 Cm",
    description: "Pizarra fabricada en MDF, irrompible e ideal para dibujar, escribir y planificar.",
    price: 10.2,
    category: "Multiusos",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-multiusos-arti-208-x-295-cm-35495-default-1.jpg",
        alt: "Pizarra Multiusos Arti Creativo",
      },
    ],
  },
  {
    id: "6",
    name: "Pizarra De Corcho Económica 20 X 30 Cm",
    description: "Pizarra de corcho compacta (20 x 30 cm), ideal para notas y recordatorios en espacios pequeños.",
    price: 10.7,
    category: "Corcho",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-20x30-cm-85899-default-1.jpg",
        alt: "Pizarra de Corcho 20x30",
      },
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-20x30-cm-85899-default-1.jpg",
        alt: "Pizarra de Corcho 20x30",
      },
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-20x30-cm-85899-default-1.jpg",
        alt: "Pizarra de Corcho 20x30",
      },
    ],
  },
  {
    id: "7",
    name: "Pizarra De Corcho Importada 0.45 X 0.60 M",
    description: "Pizarra de corcho importada (0.45 x 0.60 m), superficie resistente y fácil de usar.",
    price: 49.1,
    category: "Corcho",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-045-x-060-mt-1433-default-1.jpg",
        alt: "Pizarra de Corcho Importada 45x60",
      },
    ],
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === params.id)
    setProduct(foundProduct || null)
    setSelectedImage(0)
  }, [params.id])

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setQuantity(1)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">Producto no encontrado</h1>
          <Button className="cursor-pointer" onClick={() => router.push("/products")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a productos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/products")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a productos
        </Button>
      </div>
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted/20">
              <img
                src={product.images[selectedImage]?.url || "/placeholder.svg"}
                alt={product.images[selectedImage]?.alt || product.name}
                className="w-full h-full object-cover"
              />
              <Badge variant="destructive" className="font-display absolute top-3 left-3 bg-foreground text-balance">
                {product.category}
              </Badge>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center mt-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`cursor-pointer border rounded-md p-1 transition-all duration-200 ${selectedImage === idx ? 'border-primary ring-2 ring-primary' : 'border-gray-200'}`}
                    style={{ width: 56, height: 56 }}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-4 text-balance">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 reseñas)</span>
              </div>
              <p className="text-muted-foreground text-pretty leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="text-4xl font-light text-foreground">S/ {product.price.toFixed(2)}</div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg w-12 text-center">{quantity}</span>
                  <Button className="cursor-pointer" size="sm" variant="outline" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button size="lg" onClick={handleAddToCart} className="cursor-pointer flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar al Carrito
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Envío Gratis</p>
                  <p className="text-xs text-muted-foreground">En pedidos +S/50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Garantía</p>
                  <p className="text-xs text-muted-foreground">12 meses</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Devoluciones</p>
                  <p className="text-xs text-muted-foreground">30 días</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-medium text-foreground mb-4">Detalles del Producto</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categoría:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Alta calidad</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instalación:</span>
                    <span>Fácil montaje</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uso:</span>
                    <span>Hogar, oficina, aula</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
