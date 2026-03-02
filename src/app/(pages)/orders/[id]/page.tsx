import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import type { Order as OrderType } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Gutter } from '../../../_components/Gutter'
import { HR } from '../../../_components/HR'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { getMeUser } from '../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

import { cookies } from 'next/headers'
import { getTranslation, Locale } from '../../../_locales'

export default async function Order({ params: { id } }) {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      t.orders.mustBeLoggedIn,
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
  })

  let order: OrderType | null = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!order) {
    notFound()
  }

  return (
    <Gutter className={classes.orders}>
      <h1>
        {t.orders.order}
        <span className={classes.id}>{` ${order.id}`}</span>
      </h1>
      <div className={classes.itemMeta}>
        <p>{`${t.orders.orderID}: ${order.id}`}</p>
        <p>{`${t.orders.paymentIntent}: ${order.stripePaymentIntentID}`}</p>
        <p>{`${t.orders.orderedOn}: ${formatDateTime(order.createdAt)}`}</p>
        <p className={classes.total}>
          {`${t.orders.total}: `}
          {new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'usd',
          }).format(order.total / 100)}
        </p>
      </div>
      <HR />
      <div className={classes.order}>
        <h4 className={classes.orderItems}>{t.orders.items}</h4>
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title, meta, stripeProductID },
            } = item

            const isLast = index === (order?.items?.length || 0) - 1

            const metaImage = meta?.image

            return (
              <Fragment key={index}>
                <div className={classes.row}>
                  <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                    {!metaImage && <span className={classes.placeholder}>{t.cart.noImage}</span>}
                    {metaImage && typeof metaImage !== 'string' && (
                      <Media
                        className={classes.media}
                        imgClassName={classes.image}
                        resource={metaImage}
                        fill
                      />
                    )}
                  </Link>
                  <div className={classes.rowContent}>
                    {!stripeProductID && (
                      <p className={classes.warning}>
                        {t.orders.stripeWarning}
                        <Link
                          href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
                        >
                          {t.orders.editInAdmin}
                        </Link>
                        {'.'}
                      </p>
                    )}
                    <h5 className={classes.title}>
                      <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                        {title}
                      </Link>
                    </h5>
                    <p>{`${t.orders.quantity}: ${quantity}`}</p>
                    <Price product={product} button={false} quantity={quantity} />
                  </div>
                </div>
                {!isLast && <HR />}
              </Fragment>
            )
          }

          return null
        })}
      </div>
      <HR />
      <div className={classes.actions}>
        <Button href="/orders" appearance="primary" label={t.orders.viewAllOrders} />
        <Button href="/account" appearance="secondary" label={t.orders.viewAccount} />
      </div>
    </Gutter>
  )
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return {
    title: `${t.orders.order} ${id}`,
    description: `${t.orders.order} ${id}`,
    openGraph: mergeOpenGraph({
      title: `${t.orders.order} ${id}`,
      url: `/orders/${id}`,
    }),
  }
}
