import { useParams, Link } from 'react-router-dom'
import { QueryKeys, fetcher } from '../../queryClient'
import { useQuery } from 'react-query'
import { Product } from '../../types'
import { TfiHeart } from "react-icons/tfi";

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
      <div className='image'>
        <img className='product-detail__image' src={image} />
      </div>
      <div className='title'>
        <p className='product-detail__category'>{category}</p>
        <h3 className='product-detail__title'>{title}</h3>
        <span className="product-detail__price">${price} | </span>
        <span className="product-detail__rating">
          <span className="heartEmoji"><TfiHeart /></span>{rate}</span>
         <p className='product-detail__description'>{description}</p>
      </div>
    
    </li>
  )
}

export default PrdDetailPage