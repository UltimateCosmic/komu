import { Button } from "@/components/ui/button"
import { Minus, Plus, Search, ShoppingCart, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  cart: Array<{
    product: {
      id: string
      name: string
      price: number
      images: { url: string; alt?: string }[]
    }
    quantity: number
  }>
  updateQuantity: (productId: string, newQuantity: number) => void
  removeFromCart: (productId: string) => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export default function Header({
  isCartOpen,
  setIsCartOpen,
  cart,
  updateQuantity,
  removeFromCart,
  getTotalItems,
  getTotalPrice,
}: HeaderProps) {
  return (
    <header className="border-b border-white/20 bg-black backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <img src="/komu.png" alt="Pizarras Premium Logo" className="h-6 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
              <Search className="h-4 w-4" />
            </Button>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-white/80 hover:text-white hover:bg-white/10"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {/* Badge absoluto */}
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Carrito de Compras</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Tu carrito está vacío</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <img
                            src={item.product.images[0]?.url || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">S/ {item.product.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.product.id)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-lg">S/ {getTotalPrice().toFixed(2)}</span>
                        </div>
                        <Button className="w-full">Proceder al Pago</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
