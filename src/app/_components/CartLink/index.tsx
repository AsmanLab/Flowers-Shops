'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { useCart } from '../../_providers/Cart'

import { useTranslation } from '../../_providers/Translate'
import classes from './index.module.scss'

export const CartLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  const { t } = useTranslation()

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/cart">
      <Fragment>
        {t('cart.cart')}
        {typeof length === 'number' && length > 0 && (
          <small className={classes.quantity}>({length})</small>
        )}
      </Fragment>
    </Link>
  )
}
