import { gql } from "graphql-tag";

// 타입 정하기 
export type Product = {
    id: string
    imageUrl: string
    price: number
    title: string
    description: string
    createdAt:string
}

export type Products = {
    products:Product[]
}

const GET_PRODUCTS = gql`
query GET_PRODUCTS{
    id
    imageUrl
    title
    description
    cratedAt
}
`

export const GET_PRODUCT = gql`
query GET_PRODUCT($id: string){
     id
    imageUrl
    title
    description
    cratedAt
}
`
export default GET_PRODUCTS