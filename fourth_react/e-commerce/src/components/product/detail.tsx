import { Product } from "../../graphql/products";

const prdDetail = ({
    item: {
      title, imageUrl, description, price
  },
}: { 
        item:Product
    }) => (
  <div className='product-detail'>
      <div className='image'>
        <img className='product-detail__image' src={imageUrl} />
      </div>
      <div className='title'>
        <h3 className='product-detail__title'>{title}</h3>
        <span className="product-detail__price">${price} | </span>
        <span className="product-detail__rating"></span>
        <p className='product-detail__description'>{description}</p>
      </div>
    </div>
  )

export default prdDetail