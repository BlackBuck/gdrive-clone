import "../styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "JAM Drive",
  description: "A basic Google Drive UI clone",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
          <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  )
}

