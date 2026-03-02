import { cookies } from 'next/headers'
import { getTranslation, Locale } from '../_locales'
import { Button } from '../_components/Button'
import { Gutter } from '../_components/Gutter'
import { VerticalPadding } from '../_components/VerticalPadding'

export default function NotFound() {
  const cookieStore = cookies()
  const locale = (cookieStore.get('locale')?.value || 'en') as Locale
  const t = getTranslation(locale)

  return (
    <Gutter>
      <VerticalPadding top="none" bottom="large">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p>{t.general.pageNotFound}</p>
        <Button href="/" label={t.general.goHome} appearance="primary" />
      </VerticalPadding>
    </Gutter>
  )
}
