import "./modal.scss";
const Modal =({active, setActive, children, modalClass="modal__content"})=>{
    return( 
        <div className={active? "modal active" :"modal"} onClick={()=> setActive(false)}>
            <div className={modalClass} onClick={(e)=> e.stopPropagation()} >
                {children}
            </div>

        </div>
    )
}
export default Modal;