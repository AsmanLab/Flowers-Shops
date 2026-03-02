import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { PRODUCT_CATEGORIES } from './categories'
import { META } from './meta'

export const PRODUCTS = `
  query Products($locale: LocaleInputType) {
    Products(limit: 300, locale: $locale) {
      docs {
        slug
      }
    }
  }
`

export const PRODUCT = `
  query Product($slug: String, $draft: Boolean, $locale: LocaleInputType) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft, locale: $locale) {
      docs {
        id
        title
        stripeProductID
        ${PRODUCT_CATEGORIES}
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        priceJSON
        enablePaywall
        relatedProducts {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean, $locale: LocaleInputType) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft, locale: $locale) {
      docs {
        paywall {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
