'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'

export function withRouter(Component: any) {
  const ComponentWithRouter: any = (props: any) => {
    const location: any = usePathname()
    const navigate: any = useRouter()
    const params: any = useParams()

    return <Component {...props} router={{ location, navigate, params }} />
  }
  return ComponentWithRouter
}
