
const Button = ({children, color="var(--secondary-color)", width= "400px", height = "70px", borderRadius='40px'})=>{
    return(
        <button style={{width: {width}, height: {height}, borderRadius: {borderRadius}, color: "#fff", fontSize:"24px"}}>{children}</button>
    )
}
export default Button;