import React from 'react';
import { string, number } from 'prop-types';
import { useHistory } from 'react-router-dom';
import useRecipe from '../../hooks/useRecipe';
import getMealsOrDrinks from '../../helper/mealsOrDrinksMethods';
import { fetchIngredient } from '../../services/data';
import { ContainerRecipeIngredientCard, ButtonCard } from './styles';

export default function RecipeIngredientCard({ ingredient, type, index }) {
  const { foods, site, portugueseFood } = getMealsOrDrinks(type);

  const { push } = useHistory();
  const { recipe, setRecipe, setLoading } = useRecipe();

  const redirectToMainRecipes = async () => {
    setLoading(true);
    push(`/${portugueseFood}`);
    const response = await fetchIngredient(site, ingredient);
    setRecipe({ ...recipe, [foods]: response[foods] });
    setLoading(false);
  };

  return (
    <ContainerRecipeIngredientCard
      data-testid={ `${index}-ingredient-card` }
      onClick={ redirectToMainRecipes }
      onKeyDown={ redirectToMainRecipes }
      role="button"
      tabIndex="0"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.the${site}db.com/images/ingredients/${ingredient}-Small.png` }
        alt={ `${ingredient} Ingredient}` }
      />
      <ButtonCard type="button">{ingredient}</ButtonCard>
    </ContainerRecipeIngredientCard>
  );
}

RecipeIngredientCard.propTypes = {
  ingredient: string,
  index: number,
  type: string,
}.isRequired;
