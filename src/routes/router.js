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
import AdminRoute from './Admin/AdminRoute';
import PatientPanelInfo from '../components/PatientPanelInfo/PatientPanelInfo';
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
        path: '/patient',
        element: <PatientPanelInfo/>
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
        element: <DoctorPanel />
    },
    {
        path: '/register/patient',
        element: <PatientRegisterRoute />
    },

]);

export default router;