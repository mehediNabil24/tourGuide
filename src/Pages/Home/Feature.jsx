import React from "react";
import NewSectionTitle from "../../Components/SectionTitle/NewSectionTitle";

const Features = () => {
  const features = [
    {
      icon: "🌎",
      title: "Explore Top Destinations",
      description:
        "Discover breathtaking locations around the world with personalized recommendations.",
    },
    {
      icon: "🏨",
      title: "Handpicked Hotels & Stays",
      description:
        "Find the best accommodations, from luxury resorts to budget-friendly stays.",
    },
    {
      icon: "🚗",
      title: "Easy Transportation",
      description:
        "Get seamless travel experiences with car rentals, local transport guides, and airport pickups.",
    },
    {
      icon: "🍽️",
      title: "Local Cuisine & Food Tours",
      description:
        "Taste authentic local dishes and enjoy curated food experiences in every destination.",
    },
    {
      icon: "🎟️",
      title: "Exclusive Travel Deals",
      description:
        "Access exclusive discounts on flights, hotels, and experiences to make your trip more affordable.",
    },
    {
      icon: "📞",
      title: "24/7 Customer Support",
      description:
        "Our team is available around the clock to assist you with any travel concerns or bookings.",
    },
  ];

  return (
    <div> <NewSectionTitle heading='Why Choose Us' subheading={'For Your Next Trip'} />
    <section className="bg-gray-100 py-12 mb-10">
      
      <div className="container mx-auto  lg:px-20">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-5xl text-blue-500 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Features;
