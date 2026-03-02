'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'
import { useTranslation } from '../../../_providers/Translate'
import { LanguageSwitcher } from '../../LanguageSwitcher'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        let label = link.label
        if (label === 'Home') label = t('general.home')
        if (label === 'Shop') label = t('general.shopCollections')
        return <CMSLink key={i} {...link} label={label} appearance="none" />
      })}
      <CartLink />
      {user && <Link href="/account">{t('general.account')}</Link>}
      {!user && (
        <Button
          el="link"
          href="/login"
          label={t('general.login')}
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      <LanguageSwitcher />
    </nav>
  )
}
