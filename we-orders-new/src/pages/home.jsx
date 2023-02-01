import React, { useState } from 'react';
import logo from '../img/welogo.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    let navigate = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('main');
    }

    return (
        <div className="row h-100 w-100 align-items-center justify-content-center pt-4 pb-4">
            <div className="col-12  col-md-6 col-lg-5 bg-dark">
                <img className="logo-login mt-4 bg-white" src={logo} alt="" />
                <h1 className="text-white text-center mt-3">We Orders</h1>
                <form className="mb-4 ms-4 me-4">
                        <div className="mb-3">
                            <label className="form-label text-white">Password</label>
                            <input autoFocus type="password" className="form-control w-75" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Home;