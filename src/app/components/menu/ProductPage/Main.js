import dynamic from 'next/dynamic'

const ProductPage = dynamic(() => import('./ProductPage'), {
  ssr: true,
})

export default function Main() {
  return <ProductPage />
}