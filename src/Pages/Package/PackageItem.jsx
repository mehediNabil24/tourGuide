import React from 'react';

const PackageItem = ({item}) => {
    const {tripTitle, image, location} = item;
    
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={image}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{tripTitle}</h2>
          <p>{location}</p>
          <div className="card-actions justify-end">
            <button className="btn bg-[#003C43]">Package Details</button>
          </div>
        </div>
      </div>
    );
};

export default PackageItem;