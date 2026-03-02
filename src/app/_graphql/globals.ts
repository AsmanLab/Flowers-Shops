import { LINK_FIELDS } from './link'

export const HEADER = `
  Header {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const HEADER_QUERY = `
query Header($locale: LocaleInputType) {
  Header(locale: $locale) {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
}
`

export const FOOTER = `
  Footer {
    copyright
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const FOOTER_QUERY = `
query Footer($locale: LocaleInputType) {
  Footer(locale: $locale) {
    copyright
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
}
`

export const SETTINGS = `
  Settings {
    productsPage {
      slug
    }
  }
`

export const SETTINGS_QUERY = `
query Settings($locale: LocaleInputType) {
  Settings(locale: $locale) {
    productsPage {
      slug
    }
  }
}
`
