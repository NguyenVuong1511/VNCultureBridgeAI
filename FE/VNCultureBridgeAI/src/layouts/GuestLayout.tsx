import { Outlet, useSearchParams } from 'react-router-dom'
import { SiteFooter } from '../components/navigation/SiteFooter'
import { SiteHeader } from '../components/navigation/SiteHeader'
import type { Language } from '../types/content'

export function GuestLayout() {
  const [searchParams, setSearchParams] = useSearchParams()
  const language = (searchParams.get('lang') === 'en' ? 'en' : 'vi') as Language

  const handleLanguageChange = (nextLanguage: Language) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('lang', nextLanguage)
    setSearchParams(nextParams)
  }

  return (
    <div className="guest-layout">
      <SiteHeader language={language} onChangeLanguage={handleLanguageChange} />
      <Outlet context={{ language }} />
      <SiteFooter language={language} />
    </div>
  )
}
