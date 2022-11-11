import { Link } from "react-router-dom";

const Products = () => {
  return (
    <section>
      <h1>The Products Page</h1>
      <ul>
        <li>
          <Link to="/products/p1">Winter Handmade Coat</Link>
        </li>
        <li>
          <Link to="/products/p2">Ugg</Link>
        </li>
        <li>
          <Link to="/products/p3">Hobo Bag</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
