import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainOutlet from "../Outlet/MainOutlet";
import Home from "../Pages/Home/Home";
// import Menu from "../Pages/Menu/Menu";
// import Order from "../Pages/Shared/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import TourGuideApplication from "../Pages/Dashboard/TourGuideApplication/TourGuideApplication";
import ManageCandidate from "../Pages/Dashboard/ManageCandidate/ManageCandidate";
import AddStory from "../Pages/Dashboard/User/AddStory/AddStory";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import Community from "../Pages/Community/Community";
import AllPackage from "../Pages/AllPackage/AllPackage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ManageProfile from "../Pages/Dashboard/User/ManageProfile/ManageProfile";
import ManageStories from "../Pages/Dashboard/User/ManageStories/ManageStories";
import TourManageProfile from "../Pages/Dashboard/TourGuide/TourManageProfile/TourManageProfile";
import TourProfile from "../Pages/TourProfile/TourProfile";
import MyBooking from "../Pages/Dashboard/User/MyBooking/MyBooking";
import AssignedTours from "../Pages/Dashboard/TourGuide/AssignedTour/AssignedTour";
import AdminManageProfile from "../Pages/Dashboard/AdminManageProfile/AdminManageProfile";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminHome from "../Pages/Dashboard/AdminHome";
import NewPackageDetails from "../Pages/PackageDetails/NewPackageDetails";
// import UserHome from "../Pages/Dashboard/UserHome";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainOutlet></MainOutlet>,
      children : [
        {
            path: '/',
            element: <Home></Home>
        },
        // {
        //   path: '/package',
        //   element: <Menu></Menu>
        // },
        // {
        //   path: '/order/:category',
        //   element: <Order></Order>
        // },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        // {
        //   path: '/packageDetails/:id',
        //   element:<PackageDetails></PackageDetails> ,
        //   loader: ({params})=> fetch(`https://tourism-server-site-mu.vercel.app/packageDetails/${params.id}`)
        // },
        {
          path: '/packageDetails/:id',
          element:<NewPackageDetails></NewPackageDetails>,
          loader: ({params})=> fetch(`https://tourism-server-site-mu.vercel.app/packageDetails/${params.id}`)
        },
        {
          path:'/package',
          element: <AllPackage></AllPackage>

        },
        {
          path: '/community',
          element: <Community></Community>
        },
        {
          path: '/aboutUs',
          element: <AboutUs></AboutUs>

        },
        {
          path: '/tourGuide/:id',
          element:<TourProfile></TourProfile>,
          loader: ({params})=> fetch(`https://tourism-server-site-mu.vercel.app/tourGuide/${params.id}`) 
         
           },
        {
          path: '/secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // normal user route
     

        {
          path: 'cart',
          element: <Cart></Cart>

        },
        
        {
          path: 'tourGuideApply',
          element: <PrivateRoute><TourGuideApplication></TourGuideApplication></PrivateRoute>

        },
        {
          path: 'bookings',
          element: <MyBooking></MyBooking>

        },
        {
          path: 'addStory',
          element:<AddStory></AddStory> 
        },
        {
          path: 'manageProfile',
          element: <ManageProfile></ManageProfile>
        },
        {
          path:'manageStories',
          element: <ManageStories></ManageStories>

        },


        //admin routes
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>

        },
        {
          path: 'addPackage',
          element: <AddItems></AddItems>
        },
        {
          path: 'makeAdmin',
          element: <MakeAdmin></MakeAdmin>

        },
        {
          path: 'allUsers',
          element: <AllUser></AllUser>
        },
        {
          path: 'manageCandidate',
          element: <ManageCandidate></ManageCandidate>
        },
        {
          path: 'manageAdminProfile',
          element: <AdminManageProfile></AdminManageProfile>
        },

        // tour Guide routes
        {
          path: 'tourManageProfile',
          element: <TourManageProfile></TourManageProfile>
        },
        {
          path: 'myTours',
          element: <AssignedTours></AssignedTours>
        }

        

      ]
    }
  ]);