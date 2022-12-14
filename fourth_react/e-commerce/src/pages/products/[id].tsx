import { useParams} from 'react-router-dom'
import { QueryKeys, graphqlFetcher} from '../../queryClient'
import { useQuery } from 'react-query'
import { GET_PRODUCT, Product } from '../../graphql/products'


import PrdDetail from '../../components/product/detail';
import GET_PRODUCTS from '../../graphql/products';

const PrdDetailPage = () => {
  const { id } = useParams()

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () => graphqlFetcher(GET_PRODUCT, {id}),)

  if (!data) return null;

  
  return (
    <PrdDetail item={ data} />
  )
}

export default PrdDetailPage