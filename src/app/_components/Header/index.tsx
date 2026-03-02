{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import Link from 'next/link'

import type { Header as HeaderType } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import HeaderComponent from './HeaderComponent'

import { cookies } from 'next/headers'

export async function Header() {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  let header: HeaderType | null = null

  try {
    header = await fetchHeader(locale)
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <HeaderComponent header={header} />
    </>
  )
}
