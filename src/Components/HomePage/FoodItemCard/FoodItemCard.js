import React from 'react';

const FoodItemCard = ({food}) => {
    return (
        <div>
            <h1>{food.title}</h1>
        </div>
    );
};

export default FoodItemCard;