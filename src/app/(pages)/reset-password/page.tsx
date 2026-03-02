import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { ResetPasswordForm } from './ResetPasswordForm'

import classes from './index.module.scss'

import { cookies } from 'next/headers'
import { getTranslation, Locale } from '../../_locales'

export default async function ResetPassword() {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return (
    <Gutter className={classes.resetPassword}>
      <h1>{t.auth.resetPasswordTitle}</h1>
      <p>{t.auth.resetPasswordDescription}</p>
      <ResetPasswordForm />
    </Gutter>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return {
    title: t.auth.resetPasswordTitle,
    description: t.auth.resetPasswordDescription,
    openGraph: mergeOpenGraph({
      title: t.auth.resetPasswordTitle,
      url: '/reset-password',
    }),
  }
}
