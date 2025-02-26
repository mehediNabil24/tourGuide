import { useState, useRef } from "react";
import Gallery from "./Gallery";
import BookingForm from './BookingForm';
import AllTourGuides from "./AllTourGuides";
import { useLoaderData } from "react-router-dom";

const PackageDetails = () => {
    const {
        _id,
        image,
        category,
        price,
        duration,
        location,
        description,
        tripTitle
    } = useLoaderData();

    const [showBookingModal, setShowBookingModal] = useState(false);
    const modalRef = useRef(null);

    const handleReserveClick = () => {
        setShowBookingModal(true);
    };

    const handleCloseModal = () => {
        setShowBookingModal(false);
    };

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowBookingModal(false);
        }
    };

    return (
        <div>
            <Gallery />

            <section className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-center mb-6">About The Tour</h2>

                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-3">🌍 Tour Overview</h3>
                    <p className="text-gray-700">{tripTitle}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-3">📅 Tour Itinerary</h3>
                    {duration}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">✅ Included</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Accommodation in premium hotels</li>
                            <li>Daily breakfast and dinner</li>
                            <li>Guided sightseeing tours</li>
                            <li>Entrance fees to attractions</li>
                            <li>Transportation within the tour</li>
                        </ul>
                    </div>

                    <div className="bg-red-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">❌ Not Included</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>International airfare</li>
                            <li>Personal expenses (shopping, extra meals)</li>
                            <li>Travel insurance</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-3">✨ Why Choose This Tour?</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Handpicked Destinations: Explore hidden gems & iconic landmarks</li>
                        <li>Expert Guides: Local professionals for an authentic experience</li>
                        <li>Hassle-Free Travel: Everything arranged for a smooth journey</li>
                        <li>Small Group Experience: Personalized attention & comfort</li>
                    </ul>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-3">💰 Pricing & Booking</h3>
                    <p className="text-gray-700">Location: {location}</p>
                    <p className="text-gray-700">Price: {price}tk</p>
                    <button
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleReserveClick}
                    >
                        Reserve Your Spot
                    </button>
                </div>

                {showBookingModal && (
                    <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
                        onClick={handleModalClick}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                            ref={modalRef}
                        >
                            <button
                                className="absolute top-2 right-2 text-gray-500"
                                onClick={handleCloseModal}
                            >
                                &times;
                            </button>
                            <BookingForm
                                _id={_id}
                                price={price}
                                tripTitle={tripTitle}
                                closeModal={handleCloseModal} // Pass closeModal function
                            />
                        </div>
                    </div>
                )}
            </section>

            <AllTourGuides />
        </div>
    );
};

export default PackageDetails;
