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

export const UPDATE_CART = gql`
    mutation UPDATE_CART($id: string, $amount: number) {
        cart(id:$id, amount: $amount){
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
// GrapghQL을 이용하면, 명세를 미리 만들어서 back-end한테 이렇게 동작하게 만들어달라고 이런식의 명세만 보내주면 된다. 그럼 back-end가 알아서 API 만들어줌. 