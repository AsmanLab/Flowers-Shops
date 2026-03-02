import { PRODUCT } from './products'

export const ORDERS = `
  query Orders($locale: LocaleInputType) {
    Orders(limit: 300, locale: $locale) {
      docs {
        id
      }
    }
  }
`

export const ORDER = `
  query Order($id: String, $locale: LocaleInputType) {
    Orders(where: { id: { equals: $id} }, locale: $locale) {
      docs {
        id
        orderedBy
        items {
          product ${PRODUCT}
          title
          priceJSON
        }
      }
    }
  }
`
