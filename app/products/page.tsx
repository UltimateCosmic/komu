"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/ProductCard"

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

const categories = ["Acrílica", "Magnética", "Vidrio", "Corcho", "Blanca", "Multiusos"]

// JSON de prueba incrustado
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
    description:
      "Descubre esta pizarra blanca laminada para cálculos y escritura en gran formato.",
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
    description:
      "Pizarra acrílica económica y duradera en formato 30 x 40 cm.",
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
    description:
      "Pizarra fabricada en MDF, irrompible e ideal para dibujar, escribir y planificar.",
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
    description:
      "Pizarra de corcho compacta (20 x 30 cm), ideal para notas y recordatorios en espacios pequeños.",
    price: 10.7,
    category: "Corcho",
    images: [
      {
        url: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/p/i/pizarra-de-corcho-economica-20x30-cm-85899-default-1.jpg",
        alt: "Pizarra de Corcho 20x30",
      },
    ],
  },
  {
    id: "7",
    name: "Pizarra De Corcho Importada 0.45 X 0.60 M",
    description:
      "Pizarra de corcho importada (0.45 x 0.60 m), superficie resistente y fácil de usar.",
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortOrder, setSortOrder] = useState("name-asc")
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Traer productos desde nuestra API (que usa Prisma)
  /*useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])*/

  // Usar el JSON mock directamente (temporal)
  useEffect(() => {
    // aquí usamos el JSON mock
    setProducts(mockProducts)
  }, [])

  const filteredAndSortedProducts = products
    .filter((product) => {
      if (selectedCategories.length === 0) return true
      return selectedCategories.some((category) => product.category === category)
    })
    .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-desc":
          return b.name.localeCompare(a.name)
        default: // name-asc
          return a.name.localeCompare(b.name)
      }
    })

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, category]
      } else {
        return prev.filter((cat) => cat !== category)
      }
    })
  }

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

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 text-balance">
            Organización perfecta
            <br />
            <span className="font-normal">meets diseño exquisito</span>
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
                <h3 className="font-medium text-foreground mb-4">Categorías</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
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
                <h3 className="font-medium text-foreground mb-4">Rango de Precio</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={5}
                    className="w-full"
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
                <p className="text-sm text-muted-foreground">Mostrando {filteredAndSortedProducts.length} productos</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Ordenar por:</span>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Nombre A-Z</SelectItem>
                      <SelectItem value="name-desc">Nombre Z-A</SelectItem>
                      <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <img src="/komu.png" alt="Sin productos" className="h-16 w-auto mb-6 opacity-50 invert" />
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
