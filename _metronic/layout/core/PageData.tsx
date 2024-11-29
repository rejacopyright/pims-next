/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
  logoReplacement?: ReactNode
  setLogoReplacement: (_component: ReactNode) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => null,
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => null,
  setPageDescription: (_description: string) => null,
  setLogoReplacement: (_component: ReactNode) => null,
})

const PageDataProvider: FC<any> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [logoReplacement, setLogoReplacement] = useState<ReactNode>()
  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    logoReplacement,
    setLogoReplacement,
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
  children?: any
}

const PageTitle: FC<Props> = ({ children, description, breadcrumbs }) => {
  const { setPageTitle, setPageDescription, setPageBreadcrumbs } = usePageData()
  useEffect(() => {
    if (children) {
      document.title = children?.toString()
      setPageTitle(children.toString())
    }
    return () => {
      document.title = 'PIMS Club'
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return null
}

const PageDescription: FC<any> = ({ children }) => {
  const { setPageDescription } = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return null
}

const CustomLogo: FC<any> = ({ children }) => {
  const { setLogoReplacement } = usePageData()
  useEffect(() => {
    if (children) {
      setLogoReplacement(children)
    }
    return () => {
      setLogoReplacement('')
    }
  }, [children])
  return null
}

export { CustomLogo, PageDataProvider, PageDescription, PageTitle, usePageData }
