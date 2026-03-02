import React from 'react'
import Link from 'next/link'

import type { Footer as FooterType } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'
import FooterComponent from './FooterComponent'

import { cookies } from 'next/headers'

export async function Footer() {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  let footer: FooterType | null = null

  try {
    footer = await fetchFooter(locale)
  } catch (error) {
    console.log(error)
  }

  const navItems = footer?.navItems || []

  return (
    <>
      <FooterComponent footer={footer} />
    </>
  )
}
