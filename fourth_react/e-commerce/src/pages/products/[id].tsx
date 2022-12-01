import { useParams, Link } from 'react-router-dom'
import { QueryKeys, fetcher } from '../../queryClient'
import { useQuery } from 'react-query'
import { Product } from '../../types'


import PrdDetail from '../../components/product/detail';

const PrdDetailPage = () => {
  const { id } = useParams()

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () => fetcher({
    method: 'GET',
    path: `/products/${id}`,
  }),)

  if (!data) return null;

  
  return (
    <PrdDetail item={ data} />
  )
}

export default PrdDetailPage