import React from 'react';
import Banner from './Banner';
// import Category from './Category';
import PopularItems from './PopularItems';
import Featured from './Featured';
import Testomonials from './Testomonials';
import { Helmet } from 'react-helmet-async';
import Overview from './Overview';
const Home = () => {
    return (
        <div>
            <div>
                <Helmet>
                    <title>Bistro || Home</title>
                </Helmet>
            </div>
            <Banner></Banner>
            <Overview></Overview>
            {/* <Category></Category> */}
            <PopularItems></PopularItems>
            <Featured></Featured>
            <Testomonials></Testomonials>
            
        </div>
    );
};

export default Home;