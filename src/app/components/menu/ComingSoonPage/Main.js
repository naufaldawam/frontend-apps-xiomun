import dynamic from 'next/dynamic'

const ComingSoonPage = dynamic(() => import('./ComingSoonPage'), {
  ssr: true,
})

export default function Main() {
  return <ComingSoonPage />
}