import dynamic from 'next/dynamic'

const OfferingPage = dynamic(() => import('./OfferingPage'), {
  ssr: true,
})

export default function Main() {
  return <OfferingPage />
}