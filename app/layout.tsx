import type { Metadata } from "next"
import { Sarabun } from "next/font/google"
import Layout from "@/components/Layout"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import CheckEmail from "./checkEmail"
import { Toaster } from "@/components/ui/toaster"
import Providers from "./providers"

const sarabun = Sarabun({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Sharmble Organization",
  description: "Create with 🧡 form Tech Team",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={sarabun.className}>
          <Providers>
            <Toaster />
            <Layout>
              <CheckEmail>{children}</CheckEmail>
            </Layout>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
