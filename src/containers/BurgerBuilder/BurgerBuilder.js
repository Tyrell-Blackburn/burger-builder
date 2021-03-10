import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-builder-b9aae-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true})
        });
    }

    // activates the Order Now button if more than 1 item is added to the burger
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
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    // purchasing the order
    purchaseContinueHandler = () => {
        // alert('You Continue');
        this.setState({loading: true});
        
        // posting data to the server
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // on a production app this would be calculated on the server to avoid client-side manipulation
            customer: {
                name: 'Tyrell Blackburn',
                address: {
                    street: 'Test street 1',
                    zipCode: '234235',
                    country: 'Germany'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        }


        axios.post('/orders.json', order) // need to add .json for Firebase to function correctly
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        };

        let orderSummary = null;
        let burger = this.state.error ? <p>Cannot load ingredients</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        order={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler} />
                </Aux>)
            
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelBackdrop={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);