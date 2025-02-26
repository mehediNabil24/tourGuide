import { useLoaderData } from "react-router-dom";
import Gallery from "./Gallery";
import AllTourGuides from "./AllTourGuides";
import useGuides from "../../Hooks/useGuides";
import BookingForm from "./BookingForm";


const PackageDetails = () => {
    const {
        _id,
        image,
        category,
        price,
        duration,
        location,
        description ,
        tripTitle


    } = useLoaderData();

    const [guides] = useGuides();
    
    return (
        <div>
            <Gallery></Gallery>

            <section className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">About The Tour</h2>

            {/* Tour Overview */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3">🌍 Tour Overview</h3>
                <p className="text-gray-700">
                   {tripTitle}
                </p>
            </div>

            {/* Itinerary */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3">📅 Tour Itinerary</h3>
                
                {
                    duration
                }
            </div>

            {/* Inclusions & Exclusions */}
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

             {/* Why Choose This Tour */}
             <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3">✨ Why Choose This Tour?</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Handpicked Destinations: Explore hidden gems & iconic landmarks</li>
                    <li>Expert Guides: Local professionals for an authentic experience</li>
                    <li>Hassle-Free Travel: Everything arranged for a smooth journey</li>
                    <li>Small Group Experience: Personalized attention & comfort</li>
                </ul>
            </div>

            {/* Pricing & Booking */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3">💰 Pricing & Booking</h3>
                <p className="text-gray-700">Location:{location}</p>
                <p className="text-gray-700">Price:{price}tk</p>
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Reserve Your Spot
                </button>
            </div>

           

           
        </section>

        <AllTourGuides></AllTourGuides>


        <BookingForm _id={_id} price={price} tripTitle={tripTitle}></BookingForm>
            
        </div>
    );
};

export default PackageDetails;