import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'

import { cookies } from 'next/headers'
import { getTranslation, Locale } from '../../_locales'

export default async function CreateAccount() {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(t.auth.alreadyLoggedInCreateAccount)}`,
  })

  return (
    <section className={classes.createAccount}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/logo-black.svg"
            alt="logo"
            width={250}
            height={23}
            className={classes.logo}
          />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3>{t.auth.createAccountTitle}</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p>{t.auth.pleaseEnterDetails}</p>

          <CreateAccountForm />
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return {
    title: t.auth.createAccountTitle,
    description: t.auth.pleaseEnterDetails,
    openGraph: mergeOpenGraph({
      title: t.auth.createAccountTitle,
      url: '/account',
    }),
  }
}
