import React, { useEffect, useState } from 'react';
import useRecipe from './useRecipe';
import RecipeIngredientCard from '../components/RecipeIngredientCard';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchIngredients } from '../services/data';

export default function useIngredients(type) {
  const INITIAL_STATE = { meals: [], drinks: [] };
  const { setLoading, renderLoading } = useRecipe();
  const [ingredients, setIngredients] = useState(INITIAL_STATE);
  const { foods, site } = getMealsOrDrinks(type);

  useEffect(() => {
    const fetchDidMount = async () => {
      setLoading(true);
      const response = await fetchIngredients(site);
      console.log(response);
      setIngredients(response);
      setLoading(false);
    };

    fetchDidMount();
  }, []);

  const renderCards = () => {
    const maxLengthRecipes = 12;
    if (ingredients[foods]) {
      const filteredRecipe = ingredients[foods].filter(
        (drink, index) => index < maxLengthRecipes,
      );

      return filteredRecipe.map((ingredient, index) => {
        const ingredientName = type === 'meal'
          ? ingredient.strIngredient
          : ingredient.strIngredient1;

        return (
          <RecipeIngredientCard
            key={ index }
            ingredient={ ingredientName }
            type={ type }
            index={ index }
          />
        );
      });
    }
  };

  return { renderCards, renderLoading };
}
