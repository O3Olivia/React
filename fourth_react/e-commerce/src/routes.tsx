
import React from 'react';
import GlobalLayout from './pages/_layout'

const DynamicMainPage = React.lazy(() => import('./pages/MainPage'));
const DynamicProductsIndex = React.lazy(() => import('./pages/products/index'));
const DynamicProductsId = React.lazy(() => import('./pages/products/[id]'));


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/MainPage', element: <DynamicMainPage />, },
      { path: '/products', element: <DynamicProductsIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductsId />, },
    ]
  }
]

export const pages = [
  { route: '/MainPage' },
  { route: '/products' },
  { route: '/products/:id' },
]
