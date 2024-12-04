export const rewrites = [
  {
    source: '/',
    destination: '/home',
  },
  // {
  //   source: `${APP_ADMIN_PATH}/login`,
  //   destination: '/auth/login',
  // },
  // {
  //   source: `${APP_ADMIN_PATH}/register`,
  //   destination: '/register/email',
  // },
  // {
  //   source: '/public/user/badge/:pathname',
  //   destination: '/public/badge/:pathname',
  // },
  // {
  //   source: '/policy',
  //   destination: '/public/policy',
  // },
  // {
  //   source: '/terms',
  //   destination: '/public/terms',
  // },
]

export const redirects = [
  {
    source: '/auth',
    destination: '/',
    permanent: true,
  },
  {
    source: '/auth/:pathname*',
    destination: '/:pathname*',
    permanent: true,
  },
]
