import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCT = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    describe: "The First Book I ever Wrote",
  },
  {
    id: "p2",
    price: 8,
    title: "My Second Book",
    describe: "The Second Book I ever Wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.describe}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
