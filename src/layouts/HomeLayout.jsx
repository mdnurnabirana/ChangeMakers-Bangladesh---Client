import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Featured from '../components/Featured';
import NewsLetter from '../components/NewsLetter';

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Featured />
            <Gallery />
            <NewsLetter />
        </>
    );
};

export default HomeLayout;