export const PRODUCT_CATEGORIES = `categories {
  title
  id
  breadcrumbs {
    id
    label
  }
}`

export const CATEGORIES = `
  query Categories($locale: LocaleInputType) {
    Categories(limit: 300, locale: $locale) {
      docs {
        id
        title
        media {
          alt
          width
          height
          url
        }
      }
    }
  }
`
