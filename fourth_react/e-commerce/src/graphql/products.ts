import { gql } from "graphql-request";

// 타입 정하기 
export type PRODUCT = {
    id: string
    imageUrl: string
    price: number
    title: string
    description: string
    createdAt:string
}

const GET_PRODUCTS = gql`
query GET_PRODUCTs{
    id
    imageUrl
    title
    description
    cratedAt
}
`
export default GET_PRODUCTS