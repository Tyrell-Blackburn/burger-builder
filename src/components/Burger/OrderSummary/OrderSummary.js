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
            <p>A delicious burget wirht eh following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Check Out</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;