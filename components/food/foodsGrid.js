import classes from "./foodsGrid.module.css";
import FoodItem from "./foodItem";

// for each food, it will show in foods page => localhost:3000/foods
export default function FoodsGrid({ foods }) {
  return (
    <ul className={classes.foods}>
      {foods.map((food) => (
        <li key={food._id}>
          <FoodItem {...food} />
        </li>
      ))}
    </ul>
  );
}
