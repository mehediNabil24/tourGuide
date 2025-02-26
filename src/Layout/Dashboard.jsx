import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";

import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [roles, isRolesLoading] = useAdmin(); // Get roles
    const { admin, tourGuide } = roles; // Extract roles

    if (isRolesLoading) {
        return <p>Loading...</p>; // Show loading while fetching
    }

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-500">
                <ul className="menu p-4">
                    {/* Show Admin Features */}
                    {admin && (
                        <>
                            <li><NavLink to={'/dashboard/adminHome'}>Admin Home</NavLink></li>
                            <li><NavLink to={'/dashboard/addPackage'}>Add Package</NavLink></li>
                            <li><NavLink to={'/dashboard/manageItems'}>Manage Items</NavLink></li>
                            <li><NavLink to={'/dashboard/manageCandidate'}>Manage Candidates</NavLink></li>
                            <li><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>
                            <li><NavLink to={'/dashboard/manageAdminProfile'}>ManageProfile</NavLink></li>
                        </>
                    )}

                    {/* Show Tour Guide Features */}
                    {tourGuide && (
                        <>
                            <li><NavLink to={'/dashboard/tourGuideDashboard'}>Tour Guide Home</NavLink></li>
                            <li><NavLink to={'/dashboard/myTours'}>My Tours</NavLink></li>
                            <li><NavLink to={'/dashboard/addStory'}>Add Stories</NavLink></li>
                            <li><NavLink to={'/dashboard/tourManageProfile'}>ManageProfile</NavLink></li>
                        </>
                    )}

                    {/* Show User Features (if not admin or tourGuide) */}
                    {!admin && !tourGuide && (
                        <>
                            <li><NavLink to={'/dashboard/userHome'}>User Home</NavLink></li>
                            <li><NavLink to={'/dashboard/manageProfile'}>ManageProfile</NavLink></li>
                            <li><NavLink to={'/dashboard/tourGuideApply'}>Apply for Tour Guide</NavLink></li>
                            <li><NavLink to={'/dashboard/addStory'}>Add Story</NavLink></li>
                            <li><NavLink to={'/dashboard/bookings'}>My Bookings</NavLink></li>
                            <li><NavLink to={'/dashboard/manageStories'}>MangeStories</NavLink></li>
                        </>
                    )}

                    <div className="divider divider-neutral"></div>

                    {/* Shared Items */}
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/menu'}>Menu</NavLink></li>
                    <li><NavLink to={'/contact'}>Contact Us</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

