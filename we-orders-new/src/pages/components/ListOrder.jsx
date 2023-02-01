const ListOrder = (props) => {

    return (
        <li className={"list-group-item d-flex justify-content-between align-items-start"}>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.name}</div>
                {props.id}
            </div>
            <span className="fs-3 fw-semibold">{props.quantity}</span>
        </li>
    );  
}

export default ListOrder;