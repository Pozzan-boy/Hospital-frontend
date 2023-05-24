import React from 'react'
import "./dropDownItem.scss"
const DropDownItem = ({header, value, className}) => {
    return (
        <div className={`dropdown-item ${className}`}>
            <div className="dropdown-item__header">{header}</div>
            <div className="dropdown-item__value">{value}</div>

        </div>
    )
}

export default DropDownItem
