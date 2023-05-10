import React from 'react'
import "./dropDownItem.scss"
const DropDownItem = ({header, value}) => {
    return (
        <div className='dropdown-item'>
            <div className="dropdown-item__header">{header}</div>
            <div className="dropdown-item__value">{value}</div>

        </div>
    )
}

export default DropDownItem
