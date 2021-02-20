import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'

const burger = props => {



    // The logic to create ingredient components based on state
    let transformedIngredients = 
        Object.keys(props.ingredients) // this takes the keys of the object and turns them into an array [salad, cheese, meat]
        .map(ingred => {

            return [...Array(props.ingredients[ingred])]
                .map((_, i) => {
                    return <BurgerIngredient key={ingred + i} type={ingred} />
                });
        })
        .reduce((arr, el) => { // this will flatten the array. Instead of an array with embedded arrays, it will return one array with the React components
            return arr.concat(el);
        }, []);

    console.log(transformedIngredients);

    // if there are no ingredients, then ask the user to add some
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Add some fucking ingredients</p>; 
    }

    return (

        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;