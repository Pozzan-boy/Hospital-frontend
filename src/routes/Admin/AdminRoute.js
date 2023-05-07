import React from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import "./adminRoute.scss"
const AdminRoute = () => {

    return (
        <div className="admin-panel">
            <AdminHeader />
            <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="admin-panel-message">
                To continue please select on of the tables
            </div>
        </div>
    )
}

export default AdminRoute

