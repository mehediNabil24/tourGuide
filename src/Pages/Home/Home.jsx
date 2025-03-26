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
import InfoSection from './InfoSection';
import Features from './Feature';
import NewPackage from './NewPackage';
const Home = () => {
    return (
        <div>
            <div>
                <Helmet>
                    <title>Ghure Ashi </title>
                </Helmet>
            </div>
            <div className='w-full'>
            <Banner></Banner>
            <Overview></Overview>
            </div>
            <div className='w-11/12 mx-auto'>
            
            
            <TourTabs></TourTabs>
            <TouristStory></TouristStory>
            <NewPackage></NewPackage>
            <InfoSection></InfoSection>
            <Features></Features>
            {/* <Package></Package> */}
            {/* <Category></Category> */}
            {/* <PopularItems></PopularItems> */}
            {/* <Featured></Featured> */}
            {/* <Testomonials></Testomonials> */}
            
        </div>
        </div>
    );
};

export default Home;