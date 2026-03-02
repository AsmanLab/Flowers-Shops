'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../../_providers/Translate'
import { Locale, locales } from '../../_locales'
import classes from './index.module.scss'

export const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={classes.container} ref={containerRef}>
            <button
                type="button"
                className={classes.trigger}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={classes.icon}>🌐</span>
                <span className={classes.current}>{locale.toUpperCase()}</span>
            </button>
            {isOpen && (
                <ul className={classes.dropdown}>
                    {Object.keys(locales).map(loc => (
                        <li key={loc}>
                            <button
                                type="button"
                                className={[classes.option, locale === loc && classes.active]
                                    .filter(Boolean)
                                    .join(' ')}
                                onClick={() => {
                                    setLocale(loc as Locale)
                                    setIsOpen(false)
                                }}
                            >
                                {loc.toUpperCase()}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
