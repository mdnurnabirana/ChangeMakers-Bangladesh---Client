import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer />
        </>
    );
};

export default AuthLayout;