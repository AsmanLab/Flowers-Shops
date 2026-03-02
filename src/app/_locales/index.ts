import { en } from './en'
import { ru } from './ru'

export type Locale = 'en' | 'ru'

export const locales = {
    en: 'English',
    ru: 'Русский',
}

const translations = {
    en,
    ru,
}

export const getTranslation = (locale: Locale = 'en') => {
    return translations[locale] || translations.en
}

export type TranslationKeys = typeof en

export { en, ru }
