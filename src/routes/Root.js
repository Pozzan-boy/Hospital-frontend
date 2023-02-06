import { useSelector } from "react-redux";
import NotLoginRoute from "./Auth/NotLoginRoute";


const Root = () => {
    
    const role = useSelector(state => state.account.role);
    
    const render = () => {
        console.log(role);
        switch(role) {
            case 'admin':
                return <h1>admin page</h1>
            case 'doctor':
                return <h1>doctor page</h1>
            default:
                return <NotLoginRoute />
        }
    }

    return(
        <>
            {render()}
        </>
    )
}

export default Root;