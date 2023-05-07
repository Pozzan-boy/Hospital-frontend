import { useState, useEffect } from 'react';
import './checkbox.scss';

const Checkbox = ({ checked, onCheck, variant = "round", id }) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    let checkBoxClass, checkBoxClassActive;

    if (variant === 'round') {
        checkBoxClass = 'checkbox__circle';
        checkBoxClassActive = 'checkbox__circle-active';
    } else {
        checkBoxClass = 'checkbox__square';
        checkBoxClassActive = 'checkbox__square-active';
    }

    const toggleCheckbox = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onCheck(newChecked);
    };

    return (
        <div className="checkbox doctorItem__check">
            <div
                className={`${checkBoxClass} ${isChecked ? checkBoxClassActive : ''}`}
                onClick={toggleCheckbox}
            ></div>
        </div>
    );
};

export default Checkbox;
