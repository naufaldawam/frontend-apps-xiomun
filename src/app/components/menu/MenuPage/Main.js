import dynamic from 'next/dynamic'

const MenuPage = dynamic(() => import('./MenuPage'), {
  ssr: true,
})

export default function Main() {
  return <MenuPage />
}