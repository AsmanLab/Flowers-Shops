'use client'

import React, { createContext, useContext, useState } from 'react'

import { getTranslation, Locale } from '../../_locales'

interface TranslationContextProps {
    t: (key: string) => string
    locale: Locale
    setLocale: (locale: Locale) => void
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined)

export const TranslationProvider: React.FC<{
    children: React.ReactNode
    initialLocale?: Locale
}> = ({ children, initialLocale = 'en' }) => {
    const [locale, setLocaleState] = useState<Locale>(initialLocale)
    const translations = getTranslation(locale)

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale)
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000;`
        window.location.reload()
    }

    const t = (key: string): string => {
        const keys = key.split('.')
        let value: any = translations

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k]
            } else {
                return key
            }
        }

        return typeof value === 'string' ? value : key
    }

    return (
        <TranslationContext.Provider value={{ t, locale, setLocale }}>
            {children}
        </TranslationContext.Provider>
    )
}

export const useTranslation = () => {
    const context = useContext(TranslationContext)
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider')
    }
    return context
}
