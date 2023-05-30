import React from 'react';
import "./listItem.scss";

const ListItem = ({children}) => {
    
    return (
        <li className='list-item'>
            {children}
        </li>
    )
}

export default ListItem
