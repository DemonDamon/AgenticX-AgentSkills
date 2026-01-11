import { createContext, useContext, useState, ReactNode } from 'react'
import enTranslations from './locales/en'
import zhTranslations from './locales/zh'

type Locale = 'en' | 'zh'

type Translations = typeof enTranslations

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  zh: zhTranslations,
}

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('locale')
    return (saved === 'zh' || saved === 'en') ? saved : 'en'
  })

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string): string => {
    const translation = getNestedValue(translations[locale], key)
    return translation || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
