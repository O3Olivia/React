import { gql } from "graphql-tag";

// 타입 정하기 
export type PRODUCT = {
    id: string
    imageUrl: string
    price: number
    title: string
    description: string
    createdAt:string
}

export type PRODUCTS = {
    products:PRODUCT[]
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