import React from 'react';
import Banner from './Banner';
// import Category from './Category';
// import PopularItems from './PopularItems';
// import Featured from './Featured';
// import Testomonials from './Testomonials';
import { Helmet } from 'react-helmet-async';
import Overview from './Overview';
// import Package from './Package';
import TourTabs from './TourTabs';
import TouristStory from './TouristStory';
const Home = () => {
    return (
        <div>
            <div>
                <Helmet>
                    <title>Ghure Ashi </title>
                </Helmet>
            </div>
            <Banner></Banner>
            <Overview></Overview>
            <TourTabs></TourTabs>
            <TouristStory></TouristStory>
            {/* <Package></Package> */}
            {/* <Category></Category> */}
            {/* <PopularItems></PopularItems> */}
            {/* <Featured></Featured> */}
            {/* <Testomonials></Testomonials> */}
            
        </div>
    );
};

export default Home;