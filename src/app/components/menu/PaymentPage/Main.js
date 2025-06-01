import dynamic from 'next/dynamic'

const PaymentPage = dynamic(() => import('./PaymentPage'), {
  ssr: true,
})

export default function Main() {
  return <PaymentPage />
}