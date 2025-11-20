import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Featured from '../components/Featured';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Featured />
            <Gallery />
            <NewsLetter />
            <Footer />
        </>
    );
};

export default HomeLayout;