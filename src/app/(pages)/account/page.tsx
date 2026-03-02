import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

import { cookies } from 'next/headers'
import { getTranslation, Locale } from '../../_locales'

export default async function Account() {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return (
    <div>
      <h5 className={classes.personalInfo}>{t.account.personalInfo}</h5>
      <AccountForm />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return {
    title: t.account.title,
    description: t.account.description,
    openGraph: mergeOpenGraph({
      title: t.account.title,
      url: '/account',
    }),
  }
}
