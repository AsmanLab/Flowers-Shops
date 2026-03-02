import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

import { cookies } from 'next/headers'
import { getTranslation, Locale } from '../../_locales'

export default async function OrderConfirmation() {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return (
    <Gutter className={classes.confirmationPage}>
      <Suspense fallback={<div>{t.general.loading}</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return {
    title: t.auth.orderConfirmationTitle || 'Order Confirmation',
    description: t.orderConfirmation.orderConfirmed,
    openGraph: mergeOpenGraph({
      title: t.auth.orderConfirmationTitle || 'Order Confirmation',
      url: '/order-confirmation',
    }),
  }
}
