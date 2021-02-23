import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients) // returns array of keys
        .map(el => {
            return ingredients[el];
        }).reduce((initial, el) => {
            return initial + el;
        },0)
        
        this.setState({purchasable: sum > 0});

        // My original solution with the method called in render()
        // for (let key in ingredients) {
        //     if (ingredients[key] === false) { // if one false, then set
        //         this.state.purchasable = false;
        //         break;
        //     }
        //     this.setState({purchasable = true});
        // }

    }

    addIngredientHandler = type => {
        // calculate new ingredient count
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        
        // calculate new price
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // update the state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        // calculate new ingredient count
        const oldCount = this.state.ingredients[type];

        // this now not needed because of the logic with disabledInfo
        // if (oldCount === 0) {
        //     return;
        // }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceDecrease = INGREDIENT_PRICES[type];
        
        // calculate new price
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDecrease;

        // update the state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        };

        // this.updatePurchaseState(disabledInfo);

        return (
            <Aux>
                <Burger 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    order={this.state.purchasable}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;