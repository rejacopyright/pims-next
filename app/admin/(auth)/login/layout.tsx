export async function generateMetadata({ params: _params }, parent) {
  let res: any = undefined
  try {
    res = await fetch(`https://reqres.in/api/users/${1}`)
  } catch {}
  const data = (await res?.json())?.data

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    metadataBase: new URL('https://pimsclub.id'),
    title: data?.first_name,
    openGraph: {
      images: [data?.avatar, ...previousImages],
    },
  }
}

export default function Index({ children }) {
  return <>{children}</>
}
