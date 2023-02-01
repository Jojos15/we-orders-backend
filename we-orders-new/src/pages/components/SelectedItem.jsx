const SelectedItem = (props) => {

    const handleInput = (value) => {
        if(value>=0){
            props.changeQuantity(value);
        }
        else{
            props.changeQuantity(0)
        }
    }

    return (
        <li className="list-group-item d-flex w-75 justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.name}</div>
                {props.id}

                <form>
                    <input value={props.quantity} type="number" className=" mt-1 form-control number-input" onChange={(e) => handleInput(e.target.value)} />
                </form>

            </div>
            <span className=" badge bg-transparent"><h5 onClick={props.deleteSelf} className="delete-item">x</h5></span>
        </li>
    );
}

export default SelectedItem;