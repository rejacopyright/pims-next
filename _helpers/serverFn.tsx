export const bufferUrlToBase64 = (buffer) => {
  const contentType: any = buffer?.headers?.get('Content-Type')?.split(';')?.[0] || 'image/png'
  return `data:${contentType};base64,${buffer?.data?.toString('base64')}`
}
