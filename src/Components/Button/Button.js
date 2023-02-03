
const Button = ({children, bgColor="var(--secondary-color)", width= "400px", height = "70px", borderRadius='40px'})=>{
    return(
        <button className="button" style={{width: width,
                                           height: height, 
                                           border: 'none', 
                                           cursor: 'pointer', 
                                           borderRadius: borderRadius, 
                                           backgroundColor: bgColor, 
                                           color: "#fff", 
                                           fontSize:"24px"}}>{children}</button>
    )
}
export default Button;