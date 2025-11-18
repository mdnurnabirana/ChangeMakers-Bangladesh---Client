import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default AuthLayout;