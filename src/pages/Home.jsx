import React from 'react';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Featured from '../components/Featured';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
    return (
        <>
            <Banner />
            <Featured />
            <Gallery />
            <NewsLetter />
        </>
    );
};

export default Home;