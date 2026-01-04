import React from 'react';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Featured from '../components/Featured';
import NewsLetter from '../components/NewsLetter';
import FAQ from './FAQ';

const Home = () => {
    return (
        <>
            <Banner />
            <Featured />
            <Gallery />
            <FAQ />
            <NewsLetter />
        </>
    );
};

export default Home;