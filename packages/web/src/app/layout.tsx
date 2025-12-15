import Toaster from "@rahoot/web/components/Toaster"
import { SocketProvider } from "@rahoot/web/contexts/socketProvider"
import env from "@rahoot/web/env"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { PropsWithChildren } from "react"
import "./globals.css"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Rahoot !",
  icons: "/icon.svg",
}

const RootLayout = ({ children }: PropsWithChildren) => {
  const backgroundImageUrl = env.BACKGROUND_IMAGE_URL
  const hasCustomBackground = !!backgroundImageUrl && backgroundImageUrl.trim() !== ''
  
  console.log('Background Image URL:', backgroundImageUrl, 'Has Custom:', hasCustomBackground)
  
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed="true">
      <head>
        {hasCustomBackground && (
          <style>{`
            body {
              background-image: url(${backgroundImageUrl}) !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
              background-color: transparent !important;
            }
          `}</style>
        )}
      </head>
      <body 
        className={`${montserrat.variable} ${hasCustomBackground ? '' : 'bg-secondary'} antialiased`}
      >
        <SocketProvider>
          <main className="text-base-[8px] flex flex-col">{children}</main>
          <Toaster />
        </SocketProvider>
      </body>
    </html>
  )
}

export default RootLayout
