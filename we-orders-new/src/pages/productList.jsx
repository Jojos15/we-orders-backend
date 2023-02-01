import React, { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import SelectedItem from './components/SelectedItem';
import Search from './components/Search';

const ProductList = (props) => {

    const [companies, setCompanies] = useState([]);
    const [searchProducts, setSearchProducts] = useState();

    const fetchJson = () => {
        fetch('products.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                let table = data.data;
                let prods = [];
                for (let i = 0; i < table.length; i++) {
                    for (let j = 0; j < table[i].products.length; j++) {
                        table[i].products[j] = { ...table[i].products[j], "quantity": -1 }
                        prods.push(table[i].products[j]);
                    }
                }
                if (props.previousState) {
                    //console.log(props.previousState);
                    setCompanies(JSON.parse(localStorage.getItem("companies")));
                }
                else setCompanies(table);
                setSearchProducts(prods);
            }).catch((e) => {
                console.log(e.message);
            });
    }

    useEffect(() => {
        fetchJson();
    }, []);

    useEffect(() => {
        if (companies.length>0) {
            console.log(companies);
            localStorage.setItem("companies", JSON.stringify(companies));
        }
    }, [companies]);

    const changeQuantity = (value, id, compIndex) => {
        let comp = [...companies];
        let table = [...comp[compIndex].products]
        let index = table.findIndex((element) => { return element.id === id });
        let item = { ...table[index] }
        item.quantity = value;
        table[index] = item;
        comp[compIndex].products = table;
        setCompanies(comp);
    }

    const onSearchItemSelected = (item) => {
        for (let i = 0; i < companies.length; i++) {
            for (let j = 0; j < companies[i].products.length; j++) {
                if (item.item.id === companies[i].products[j].id) {
                    let value = parseInt(companies[i].products[j].quantity);
                    if (value === -1) { value = 0 }
                    changeQuantity(value + 1, item.item.id, i);
                    break;
                }
            }
        }
    }

    const onSubmit = (e, compapa) => {
        e.preventDefault();
        props.setOrders(compapa);
    }

    return (
        <div className="row w-100">
            <Search products={searchProducts} onItemSelected={onSearchItemSelected} />
            <div className="col-5 products">
                <ol className="list-group ms-3">
                    {companies.map((company, index) => {
                        return (
                            <span key={index}>
                                <h2 className="ms-3 mt-4">{company.company}</h2>
                                {company.products.map((product) => {
                                    return (
                                        <ListItem
                                            name={product.name}
                                            id={product.id}
                                            quantity={product.quantity}
                                            key={product.id}
                                            changeQuantity={(value) => changeQuantity(value, product.id, index)}
                                        />
                                    );
                                })}
                            </span>
                        );

                    })}
                </ol>
            </div>
            <div className="col-1"></div>
            <div className="col-6 mt-4">
                <h2 className="text-center">Επιλεγμένα προιόντα</h2>
                <div className="bg-light pb-4 pt-4 products-selected">
                    {companies.map((company, index) => {
                        return (
                            <ol key={index} className="list-group justify-content-center align-items-center">
                                {company.products.map((product) => {
                                    if (product.quantity !== -1) {
                                        return (
                                            <SelectedItem
                                                name={product.name}
                                                id={product.id}
                                                quantity={product.quantity}
                                                key={product.id}
                                                deleteSelf={() => changeQuantity(-1, product.id, index)}
                                                changeQuantity={(value) => changeQuantity(value, product.id, index)}
                                            />
                                        );
                                    }
                                })}
                            </ol>
                        );
                    })}
                    <div className="text-center mt-4 mb-4">
                        <button type="button" className="btn btn-primary w-50" onClick={(e) => onSubmit(e, companies)}>Αποστολή</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;