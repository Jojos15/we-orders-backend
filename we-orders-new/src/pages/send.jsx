import api from '../api/api';
import { useEffect, useState } from 'react';

const Send = (props) => {

    const [orders, setOrders] = useState();

    const switchComponents = () => {
        props.switchComps();
    }

    useEffect(() => {
        let companies = props.orders;
        let comps = [];
        let prods = [];
        for (let i = 0; i < companies.length; i++) {
            prods = [];
            for (let j = 0; j < companies[i].products.length; j++) {
                if (parseInt(companies[i].products[j].quantity) !== -1) {
                    prods.push(companies[i].products[j]);
                }
            }
            if (prods.length !== 0) {
                let tmp = companies[i];
                tmp.products = prods;
                comps.push(tmp);
            }
        }
        if (comps.length === 0) {
            console.log("No products");
        }
        else {
            console.log(comps);
            setOrders(comps);
        }
    }, [])

    const sendMail = (e) => {
        e.preventDefault();
        api.post('/mail')
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="col-12 m-3">
            <button type="button" className="btn btn-outline-primary" onClick={switchComponents}>⬅ Πίσω στα Προιόντα</button>
        </div>
    );
}

export default Send;