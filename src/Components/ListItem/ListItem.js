import React from 'react'
import "./listItem.scss";
import { useNavigate } from "react-router-dom";

const ListItem = ({children}) => {
    const navigate = useNavigate();
    return (
        <li onClick={() => navigate(`/`)}className='list-item'>
            {children}
        </li>
    )
}

export default ListItem
