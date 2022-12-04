// src/mocks/handlers.js
import { graphql } from 'msw'
import { v4 as uuid } from "uuid";
import GET_CART from '../graphql/cart';
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';

const mock_products = Array.from({ length: 21 }).map((_, i) => ({
    id: i + '',
    imageUrl: `https://placeimg.com/640/480/${i + 1}`, 
    price: 50000,
    title: `임시상품 ${i + 1}`,
    description: `임시 상세 내용 ${i + 1}`,
    createdAt: new Date(1646735501883+(i*1000*60*60*10)).toString()
}))

export const handlers = [
    graphql.query(GET_PRODUCTS, (req, res, ctx) => { 
        return res(
            ctx.data({
                products: mock_products,
            }),
        )
    }),
    graphql.query(GET_PRODUCT,
        (req, res, ctx) => { 
            const found = mockProducts.find()

           return res(ctx.data(mock_products[0]))
           
        }),
    graphql.query(GET_CART, (req, res, ctx) => { 
        return res(ctx.data({}))
    }), 
]