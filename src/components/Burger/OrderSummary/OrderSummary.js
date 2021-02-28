import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // this could be a functional component, was just changed to class to debut with componentDidUpdate
    componentDidUpdate () {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(ingredient => {
            return (
                <li key={ingredient}>
                    <span style={{textTransform: 'capitalize'}}>{ingredient}</span>
                    : {this.props.ingredients[ingredient]}
                </li>
            ) 
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burget with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Check Out</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        );
    };
};

export default OrderSummary;