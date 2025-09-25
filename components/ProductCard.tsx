import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Minus, Plus } from "lucide-react"

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
  isHovered,
  onHover,
}: {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  isHovered: boolean
  onHover: (id: string | null) => void
}) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setQuantity(1)
  }

  return (
    <Card
      className="group cursor-pointer border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 bg-card"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted/20">
          <img
            src={product.images[0]?.url || "/placeholder.svg"}
            alt={product.images[0]?.alt || product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          <Badge variant="destructive" className="absolute top-3 left-3 bg-foreground text-balance">
            {product.category}
          </Badge>
        </div>
        <div className="p-6">
          <h3 className="font-medium text-foreground mb-2 text-pretty line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 text-pretty">{product.description}</p>
          <div className="space-y-3">
            <span className="text-2xl font-light text-foreground mb-2 inline-block">S/ {product.price.toFixed(2)}</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
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
                <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToCart()
                }}
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Agregar
                </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
