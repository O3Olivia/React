
import React from 'react';
import GlobalLayout from './pages/_layout'

const DynamicCartIndex = React.lazy(() => import('./pages/cart/index'));
const DynamicMainPage = React.lazy(() => import('./pages/MainPage'));
const DynamicPaymentIndex = React.lazy(() => import('./pages/payment/index'));
const DynamicProductsIndex = React.lazy(() => import('./pages/products/index'));
const DynamicProductsId = React.lazy(() => import('./pages/products/[id]'));


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/cart', element: <DynamicCartIndex />, index: true},
      { path: '/MainPage', element: <DynamicMainPage />, },
      { path: '/payment', element: <DynamicPaymentIndex />, index: true},
      { path: '/products', element: <DynamicProductsIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductsId />, },
    ]
  }
]

export const pages = [
  { route: '/cart' },
  { route: '/MainPage' },
  { route: '/payment' },
  { route: '/products' },
  { route: '/products/:id' },
]
