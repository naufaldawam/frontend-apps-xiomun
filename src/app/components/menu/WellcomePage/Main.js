import dynamic from 'next/dynamic'

const WellcomePage = dynamic(() => import('./WellcomePage'), {
  ssr: true,
})

export default function Main() {
  return <WellcomePage />
}