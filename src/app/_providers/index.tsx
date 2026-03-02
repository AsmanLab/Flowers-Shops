'use client'

import React from 'react'

import { AuthProvider } from '../_providers/Auth'
import { CartProvider } from '../_providers/Cart'
import { FilterProvider } from './Filter'
import { ThemeProvider } from './Theme'

import { Locale } from '../_locales'
import { TranslationProvider } from './Translate'

export const Providers: React.FC<{
  children: React.ReactNode
  initialLocale?: Locale
}> = ({ children, initialLocale }) => {
  return (
    <ThemeProvider>
      <TranslationProvider initialLocale={initialLocale}>
        <AuthProvider>
          <FilterProvider>
            <CartProvider>{children}</CartProvider>
          </FilterProvider>
        </AuthProvider>
      </TranslationProvider>
    </ThemeProvider>
  )
}
