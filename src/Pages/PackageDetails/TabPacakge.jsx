import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Gallery from './Gallery';
import TourPlan from './TourPlan';
import AddReview from './AddReview';

const TabPacakge = ({description}) => {
    return (
        <div>
                   <Tabs>
                        <TabList className="flex gap-4 mb-6 border-b-2 border-gray-300">
              <Tab 
                className="px-4 py-2 rounded-md cursor-pointer bg-gray-300 text-gray-800 hover:bg-sky-400 hover:text-white transition duration-300"
                selectedClassName="!bg-sky-500 !text-white font-bold border-b-4 border-sky-800"
              >
                ℹ Information
              </Tab>
              <Tab 
                className="px-4 py-2 rounded-md cursor-pointer bg-gray-300 text-gray-800 hover:bg-sky-400 hover:text-white transition duration-300"
                selectedClassName="!bg-sky-500 !text-white font-bold border-b-4 border-sky-800"
              >
                🗺 Travel Plan
              </Tab>
              <Tab 
                className="px-4 py-2 rounded-md cursor-pointer bg-gray-300 text-gray-800 hover:bg-sky-400 hover:text-white transition duration-300"
                selectedClassName="!bg-sky-500 !text-white font-bold border-b-4 border-sky-800"
              >
                  📸 Tour Gallery
              </Tab>
             
            </TabList>

            <TabPanel>
                <div>
                    <p>{description}</p>
                </div>
                <AddReview></AddReview>
                
                 </TabPanel>
                 <TabPanel>
                    <div>
                        <TourPlan></TourPlan>
                    </div>
                 </TabPanel>
                 <TabPanel>
                    <Gallery></Gallery>
                 </TabPanel>
            </Tabs>

          
            
        </div>
    );
};

export default TabPacakge;