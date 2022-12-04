
import {lazy} from 'react';
import GlobalLayout from './pages/_layout'

import CartIndex from './pages/cart/index';
import MainPage from './pages/MainPage';
import PaymentIndex from './pages/payment/index';
import ProductsIndex from './pages/products/index';
import ProductsId from './pages/products/[id]';


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/cart', element: <
        CartIndex />, index: true},
      { path: '/MainPage', element: <
        MainPage />, },
      { path: '/payment', element: <
        PaymentIndex />, index: true},
      { path: '/products', element: <
        ProductsIndex />, index: true},
      { path: '/products/:id', element: <
        ProductsId />, },
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
