import Page from '@pages/admin/wallet/detail/[...badgeId]/page'
export default function Index({ params, searchParams }) {
  return <Page {...{ params, searchParams }} />
}
