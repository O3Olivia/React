import { gql
} from "graphql-request";
 
// 타입
export type cart = {
    id: string,
    imageUrl: string, 
    price: number,
    title: string,
    amount: number
}

export const ADD_CART = gql`
    mutation ADD_CART($id:string){
        id
         imageUrl
        price  
        title 
        amount

    }
`

const GET_CART = gql`
    query GET_CART {
        id
        imageUrl
        price
        title
          amount
    }
`

export default GET_CART