import Heart from "../Heart/Heart";
import './logo.scss';
const Logo = ({color = 'var(--secondary-color)', variant='vertical'})=>{
    let height,width, logoStyle;
    if(variant==='vertical'){
        logoStyle = {flexDirection: 'column'}
       
    } else{
        width = 82;
        height = 69;
    }
    return(

        <div style={logoStyle} className='logo'>
            <Heart width={width} height={height} color={color}/>
            <h2 className="logo_header">Hospital</h2>
        </div>
    )
}
export default Logo;