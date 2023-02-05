import Checkmark from '../img/checkmark.svg'
import {useNavigate} from 'react-router-dom';

const Success = () => {

    let navigate = useNavigate();

    const handleGoHome = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div className="row h-100 w-100 align-items-center justify-content-center bg-dark m-0">
            <h1 className="text-light text-center">Η Αποστολή Ολοκληρώθηκε</h1>s
            <div className="col-12 w-25 justify-content-center">
                <img className="success-logo pe-3" src={Checkmark} alt="" />
            </div>
            <div className=" row justify-content-center mt-4">
                <div className="d-grid mx-3 w-50">
                    <button className="btn btn-outline-light text-bold" type="button" onClick={handleGoHome}>Επιστροφή στην Αρχή</button>
                </div>
            </div>
        </div>
    );
}

export default Success;