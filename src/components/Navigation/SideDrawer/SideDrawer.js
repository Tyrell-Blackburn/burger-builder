import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sidedrawer = props => {

    // prepares the classes that trigger the animation of the side drawer appearing and disappearing
    const attachedClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')

    return (
        <Aux>
            <Backdrop show={props.open} cancel={props.closed}/>
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
};

export default sidedrawer