import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for toggle
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [roles, isRolesLoading] = useAdmin();
    const { admin, tourGuide } = roles;
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

    useEffect(() => {
        if (!isRolesLoading) {
            if (admin) {
                navigate('/dashboard/manageAdminProfile', { replace: true });
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
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed md:relative top-0 left-0 min-h-screen bg-[#135D66] text-white md:w-64 p-4 z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <button 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="md:hidden absolute top-0 right-4 text-white text-2xl"
                >
                    <FaTimes />
                </button>
                <ul className="menu space-y-3">
    {admin && (
        <>
           
            <li><NavLink to="/dashboard/manageAdminProfile" onClick={() => setIsSidebarOpen(false)}>Admin Home</NavLink></li>
            <li><NavLink to="/dashboard/addPackage" onClick={() => setIsSidebarOpen(false)}>Add Package</NavLink></li>
            <li><NavLink to="/dashboard/makeAdmin" onClick={() => setIsSidebarOpen(false)}>Make Admin</NavLink></li>
            <li><NavLink to="/dashboard/manageCandidate" onClick={() => setIsSidebarOpen(false)}>Manage Candidates</NavLink></li>
            <li><NavLink to="/dashboard/allUsers" onClick={() => setIsSidebarOpen(false)}>All Users</NavLink></li>
        </>
    )}

    {tourGuide && (
        <>
            <li className="text-xl font-bold">Tour Guide Home</li>
            <li><NavLink to="/dashboard/myTours" onClick={() => setIsSidebarOpen(false)}>My Tours</NavLink></li>
            <li><NavLink to="/dashboard/addStory" onClick={() => setIsSidebarOpen(false)}>Add Stories</NavLink></li>
            <li><NavLink to="/dashboard/tourManageProfile" onClick={() => setIsSidebarOpen(false)}>Manage Profile</NavLink></li>
        </>
    )}

    {!admin && !tourGuide && (
        <>
            <li><NavLink to="/dashboard/manageProfile" onClick={() => setIsSidebarOpen(false)}>User Home</NavLink></li>
            <li><NavLink to="/dashboard/tourGuideApply" onClick={() => setIsSidebarOpen(false)}>Apply for Tour Guide</NavLink></li>
            <li><NavLink to="/dashboard/addStory" onClick={() => setIsSidebarOpen(false)}>Add Story</NavLink></li>
            <li><NavLink to="/dashboard/bookings" onClick={() => setIsSidebarOpen(false)}>My Bookings</NavLink></li>
            <li><NavLink to="/dashboard/manageStories" onClick={() => setIsSidebarOpen(false)}>Manage Stories</NavLink></li>
        </>
    )}

    <div className="divider divider-neutral"></div>

    <li className="font-bold"><NavLink to="/" onClick={() => setIsSidebarOpen(false)}>Home</NavLink></li>
    <li><NavLink to="/aboutUs" onClick={() => setIsSidebarOpen(false)}>About Us</NavLink></li>
</ul>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-5 sticky top-0 ">
                {/* Toggle Button for Mobile */}
                <button 
                    onClick={() => setIsSidebarOpen(true)} 
                    className="md:hidden fixed top-4 left-4 text-2xl bg-[#135D66] text-white p-2 rounded"
                >
                    <FaBars />
                </button>

                
                <div onClick={() => setIsSidebarOpen(false)}><Outlet /></div>
            </div>
        </div>
    );
};

export default Dashboard;
