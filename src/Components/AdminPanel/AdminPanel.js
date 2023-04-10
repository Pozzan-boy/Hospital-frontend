import DoctorsList from "../DoctorsList/DoctorsList";
import Filters from "../Filters/Filters";
import './adminPanel.scss'
import Logo from "../Logo/Logo";
const AdminPanel = ()=>{
    return(
        <>
            <Logo color='#05A715' variant='horizontal' width="82px" height="69px" />
            <Filters/>
            <DoctorsList/>
            <div className="admin-panel__side-bar">
                <div className="admin-panel__info">
                    <div className="admin-panel__info__icon">
                        <span>A</span>
                    </div>
                    <div className="admin-panel__info__name">Admin</div>
                </div>
                <div className="admin-panel__nav">
                    <div id="admin-side-doctors" className="admin-panel__nav__item admin-panel__nav__active">View doctors</div>
                    <div id="admin-side-patients"className="admin-panel__nav__item">View patients</div>
                    <div id="admin-side-statistics" className="admin-panel__nav__item">View Statistics</div>
                </div>
            </div>
        </>
    )

}
export default AdminPanel;