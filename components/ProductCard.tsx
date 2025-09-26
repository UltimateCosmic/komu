import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: { url: string; alt?: string }[]
}

export default function ProductCard({
  product,
  onAddToCart,
  onHover,
}: {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  isHovered: boolean
  onHover: (id: string | null) => void
}) {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setQuantity(1)
  }

  const handleCardClick = () => {
    router.push(`/${product.id}`)
  }

  return (
    <Card
      className="group cursor-pointer border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 bg-card"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted/20">
            <div className="flex items-center justify-center w-full h-full">
            {product.images[0]?.url ? (
              <img
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <img
              src="/komu.png"
              alt="Sin productos"
              className="h-16 w-auto opacity-30 invert mx-auto my-auto"
              />
            )}
            </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          {product.category && (
            <Badge variant="destructive" className="font-display absolute top-3 left-3 bg-foreground text-balance">
              {product.category}
            </Badge>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-medium text-foreground mb-2 text-pretty line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 text-pretty">{product.description}</p>
          <div className="space-y-3">
            <span className="font-display text-2xl font-light text-foreground mb-2 inline-block">S/ {product.price.toFixed(2)}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuantity(Math.max(1, quantity - 1))
                  }}
                  disabled={quantity <= 1}
                  className="cursor-pointer"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm w-8 text-center">{quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuantity(quantity + 1)
                  }}
                  className="cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart()
                  }}
                  className="w-full cursor-pointer hover:bg-black/80"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
