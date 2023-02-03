import { Link } from "react-router-dom"

import './checkbox.scss';

const Checkbox = ({onCheck}) => {


    return (
        <div className="checkbox">
            <div className='checkbox__circle' onClick={(e) => {
                e.target.classList.toggle('checkbox__circle-active');
                onCheck(({check}) => !check);
            }
        }>

            </div>
            I agree to the <Link className="checkbox__link" to="#">Terms & Conditions</Link>
        </div>
    )
}

export default Checkbox;