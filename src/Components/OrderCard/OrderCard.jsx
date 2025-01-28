import React from 'react';

const OrderCard = ({item}) => {
    const {name, image, price, recipe} = item;
    return (
        <div className="card card-compact bg-base-100  shadow-xl">
  <figure>
    <p className="absolute right-0 top-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
    <img className='object-cover'
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-outline border-0 bg-slate-100 border-orange-400 border-b-4">Add To Cart</button>
    </div>
  </div>
</div>
    );
};

export default OrderCard;