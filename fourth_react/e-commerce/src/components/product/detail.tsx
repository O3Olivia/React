import { Product } from "../../types";
import { TfiHeart } from "react-icons/tfi";

const prdDetail = ({
    item: {
        category,
        title,
        image,
        description,
        price,
        rating: { rate },
    },
}: { 
        item:Product
    }

  ) => (
  <div className='product-detail'>
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
    </div>
  )

export default prdDetail