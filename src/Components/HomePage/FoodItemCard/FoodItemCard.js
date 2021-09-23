import React from 'react';
import {Card} from 'react-bootstrap'
import { useContext } from 'react';
import { UserContext } from './../../../App';

const FoodItemCard = ({food , title, price, img , category}) => {
   const [loggedInUser ,] = useContext(UserContext);
    const handleOrder = () => {
        const orderItem = {
            title, price , img , category, 
            email: loggedInUser.email
        }
        fetch(`http://localhost:5000/order`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(orderItem)
        })
        .then(res => res.json())
        .then(data => {

        })
    }
    return (
        <div className=" col-lg-4 col-md-6 d-flex justify-content-center align-items-center mb-5">
            <Card style={{ width: '18rem' }} onClick={handleOrder}>
        <Card.Img variant="top"src={`data:image/png;base64,${food.img.img}`} />
        <Card.Body>
          <Card.Title>{food.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          
        </Card.Body>
      </Card>
        </div>
    );
};

export default FoodItemCard;