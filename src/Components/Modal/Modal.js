import "./modal.scss";
const Modal =({active, setActive, children, handler = undefined, modalClass="modal__content"})=>{
    return( 
        <div className={active? "modal active" :"modal"} onClick={(e)=> {setActive(false); if (handler !== undefined) {handler(e)}}}>
            <div className={modalClass} onClick={(e)=> e.stopPropagation()} >
                {children}
            </div>

        </div>
    )
}
export default Modal;