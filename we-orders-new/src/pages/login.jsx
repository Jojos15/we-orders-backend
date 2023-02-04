import React, { useState } from 'react';
import logo from '../img/welogo.svg';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    let navigate = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('main');
    }

    return (
        <div className="row h-100 w-100 bg-dark">
            <div className="col-12 col-md-5 col-lg-3 bg-black">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <h1 className="text-white text-center mt-3 mb-3">WE Orders</h1>
                        <form className="mb-4 ms-4 me-4">
                            <div className="mb-3">
                                <input placeholder="Password" autoFocus type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div class="d-grid gap-2">
                                <button className="btn btn-dark" type="submit" onClick={handleSubmit}>Σύνδεση</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-0 col-md-7 col-lg-9 align-self-center">
                <img className="logo-login bg-white" src={logo} alt="" />
            </div>
        </div>
    );
}

export default LogIn;