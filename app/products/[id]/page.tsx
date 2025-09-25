interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <div>Detalle del producto con id: {params.id}</div>;
}
