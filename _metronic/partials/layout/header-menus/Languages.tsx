import { translate } from '@helpers'
import { setLanguage, useLang } from '@metronic/i18n/Metronici18n'
import clsx from 'clsx'
import { FC } from 'react'

const Languages: FC = () => {
  const languages = [
    {
      lang: 'en',
      name: translate('ENGLISH'),
      flag: '/media/flags/us.svg',
    },
    {
      lang: 'ko',
      name: translate('KOREA'),
      flag: '/media/flags/kr.svg',
    },
    {
      lang: 'id',
      name: translate('INDONESIA'),
      flag: '/media/flags/id.svg',
    },
  ]
  const lang = useLang()
  const currentLanguage = languages.find((x) => x.lang === lang)
  return (
    <div
      className='menu-item px-5'
      data-kt-menu-trigger="{default:'click', 'lg':'hover'}"
      data-kt-menu-placement="{default:'bottom', 'lg':'left-start'}"
      data-kt-menu-flip='bottom'>
      <a href='#' className='menu-link px-5'>
        <span className='menu-title position-relative'>
          {translate('LANGUAGE')}
          <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
            <span className=''>{currentLanguage?.name}</span>
            <img
              className='w-15px h-15px rounded-1 ms-2'
              src={currentLanguage?.flag}
              alt='metronic'
            />
          </span>
        </span>
      </a>

      <div className='menu-sub menu-sub-dropdown w-175px py-4'>
        {languages.map((l) => (
          <div
            className='menu-item px-3'
            key={l.lang}
            onClick={() => {
              setLanguage(l.lang)
            }}>
            <a
              href='#'
              className={clsx('menu-link d-flex px-5', {
                active: l.lang === currentLanguage?.lang,
              })}>
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={l.flag} alt='metronic' />
              </span>
              {l.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Languages }
