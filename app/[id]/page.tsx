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
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import { useCart } from "@/context/CartContext"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: { url: string; alt?: string }[]
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        // 👇 Ajusta si usas /api/products/[id] en lugar de /api/[id]
        const res = await fetch(`/api/${params.id}`)
        if (!res.ok) {
          setProduct(null)
        } else {
          const data: Product = await res.json()
          setProduct(data)
          setSelectedImage(0)
        }
      } catch (err) {
        console.error("Error al traer producto:", err)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    if (params.id) fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setQuantity(1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="/komu.png" alt="Cargando" className="h-16 w-auto mb-6 opacity-30 invert" />
          <p className="text-lg text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">Producto no encontrado</h1>
          <Button className="cursor-pointer" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a productos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="cursor-pointer text-muted-foreground hover:text-foreground"
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
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted/20 flex items-center justify-center">
              {product.images.length > 0 && product.images[selectedImage]?.url ? (
                <img
                  src={product.images[selectedImage]?.url}
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/komu.png"
                  alt="Sin productos"
                  className="h-16 w-auto opacity-30 invert"
                />
              )}
              {product.category && (
                <Badge variant="destructive" className="font-display absolute top-3 left-3 bg-foreground text-balance">
                  {product.category}
                </Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center mt-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`cursor-pointer border rounded-md p-1 transition-all duration-200 ${selectedImage === idx ? "border-primary ring-2 ring-primary" : "border-gray-200"
                      }`}
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
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button size="lg" onClick={handleAddToCart} className="cursor-pointer flex-1 hover:bg-black/80">
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
    </div>
  )
}
