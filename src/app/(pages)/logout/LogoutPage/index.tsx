'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { useTranslation } from '../../../_providers/Translate'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess(t('auth.logoutSuccess'))
      } catch (_) {
        setError(t('auth.alreadyLoggedOut'))
      }
    }

    performLogout()
  }, [logout, t])

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {t('auth.whatNext')}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {' '}
                <Link href={`/${productsPage.slug}`}>{t('auth.shopLink')}</Link>
                {t('auth.toShop')}
              </Fragment>
            )}
            {t('auth.toLogBackIn')}
            <Link href="/login">{t('auth.loginLink').toLowerCase()}</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
