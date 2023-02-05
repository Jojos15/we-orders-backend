import api from '../api/api';
import { useEffect, useState } from 'react';
import ListOrder from './components/ListOrder.jsx';
import {useNavigate} from 'react-router-dom';

const Send = (props) => {

    const [orders, setOrders] = useState();
    let navigate = useNavigate();

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
            setOrders(comps);
        }
    }, [])

    const postMail = (el, index) => {
        console.log(el);
        api.post('/mail', {
            companies: el
        })
            .then(response => {
                if (response.status === 200) {
                    //console.log(index);
                    sendMail(undefined, index + 1);
                }
            })
            .catch(e => console.log(e))
    }

    const sendMail = (e, index) => {
        console.log(index);
        if (orders.length > index) {
            postMail(orders[index], index);
        }
        else {
            navigate('/success');
        }
    }

    const setCommends = (value, compName) => {
        let comp = [...orders];
        let index = comp.findIndex((element) => { return element.company === compName });
        let item = { ...comp[index] }
        item.comments = value;
        comp[index] = item;
        setOrders(comp);
    }

    if (orders) {
        return (
            <div className="row h-100 w-100 bg-dark m-0">
                <div className="col-12">
                    <button type="button" className="btn btn-outline-light mt-3" onClick={switchComponents}>⬅ Πίσω στα Προιόντα</button>
                    <div className="row justify-content-center">
                        <div className="col-8 orders justify-conent-around">
                            <ol className="list-group ms-3 bg-black p-3">
                                {orders.map((company, index) => {
                                    return (
                                        <span key={index}>
                                            <h2 className="ms-3 mt-4 text-light">{company.company}</h2>
                                            {company.products.map((product) => {
                                                return (
                                                    <ListOrder
                                                        name={product.name}
                                                        id={product.id}
                                                        quantity={product.quantity}
                                                        key={product.id}
                                                    />
                                                );
                                            })}

                                            <div className="mb-3 mt-2">
                                                <label className="form-label text-light">Σχόλια Πραγγελίας</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setCommends(e.target.value, company.company)}></textarea>
                                            </div>
                                        </span>
                                    );
                                })}
                            </ol>
                            <div className=" row justify-content-center mt-4">
                                <div className="d-grid mx-3 w-50">
                                    <button className="btn btn-outline-light text-bold" type="button" onClick={(e) => { sendMail(e, 0) }}>Αποστολή</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div />
    );
}

export default Send;