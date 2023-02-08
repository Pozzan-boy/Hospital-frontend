import './checkbox.scss';

const Checkbox = ({onCheck, variant="round"}) => {
    let checkBoxClass, checkBoxClassActive;
    if(variant==='round'){
        checkBoxClass = 'checkbox__circle';
        checkBoxClassActive = 'checkbox__circle-active';
       
    } else{
        checkBoxClass = 'checkbox__square';
        checkBoxClassActive = 'checkbox__square-active';
    }

    return (
        <div className="checkbox doctorItem__check">
            <div className={checkBoxClass} onClick={(e) => {
                e.target.classList.toggle(checkBoxClassActive);
                onCheck(({check}) => !check);
            }
        }>

            </div>
        </div>
    )
}

export default Checkbox;