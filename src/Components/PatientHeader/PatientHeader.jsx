import React from 'react'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
const PatientHeader = ({name, surname}) => {
  return (
    <div className='patient__header'>
            <Logo variant='horizontal' />
            <nav className="patient-panel__navigation" role="navigation">
                <ul id="menu">
                    <li><Link to="/" className={`nav-active`}>Your info</Link></li>
                    <li><Link to="/Healing" className={`nav-item`}>Healing</Link></li>
                </ul>
            </nav>
            <div className="patient-panel__info">
                <div className="patient-panel__info__icon">
                    <span>{name.slice(0, 1)}</span>
                </div>
                <div className="patient-panel__info__name">{`${name} ${surname}`}</div>
            </div>
    </div>
  )
}

export default PatientHeader
