import { API_SERVER } from '@api/axios'
import UserLayout from '@pages/admin/layout'
import { getDataBadgeQuery } from '@pages/admin/wallet/detail/_libs/getDataBadge'

export async function generateMetadata({ params }, parent) {
  const getData: any = await getDataBadgeQuery(params, undefined)
  const { achievement, sharingToken }: any = getData || {}
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    metadataBase: new URL('https://pimsclub.id'),
    title: achievement?.name,
    description: achievement?.description,
    openGraph: {
      title: achievement?.name,
      description: achievement?.description,
      images: [
        { url: `${API_SERVER}/api/v1/badge/share/${sharingToken}/png`, width: 400, height: 400 },
        ...previousImages,
      ],
    },
  }
}

export default async function Index({ children }) {
  return <UserLayout>{children}</UserLayout>
}
