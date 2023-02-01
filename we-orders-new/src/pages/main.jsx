import React, { useState } from 'react';
import Send from './send.jsx';
import ProductList from './productList.jsx';

const Main = () => {

    const [previousState, setPreviousState] = useState();
    const [switchComponents, setSwitchComponents] = useState(false);

    if (previousState && !switchComponents) {
        //console.log(previousState);
        return (
            <Send orders={previousState} switchComps={() => setSwitchComponents(true)} />
        );
    }
    else if (previousState && switchComponents) {
        return (
            <ProductList previousState={previousState} setOrders={(orders) => { setPreviousState(orders); setSwitchComponents(false) }} />
        );
    }

    return (
        <ProductList setOrders={(orders) => {
            setPreviousState(orders);
        }} />
    );
}

export default Main;