import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
        return (
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>
                : {props.ingredients[ingredient]}
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
            <p><strong>Total Price : ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Check Out</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;