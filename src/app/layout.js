import './globals.css'

export const metadata = {
  title: 'xiaomun app dev',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="font-['Plus_Sans_Jakarta']">{children}</body>
    </html>
  )
}
