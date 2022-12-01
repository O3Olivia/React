import { useParams, Link } from 'react-router-dom'
import { QueryKeys, fetcher } from '../../queryClient'
import { useQuery } from 'react-query'
import { Product } from '../../types'

const PrdDetailPage = () => {
  const { id} = useParams()

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () => fetcher({
    method: 'GET',
    path: `/products/${id}`,
  }),)

  if (!data) return null;

  const { category, title, image, description, price, rating: { rate} } = data
  return (
    <li className='product-detail'>
      <p className='product-detail__category'>{ category}</p>
    
    </li>
  )
}

export default PrdDetailPage