import React, { useState } from "react";
import './FoodItemCard.css';
import { Card , Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "./../../../App";
import Modal from 'react-modal';

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
  },
};

const FoodItemCard = ({ food, title, price, img, category }) => {
  const [loggedInUser] = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleOrder = () => {
    const orderItem = {
      title,
      price,
      img,
      category,
      email: loggedInUser.email,
    };
    fetch(`http://localhost:5000/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItem),
    })
      .then((res) => res.json())
      .then((data) => {
        openModal()
      });
  };
  return (
    <div className="item-card col-lg-4 col-md-6 d-flex justify-content-center align-items-center mb-5">
      {loggedInUser.email ? (
        <Card style={{ width: "18rem" }} onClick={handleOrder}>
          <Card.Img
            variant="top"
            src={`data:image/png;base64,${food.img.img}`}
          />
          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title>{food.title}</Card.Title>
              <Card.Title>${food.price}</Card.Title>
            </div>
          </Card.Body>
          
        </Card>
        
      ) : (
        <Card
          style={{ width: "18rem" }}
          onClick={() => {
            alert("Please Login First");
          }}
        >
          <Card.Img
            variant="top"
            src={`data:image/png;base64,${food.img.img}`}
          />
          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title>{food.title}</Card.Title>
              <Card.Title>${food.price}</Card.Title>
            </div>
          </Card.Body>
        </Card>
      )}
       <Modal
        isOpen={modalIsOpen}
        
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h4>'{food.title}' added to your order.</h4>
        <button onClick={closeModal}>close</button>
        
      </Modal>
    </div>
    
  );
};

export default FoodItemCard;
