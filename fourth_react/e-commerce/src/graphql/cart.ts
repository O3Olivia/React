import { gql } from "graphql-tag";

export type CartType = {
    id: string
    imageUrl: string
    price: number
    title: string
    amount: number
}

// 상품을 담을 때 상품 id가 필요하니까 넣어주기 
export const ADD_CART = gql`
    mutation ADD_CART($id: string) {
        cart(id:$id){
            id
            imageUrl
            price
            title
            amount
        } 
    }
`
export const GET_CART = gql`
    query GET_CART {
        cart{
            id
            imageUrl 
            price
            title
            amount

        }
    }
`
