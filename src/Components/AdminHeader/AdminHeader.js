import React from 'react'
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const AdminHeader = ({ role }) => {

    return (
        <div className="admin-panel__header">
            <Logo color='#05A715' variant='horizontal' width="82px" height="69px" />
            <nav className="admin-panel__navigation" role="navigation">
                <ul id="menu">
                    <li><Link to="/admin/doctors" className={`nav-${role === 'doctor' ? "active" : 'item'}`}>View doctors</Link></li>
                    <li><Link to="/admin/patients" className={`nav-${role === 'patient' ? "active" : 'item'}`}>View patients</Link></li>
                    <li><a href="#">View statistics</a></li>


                </ul>
            </nav>
            <div className="admin-panel__info">
                <div className="admin-panel__info__icon">
                    <span>A</span>
                </div>
                <div className="admin-panel__info__name">Admin</div>
            </div>

        </div>
    )
}

export default AdminHeader
