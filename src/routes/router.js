import { createBrowserRouter } from 'react-router-dom';
import AdminLoginRoute from './Auth/AdminLoginRoute';
import DoctorLoginRoute from './Auth/DoctorLoginRoute';
import PatientLoginRoute from './Auth/PatientLoginRoute';
import PatientRegisterRoute from './Auth/PatientRegisterRoute';
import DoctorView from '../components/DoctorView/DoctorView';
import Root from './Root';
import DoctorPanel from '../components/DoctorPanel/DoctorPanel';
import AdminPanel from '../components/AdminPanel/AdminPanel';
import AdminDoctorsRoute from './Admin/AdminDoctorsRoute';
import AdminPatientsRoute from './Admin/AdminPatientsRoute';
import AdminHealingsRoute from './Admin/AdminHealingsRoute';
import AdminRoute from './Admin/AdminRoute';
import AdminWardsRoute from './Admin/AdminWardsRoute';
import PatientPanelInfo from '../components/PatientPanelInfo/PatientPanelInfo';
import PatientPanelHealing from '../components/PatientPanelHealing/PatientPanelHealing';
import DoctorPatientsRoute from './Doctor/DoctorPatientsRoute';
import DoctorHealingsRoute from './Doctor/DoctorHealingsRoute';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
    },
    {
        path: '/admin',
        element: <AdminRoute/>
    },
   
    {
        path: '/admin/patients',
        element: <AdminPatientsRoute/>
    },
    {
        path: '/admin/doctors',
        element: <AdminDoctorsRoute/>
        
    },
    {
        path: '/admin/wards',
        element: <AdminWardsRoute/>
        
    },
    {
        path: '/admin/healings',
        element: <AdminHealingsRoute/>
        
    },
    {
        path: '/patient',
        element: <PatientPanelInfo/>
    },
    {
        path: '/patient/healing',
        element: <PatientPanelHealing />
    },
    {
        path: '/login/admin',
        element: <AdminLoginRoute />
    },
    {
        path: '/login/patient',
        element: <PatientLoginRoute />
    },
    {
        path: '/login/doctor',
        element: <DoctorLoginRoute />
    },
    {
        path: '/doctor',
        element: <DoctorPatientsRoute />
    },
    {
        path: '/doctor/healings',
        element: <DoctorHealingsRoute />
    },
    {
        path: '/register/patient',
        element: <PatientRegisterRoute />
    },

]);

export default router;