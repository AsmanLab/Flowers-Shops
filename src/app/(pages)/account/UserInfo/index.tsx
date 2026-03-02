'use client'

import React from 'react'
import Image from 'next/image'

import { useAuth } from '../../../_providers/Auth'
import { useTranslation } from '../../../_providers/Translate'

import classes from './index.module.scss'

export const UserInfo = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <div className={classes.profile}>
      <Image src="/assets/icons/profile.svg" alt={t('general.account')} width={50} height={50} />

      <div className={classes.profileInfo}>
        <p className={classes.name}>{user?.name}</p>
        <p className={classes.email}>{user?.email}</p>
      </div>
    </div>
  )
}
