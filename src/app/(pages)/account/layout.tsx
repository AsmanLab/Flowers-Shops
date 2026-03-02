import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { profileNavItems } from '../../constants/'
import { UserInfo } from './UserInfo'

import classes from './index.module.scss'

import { cookies } from 'next/headers'
import { getTranslation, Locale } from '../../_locales'

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  const navItems = [
    {
      title: t.account.personalInfo,
      url: '/account',
      icon: '/assets/icons/user.svg',
    },
    {
      title: t.account.myPurchases,
      url: '/account/purchases',
      icon: '/assets/icons/purchases.svg',
    },
    {
      title: t.account.myOrders,
      url: '/account/orders',
      icon: '/assets/icons/orders.svg',
    },
    {
      title: t.general.logout,
      url: '/logout',
      icon: '/assets/icons/logout.svg',
    },
  ]

  return (
    <div className={classes.container}>
      <Gutter>
        <h3>{t.account.myProfile || 'My Profile'}</h3>
        <div className={classes.account}>
          <div className={classes.nav}>
            <UserInfo />

            <ul>
              {navItems.map(item => (
                <li key={item.title}>
                  <Link href={item.url} className={classes.navItem}>
                    <Image src={item.icon} alt={item.title} width={24} height={24} />
                    <p>{item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </Gutter>
    </div>
  )
}
