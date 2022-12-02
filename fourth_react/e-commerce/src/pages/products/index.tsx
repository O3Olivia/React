import { useQuery } from 'react-query'
import ProductItem from '../../components/product/item'
import GET_PRODUCTS, { PRODUCTS } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import { Product } from '../../types'

const PrdList = () => {
  const { data } = useQuery<PRODUCTS>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS),
  )

  return (
    <div>
      <ul className="products">
        {data?.products?.map(product => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>);
};

export default PrdList;