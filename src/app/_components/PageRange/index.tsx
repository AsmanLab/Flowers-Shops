'use client'

import React from 'react'
import { useTranslation } from '../../_providers/Translate'

import classes from './index.module.scss'

const defaultLabels = {
  singular: 'Doc',
  plural: 'Docs',
}

const defaultCollectionLabels = {
  products: {
    singular: 'Product',
    plural: 'Products',
  },
}

export const PageRange: React.FC<{
  className?: string
  totalDocs?: number
  currentPage?: number
  collection?: string
  limit?: number
  collectionLabels?: {
    singular?: string
    plural?: string
  }
}> = props => {
  const {
    className,
    totalDocs,
    currentPage,
    collection,
    limit,
    collectionLabels: collectionLabelsFromProps,
  } = props

  const indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { singular, plural } =
    collectionLabelsFromProps || defaultCollectionLabels[collection || ''] || defaultLabels || {}

  const { t } = useTranslation()

  return (
    <div className={[className, classes.pageRange].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && t('products.noResults')}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `${t('products.showing')} ${indexStart} - ${indexEnd} ${t('general.of')} ${totalDocs} ${totalDocs > 1 ? plural : singular}`}
    </div>
  )
}
