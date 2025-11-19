import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Gallery />
        </>
    );
};

export default HomeLayout;