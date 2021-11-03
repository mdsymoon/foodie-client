import React, { useEffect, useState } from "react";
import "./FoodItem.css";
import { Form } from "react-bootstrap";
import FoodItemCard from "../FoodItemCard/FoodItemCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FoodItem = () => {
  const [loadData, setLoadData] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleChange = (e) => {
    const newCategory = e.target.value;
    if (newCategory) {
      const newItems = items.filter((item) => item.category === newCategory);
      setFilteredItems(newItems);
    } else {
      setFilteredItems(items);
    }
  };

  useEffect(() => {
    fetch(`https://rocky-citadel-22706.herokuapp.com/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        
        setLoadData(true);
      });
  },[]);

  return (
    <div className="mt-5 container">
      <h1 className="menu-title">Fresh From Foodie</h1>
      <h1 className="menu-header"> OUR SPECIAL MENU</h1>

      <Form.Select
        className="selector"
        name="category"
        onChange={(e) => handleChange(e)}
        aria-label="Default select example"
      >
        <option value="">Select Category</option>
        <option value="sea food">Sea food</option>
        <option value="mexican food">Mexican food</option>
        <option value="drinks">Drinks</option>
        <option value="burger">Burger</option>
        <option value="pizza">Pizza</option>
        <option value="slice cake">Slice Cake</option>
      </Form.Select>
      <div className="d-flex justify-content-center mb-5">
        {!loadData && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="secondary" />
          </Box>
        )}
      </div>

      <div className="row d-flex justify-content-center">
        {filteredItems.map((food) => (
          <FoodItemCard
            key={food._id}
            food={food}
            title={food.title}
            price={food.price}
            img={food.img}
            category={food.category}
          ></FoodItemCard>
        ))}
      </div>
    </div>
  );
};

export default FoodItem;
