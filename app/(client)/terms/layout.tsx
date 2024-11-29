import { APP_NAME } from '@helpers'

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://pimsclub.id'),
    title: '서비스 이용약관',
    description: { APP_NAME },
  }
}

const Index = ({ children }) => children

export default Index
