import React from 'react'
import Link from 'next/link'

import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'

import { getTranslation, Locale } from '../../_locales'
import classes from './index.module.scss'

const Categories = ({ categories, locale }: { categories: Category[]; locale?: Locale }) => {
  const t = getTranslation(locale)

  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>{t.categories.shopByCategories}</h3>
        <Link href="/products">{t.categories.showAll}</Link>
      </div>

      <div className={classes.list}>
        {categories &&
          categories.map(category => {
            return <CategoryCard key={category.id} category={category} />
          })}
      </div>
    </section>
  )
}

export default Categories
