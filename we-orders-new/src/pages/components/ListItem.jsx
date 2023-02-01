const ListItem = (props) => {

    const handleClick = () => {
        if(props.quantity === -1){
            props.changeQuantity(1);
        }
        else{
            props.changeQuantity(parseInt(props.quantity) + 1);
        }
    }

    return (
        <li className={`list-group-item d-flex justify-content-between align-items-start product-item ${props.quantity !== -1 ? "bg-selected" : ""}`} onClick={handleClick}>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.name}</div>
                {props.id}
            </div>
            {props.quantity !== -1 ? <span className="badge bg-primary rounded-pill">{props.quantity}</span> : ""}
        </li>
    );  
}

export default ListItem;