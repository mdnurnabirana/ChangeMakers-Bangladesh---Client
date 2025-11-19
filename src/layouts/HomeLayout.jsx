import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Featured from '../components/Featured';

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Featured />
            <Gallery />
        </>
    );
};

export default HomeLayout;