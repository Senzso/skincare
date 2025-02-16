import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShendetiYt - Analizuesi i Produkteve të Kujdesit për Lëkurën, Trupin dhe Flokët",
  description: "Analizoni shëndetin e produkteve tuaja të kujdesit për lëkurën, trupin dhe flokët me ShendetiYt",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sq">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'