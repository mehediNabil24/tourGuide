import React, { useState } from 'react';
import Cover from '../Cover/Cover';
import orderImg from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import OrderCard from '../../../Components/OrderCard/OrderCard';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Order = () => {
    const categories = ['salad','pizza','soup','dessert', 'drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category)
    const [menu] = useMenu();
    
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const dessert = menu?.filter(item=> item.category === 'dessert')
    const soup = menu?.filter(item=> item.category === 'soup')
    const salad = menu?.filter(item=> item.category === 'salad')
    const pizza = menu?.filter(item=> item.category === 'pizza')
    const drinks = menu?.filter(item=> item.category === 'drinks')
    return (
        <div>
            <Helmet>
                <title>Bistro || Order Food</title>
            </Helmet>
            <Cover img={orderImg} title={'Order Food'}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(tabIndex)}>
    <TabList>
      <Tab>SALAD</Tab>
      <Tab>PIZZA</Tab>
      <Tab>SOUP</Tab>
      <Tab>DESSERT</Tab>
      <Tab>DRINKS</Tab>
    </TabList>

    <TabPanel>
      <OrderTab items={salad}></OrderTab>
      
    </TabPanel>
    <TabPanel>
    <OrderTab items={pizza}></OrderTab>
      
    </TabPanel>
    <TabPanel>
    <OrderTab items={soup}></OrderTab>
      
    </TabPanel>
    <TabPanel>
    <OrderTab items={dessert}></OrderTab>
      
    </TabPanel>
    <TabPanel>
    <OrderTab items={drinks}></OrderTab>
      
    </TabPanel>
  </Tabs>
        </div>
    );
};

export default Order;