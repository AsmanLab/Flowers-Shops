'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import { useTranslation } from '../../../_providers/Translate'
import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  const { t } = useTranslation()

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>{t('orderConfirmation.paymentSuccessErrorProcessing')}</p>
          <div className={classes.actions}>
            <Button href="/account" label={t('orders.viewAccount')} appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label={t('orders.viewAllOrders')}
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>{t('orderConfirmation.thankYou')}</h1>
          <p>
            {t('orderConfirmation.orderConfirmed')} {t('orderConfirmation.orderID')} {orderID}.
          </p>
          <div className={classes.actions}>
            <Button
              href={`/account/orders/${orderID}`}
              label={t('orders.viewOrder')}
              appearance="primary"
            />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label={t('orders.viewAllOrders')}
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
