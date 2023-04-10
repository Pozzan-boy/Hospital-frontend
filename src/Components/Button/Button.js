
const Button = ({children, bgColor="var(--secondary-color)", marginTop="0px", width= "400px", height = "70px", borderRadius='40px', id, fontSize="24px", onClick})=>{
    return(
        <button onClick={onClick} id={id} className="button" style={{width: width,
                                           height: height, 
                                           border: 'none', 
                                           cursor: 'pointer', 
                                           marginTop: marginTop,
                                           borderRadius: borderRadius, 
                                           backgroundColor: bgColor, 
                                           color: "#fff", 
                                        fontSize:fontSize}}>{children}
            </button>
    )
}
export default Button;