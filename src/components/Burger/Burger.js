import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'

const burger = props => {

    // The logic to create ingredient components based on state
    let transformedIngredients = 
        // this takes the keys of the ingredients object and turns them into an array [salad, cheese, meat]
        Object.keys(props.ingredients)
        .map(ingred => {
            
            return [...Array(props.ingredients[ingred])]
                // this t
                .map((_, i) => {
                    return <BurgerIngredient key={ingred + i} type={ingred} />
                });
        })

        // this adds the values of the sub arrays to the primary array
        // reduce will flatten the array. Instead of an array with embedded arrays, it will return one array with the React components
        // takes a function with an initial value and the current value, also an initial value
        .reduce((arr, el) => { 
            return arr.concat(el); // concat() adds the values from one array to another
        }, []); // initial value set to an array

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