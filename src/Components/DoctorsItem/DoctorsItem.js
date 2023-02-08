
import "./DoctorsItem.scss";
import { useState } from "react";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg"
import Checkbox from "../Checkbox/Checkbox";
import more from "../../assets/icons/more.svg"
import { useNavigate } from "react-router-dom";
const DoctorsItem  = ({name,email, surname, phone, speciality, entryDate, salary})=>{
    const navigate = useNavigate();
    const [checkStatus, setCheckStatus] = useState(false);
    return(
        <li onClick={()=>navigate(`/`)}
        className="doctorItem">
            {/* <label className="check">
                <input type="checkbox" className="check__input"/>
                <span className="check__box"></span>
            </label> */}
            <Checkbox variant="square" onCheck={setCheckStatus}/>
            <div className="doctorItem__personal">
                <div className="doctorItem__personal__name">{`${name} ${surname}`}</div>
                <div className="doctorItem__personal__email">{email}</div>
            </div>
            <div className="doctorItem__phone">{phone.replace(/\s/g, '')}</div>
            <div className="doctorItem__speciality">{speciality}</div>
            <div className="doctorItem__entry-date">{entryDate.slice(4,16)}</div>
            <div className="doctorItem__salary">{salary}</div>
            <div className="doctorItem__change">
                <img src={more} alt="" />
                <div class="dropdown-content">
                    <div className="doctorItem__change__item">
                        <img src={editIcon} alt="edit" />
                        <span>Edit doctor</span>
                    </div>
                    <div className="doctorItem__change__item">
                        <img src={deleteIcon} alt="delete" />
                        <span>Delete doctor</span>
                    </div>
                </div>
            </div>

        </li>
    )

}
export default DoctorsItem;