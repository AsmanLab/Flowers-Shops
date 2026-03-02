'use client'

import React from 'react'
import Image from 'next/image'

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'

import { useTranslation } from '../../_providers/Translate'
import classes from './index.module.scss'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
}> = props => {
  const { className, product } = props

  const { deleteItemFromCart, isProductInCart } = useCart()

  const productIsInCart = isProductInCart(product)

  const { t } = useTranslation()

  if (!productIsInCart) {
    return <div>{t('cart.itemNotInCart')}</div>
  }

  return (
    <button
      type="button"
      onClick={() => {
        deleteItemFromCart(product)
      }}
      className={[className, classes.removeFromCartButton].filter(Boolean).join(' ')}
    >
      <Image
        src="/assets/icons/delete.svg"
        alt="delete"
        width={24}
        height={24}
        className={classes.qtnBt}
      />
    </button>
  )
}
