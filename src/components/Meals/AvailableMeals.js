import { useEffect , useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [loading,setLoaing] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-app-fb596-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();
       console.log(responseData)
      let loadedmeals = [];
      for (const key in responseData) {
        loadedmeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedmeals);
      setLoaing(false);
    };

    fetchMeals()

  }, []);

  if(loading){
    return <section className={classes.MealsLoading}>
      <p>Loading....</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
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
