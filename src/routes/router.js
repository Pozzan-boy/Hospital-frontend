import { createBrowserRouter } from 'react-router-dom';
import AdminLoginRoute from './Auth/AdminLoginRoute';
import DoctorLoginRoute from './Auth/DoctorLoginRoute';
import PatientLoginRoute from './Auth/PatientLoginRoute';
import PatientRegisterRoute from './Auth/PatientRegisterRoute';
import Root from './Root';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
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
        path: '/register/patient',
        element: <PatientRegisterRoute />
    }
]);

export default router;