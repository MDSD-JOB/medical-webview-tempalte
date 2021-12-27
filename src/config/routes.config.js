import { BasicLayout } from '@/layouts'
export default [
  {
    path: '/',
    redirect: '/hello',
    component: BasicLayout,
    children: [
      {
        path: '/hello',
        component: resolve =>
          import('@views/hello/index').then(module => resolve(module))
      }
    ]
  }
]
