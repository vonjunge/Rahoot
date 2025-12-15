'use client'

import { useEffect } from 'react'

interface BackgroundStylerProps {
  backgroundImageUrl?: string
}

export default function BackgroundStyler({ backgroundImageUrl }: BackgroundStylerProps) {
  useEffect(() => {
    if (backgroundImageUrl && backgroundImageUrl.trim() !== '') {
      const style = document.createElement('style')
      style.id = 'custom-background-style'
      style.innerHTML = `
        body {
          background-image: url(${backgroundImageUrl}) !important;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-attachment: fixed !important;
        }
      `
      document.head.appendChild(style)
      
      // Remove bg-secondary class
      document.body.classList.remove('bg-secondary')
      
      return () => {
        const existingStyle = document.getElementById('custom-background-style')
        if (existingStyle) {
          existingStyle.remove()
        }
      }
    }
  }, [backgroundImageUrl])

  return null
}
