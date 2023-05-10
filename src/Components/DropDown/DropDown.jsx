import dropDownIcon from "../../assets/icons/drop-down.svg"
import { useState } from "react"
import "./dropDown.scss"
const DropDown = ({img, info, children,type}) =>{
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        const div = document.querySelector(`.dropdown-${type}`);
        setOpen(!open);
        if (!open) {
            switch(type){
                case 'info':
                    div.style.height = '256px'
                    break
                case 'contacts':
                    div.style.height = '178px'
                    break
                default:
                    div.style.height = '256px'
            }
            if(type==='info'){
                div.style.height = '256px'
            }
            
        } else {
            div.style.height = '86px'
        }
      };
      
  return (
    <div className={`dropdown dropdown-${type}`}> 
        <div className="dropdown__visible">
            <div className="dropdown__visible__info">
                <img src={img} alt="icon" />
                <p>{info}</p>
            </div>
            <div onClick={handleOpen} className={open? "dropdown__visible__btn-active" : "dropdown__visible__btn"}>
                <img src={dropDownIcon} alt="" />
            </div>
        </div>
        <div className={open? `dropdown__hidden-active dropdown__hidden-active-${type}` : "dropdown__hidden"}>
            {children}
        </div>
    </div>
  )
}

export default DropDown
