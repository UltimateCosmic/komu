# Komu Catalog

Este proyecto es un **Catálogo de Pizarras** desarrollado como caso técnico para postular a Komu.  
La aplicación permite explorar productos, filtrarlos por categoría o rango de precio, visualizar sus detalles y gestionar un carrito de compras con sincronización global.

Construido con tecnologías modernas y buenas prácticas para entregar una solución clara, escalable y profesional.

---

## Tecnologías Principales

- **[Next.js 15](https://nextjs.org/)**  
  Framework de React moderno, con `app router`, soporte a Server/Client components y optimización integrada.

- **[Prisma ORM](https://www.prisma.io/)**  
  - Justificación: Prisma se utilizó por su tipado fuerte con TypeScript, facilidad para definir relaciones (ej. productos ↔ imágenes) y tooling como Prisma Studio para manipular datos.  
  - Base de datos: **SQLite** en desarrollo, lo que facilita portabilidad y rapidez.

- **[TailwindCSS 4](https://tailwindcss.com/)**  
  Para el diseño responsivo y utilidades de estilos.

- **[shadcn/ui](https://ui.shadcn.com/)**  
  Librería de componentes accesibles y personalizables (ej. `Button`, `Card`, `Select`, `Slider`, `Sheet`).

- **[Lucide React](https://lucide.dev/)**  
  Conjunto de íconos modernos (ej. carrito, filtros, navegación).

- **Fuentes Google Fonts**  
  - `Inter`: fuente principal recomendada por shadcn.  
  - `Poppins`: usada para headers y subtítulos (ej. Categorías, Rango de Precio).

---

## Estructura del Proyecto

```
komu-catalog/
├─ app/                 # Rutas y páginas
│  ├─ layout.tsx        # Layout global con Header, Footer y CartProvider
│  ├─ page.tsx          # Página principal con filtros y productos
│  ├─ [id]/page.tsx     # Página de detalle del producto
│  └─ api/[id]/route.ts # API REST para productos individuales
├─ components/          # Componentes UI reutilizables (shadcn + custom)
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  ├─ ProductCard.tsx
│  └─ ui/               # Componentes shadcn exportados
├─ context/CartContext.tsx # Contexto global del carrito
├─ prisma/
│  ├─ schema.prisma     # Definición del modelo (Product, Image)
│  └─ seed.ts           # Script de seed con productos reales
├─ public/              # Archivos estáticos (ej. logo komu.png)
└─ package.json
```

---

## Base de Datos con Prisma

Modelo definido en `prisma/schema.prisma`:

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  category    String
  images      Image[]
}

model Image {
  id        String   @id @default(cuid())
  url       String
  alt       String?
  product   Product  @relation(fields: [productId], references: [id])
  productId String
}
```

### Seed de datos

Archivo `prisma/seed.ts` incluye productos reales (extraídos de Tay Loy) con múltiples imágenes.

Ejecutar:

```bash
npx prisma db seed
```

Scripts configurados en `package.json`:

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

---

## Funcionalidades

- **Página principal** (`/`)  
  - Filtros: Categorías (Acrílica, Magnética, Vidrio, etc.) y rango de precios.  
  - Ordenamiento: nombre o precio (asc/desc).  
  - Vista responsiva con grid adaptable.

- **Carrito global**  
  - Implementado con Context API (`CartContext`).  
  - Se mantiene al navegar entre páginas.  
  - Muestra cantidades, subtotal y permite modificar/eliminar productos.

- **Detalle de producto** (`/[id]`)  
  - Vista ampliada con galería de imágenes.  
  - Botón para agregar cantidades al carrito.  
  - Sección de features (envío gratis, garantía, devoluciones).  
  - Breadcrumb con botón de retorno.

- **API interna**  
  - `GET /api/[id]`: devuelve producto por ID (con imágenes).  
  - `PUT /api/[id]`: actualizar producto.  
  - `DELETE /api/[id]`: eliminar producto.  
  - Futuro escalable para `/api/products`.

---

## 🔧 Scripts Disponibles

- `npm run dev` → Inicia servidor en desarrollo.  
- `npm run build` → Compila para producción.  
- `npm run start` → Ejecuta compilado.  
- `npm run lint` → Corre el linter.  
- `npx prisma studio` → Interfaz gráfica para manipular BD.  
- `npx prisma db seed` → Poblar la BD con productos iniciales.

---

## Conclusión

Este proyecto demuestra:
- Uso profesional de **Next.js + Prisma** para un CRUD completo.  
- Implementación de **UI moderna y accesible** con shadcn/ui y Tailwind.  
- Manejo de **estado global** para carrito con Context API.  
- Semillas de datos realistas para pruebas (Tay Loy).  

Entrega lista para producción y fácil de desplegar en [Vercel](https://vercel.com).

---

## Recursos

- [Next.js Docs](https://nextjs.org/docs)  
- [Prisma Docs](https://www.prisma.io/docs)  
- [shadcn/ui](https://ui.shadcn.com/)  
- [Lucide React](https://lucide.dev/)  