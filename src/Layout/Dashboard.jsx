import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [roles, isRolesLoading] = useAdmin();
    const { admin, tourGuide } = roles;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isRolesLoading) {
            if (admin) {
                navigate('/dashboard/addPackage', { replace: true });
            } else if (tourGuide) {
                navigate('/dashboard/myTours', { replace: true });
            } else {
                navigate('/dashboard/manageProfile', { replace: true });
            }
        }
    }, [isRolesLoading, admin, tourGuide, navigate]);

    if (isRolesLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="md:flex ">
            <div className="md:w-64 md:min-h-screen bg-orange-500">
                <ul className="menu p-4">
                    {admin && (
                        <>
                            <li className="text-xl ml-2 font-bold">Admin Home</li>
                            <li><NavLink to={'/dashboard/addPackage'}>Add Package</NavLink></li>
                            <li><NavLink to={'/dashboard/makeAdmin'}>Make Admin</NavLink></li>
                            <li><NavLink to={'/dashboard/manageCandidate'}>Manage Candidates</NavLink></li>
                            <li><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>
                            <li><NavLink to={'/dashboard/manageAdminProfile'}>Manage Profile</NavLink></li>
                        </>
                    )}

                    {tourGuide && (
                        <>
                            <li className="text-xl ml-2 font-bold">Tour Guide Home</li>
                            <li><NavLink to={'/dashboard/myTours'}>My Tours</NavLink></li>
                            <li><NavLink to={'/dashboard/addStory'}>Add Stories</NavLink></li>
                            <li><NavLink to={'/dashboard/tourManageProfile'}>Manage Profile</NavLink></li>
                        </>
                    )}

                    {!admin && !tourGuide && (
                        <>
                            <li className="text-xl ml-2 font-bold">User Home</li>
                            <li><NavLink to={'/dashboard/manageProfile'}>Manage Profile</NavLink></li>
                            <li><NavLink to={'/dashboard/tourGuideApply'}>Apply for Tour Guide</NavLink></li>
                            <li><NavLink to={'/dashboard/addStory'}>Add Story</NavLink></li>
                            <li><NavLink to={'/dashboard/bookings'}>My Bookings</NavLink></li>
                            <li><NavLink to={'/dashboard/manageStories'}>Manage Stories</NavLink></li>
                        </>
                    )}

                    <div className="divider divider-neutral"></div>

                    <li className="font-bold"><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/aboutUs'}>About Us</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

