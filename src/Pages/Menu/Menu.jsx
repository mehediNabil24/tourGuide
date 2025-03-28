// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import Cover from '../Shared/Cover/Cover';
// import menuImg from '../../assets/menu/banner3.jpg'
// import PopularItems from '../Home/PopularItems';
// import useMenu from '../../Hooks/useMenu';
// import SectionTitle from '../../Components/SectionTitle/SectionTitle';
// import MenuCategory from '../Shared/MenuCategory/MenuCategory';
// import dessertImg from '../../assets/menu/dessert-bg.jpeg'
// import soupImg from '../../assets/menu/soup-bg.jpg'
// import saladImg from '../../assets/menu/salad-bg.jpg'
// import pizzaImg from '../../assets/menu/pizza-bg.jpg'
// import { useParams } from 'react-router-dom';


// const Menu = () => {
//     const [menu] = useMenu();
    
//     const dessert = menu?.filter(item=> item.category === 'dessert')
//     const soup = menu?.filter(item=> item.category === 'soup')
//     const salad = menu?.filter(item=> item.category === 'salad')
//     const pizza = menu?.filter(item=> item.category === 'pizza')
//     const offered = menu?.filter(item=> item.category === 'offered')

//     return (
//         <div>
//             <Helmet>
//             <title>Bistro || Menu</title>
//             </Helmet>

//             <Cover img={menuImg} title={'Our Menu'}></Cover>
//             <SectionTitle subheading={"Don't Miss"} heading={"Today's Offer"}></SectionTitle>
//             {/* offered section  */}
//             <MenuCategory items={offered}></MenuCategory>

//             {/* dessert section  */}
//             <MenuCategory items={dessert} title={"dessert"} img={dessertImg}></MenuCategory>
//             <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
//             <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
//             <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
            
           
//         </div>
//     );
// };

// export default Menu;