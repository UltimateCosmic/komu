# Komu Catalog

Este es un proyecto de caso técnico para la gestión de un Catálogo de Pizarras o Antenas, desarrollado para postular a una empresa.

Proyecto desarrollado con [Next.js](https://nextjs.org) y [Prisma](https://www.prisma.io/), inicializado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tabla de Contenidos
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Base de Datos y Prisma](#base-de-datos-y-prisma)
- [Scripts Disponibles](#scripts-disponibles)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd komu-catalog
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Inicia el servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

Puedes editar la página principal modificando `app/page.tsx`. Los cambios se reflejan automáticamente.

## Estructura del Proyecto

```
components.json
prisma/           # Esquema y migraciones de la base de datos
app/              # Rutas, páginas y API
components/       # Componentes reutilizables (UI)
lib/              # Utilidades y configuración de Prisma
public/           # Archivos estáticos
```

## Base de Datos y Prisma

- El esquema de la base de datos se encuentra en `prisma/schema.prisma`.
- Para aplicar migraciones y generar el cliente Prisma:
  ```bash
  npx prisma migrate dev
  npx prisma generate
  ```
- La base de datos de desarrollo es SQLite (`prisma/dev.db`).

## Scripts Disponibles

- `dev`: Inicia el servidor de desarrollo.
- `build`: Compila la aplicación para producción.
- `start`: Inicia la aplicación en modo producción.
- `prisma`: Ejecuta comandos de Prisma (migraciones, generación de cliente, etc).
  
  Se pueden insertar productos de prueba:
  
  ```bash
  npx prisma studio
  ```
  Esto abre una UI en el navegador donde se pueden agregar productos manualmente.
- `lint`: Ejecuta el linter para mantener la calidad del código.

## Recursos
- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Prisma](https://www.prisma.io/docs)
- [Aprende Next.js](https://nextjs.org/learn)
- [Repositorio Next.js en GitHub](https://github.com/vercel/next.js)

## Despliegue

La forma más sencilla de desplegar tu app Next.js es usando [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
