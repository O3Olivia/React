import Card from "../UI/Card";

import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Potato Pizza",
    description: "Classic and Homemade style potato pizza",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Fried Chicken",
    description:
      "The crispiest, most flavorful crunchy outside with moist and juicy meat on the inside.",
    price: 26.5,
  },
  {
    id: "m3",
    name: "Chocolate Cake",
    description: "Super moist crumb and fudgy",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Korean BBQ",
    description: "Korean style BBQ",
    price: 35.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
