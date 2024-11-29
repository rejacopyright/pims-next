import { APP_NAME } from '@helpers'

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://pimsclub.id'),
    title: '개인정보 수집/이용 동의',
    description: { APP_NAME },
  }
}

const Index = ({ children }) => children

export default Index
