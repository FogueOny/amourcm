import './globals.css'
import { Inter, Dancing_Script } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing-script'
})

export const metadata = {
  title: 'Girlfriend Day - Messages d\'Amour',
  description: 'Créez et partagez des messages d\'amour personnalisés',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${dancingScript.variable}`}>
        {children}
      </body>
    </html>
  )
}