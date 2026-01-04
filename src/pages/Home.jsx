import React from 'react';
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';
import Featured from '../components/Featured';
import NewsLetter from '../components/NewsLetter';
import FAQ from './FAQ';
import CategoryMarquee from '../components/CategoryMarquee';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <>
            <Banner />
            <Featured />
            <CategoryMarquee />
            <Gallery />
            <FAQ />
            <Testimonials />
            <NewsLetter />
        </>
    );
};

export default Home;