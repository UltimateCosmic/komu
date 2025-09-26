"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/context/CartContext"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: { url: string; alt?: string }[]
}

const categories = ["Acrílica", "Magnética", "Vidrio", "Corcho", "Blanca", "Multiusos"]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortOrder, setSortOrder] = useState("name-asc")
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()

  // Traer productos desde nuestra API (que usa Prisma)
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const res = await fetch("/api")
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filteredAndSortedProducts = products
    .filter((p) => selectedCategories.length === 0 || selectedCategories.includes(p.category))
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortOrder) {
        case "price-asc": return a.price - b.price
        case "price-desc": return b.price - a.price
        case "name-desc": return b.name.localeCompare(a.name)
        default: return a.name.localeCompare(b.name)
      }
    })

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    )
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: "url('/topographic-map.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/100 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-regular text-foreground mb-6 text-balance">
            Organización perfecta
            <br />
            <span className="font-bold">meets diseño exquisito</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transforma tu espacio de trabajo con nuestra colección de pizarras premium, diseñadas para la productividad
            y el estilo.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 space-y-6 border border-gray-200 rounded-lg p-6 h-fit shadow-sm">
              <div>
                <h3 className="font-display font-semibold text-foreground mb-4">Categorías</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="cursor-pointer flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-foreground mb-4">Rango de Precio</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={5}
                    className="cursor-pointer w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>S/ {priceRange[0]}</span>
                    <span>S/ {priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-semibold text-4xl">Pizarras</h3>
                  <p className="text-sm text-muted-foreground">Mostrando {filteredAndSortedProducts.length} productos</p>
                </div>
                <div className="flex flex-col items-end space-y-1 w-full max-w-xs ml-auto">
                  <span className="text-sm text-muted-foreground">Ordenar por:</span>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="cursor-pointer w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc" className="cursor-pointer">Nombre A-Z</SelectItem>
                      <SelectItem value="name-desc" className="cursor-pointer">Nombre Z-A</SelectItem>
                      <SelectItem value="price-asc" className="cursor-pointer">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-desc" className="cursor-pointer">Precio: Mayor a Menor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <img src="/komu.png" alt="Sin productos" className="h-16 w-auto mb-6 opacity-30 invert" />
                    <p className="text-lg text-muted-foreground">Cargando productos...</p>
                  </div>
                ) : filteredAndSortedProducts.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <img src="/komu.png" alt="Sin productos" className="h-16 w-auto mb-6 opacity-30 invert" />
                    <p className="text-lg text-muted-foreground">No se encontraron productos para los filtros seleccionados.</p>
                  </div>
                ) : (
                  filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      isHovered={hoveredProduct === product.id}
                      onHover={setHoveredProduct}
                    />
                  ))
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
