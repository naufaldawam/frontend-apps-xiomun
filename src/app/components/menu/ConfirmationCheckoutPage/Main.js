import dynamic from 'next/dynamic'

const ConfirmationCheckoutPage = dynamic(() => import('./ConfirmationCheckoutPage'), {
  ssr: true,
})

export default function Main() {
  return <ConfirmationCheckoutPage />
}