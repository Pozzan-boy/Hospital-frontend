import React from 'react'
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const DoctorHeader = ({ role }) => {

    return (
        <div className="admin-panel__header">
            <Logo color='#A70505' variant='horizontal' width="82px" height="69px" />
            <nav className="admin-panel__navigation" role="navigation">
                <ul id="menu">
                    <li><Link to="/doctor/" className={`nav-${role === 'patient' ? "active" : 'item'}`}>View patients</Link></li>
                    <li><Link to="/doctor/healings" className={`nav-${role === 'healing' ? "active" : 'item'}`}>View healings</Link></li>
                </ul>
            </nav>
            <div className="admin-panel__info">
                <div className="admin-panel__info__icon">
                    <span>D</span>
                </div>
                <div className="admin-panel__info__name">Doctor</div>
            </div>

        </div>
    )
}

export default DoctorHeader;