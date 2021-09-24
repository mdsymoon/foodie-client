import React, { useEffect, useState  } from "react";
import "./FoodItem.css";
import { Form } from "react-bootstrap";
import FoodItemCard from "../FoodItemCard/FoodItemCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const FoodItem = () => {
  const [loadData , setLoadData] = useState(false);
  const [item, setItem] = useState([]);
  const [category, setCategory] = useState(null);

  const handleChange = (e) => {
    const newCategory = { category: e.target.value };
    setCategory(newCategory);
    setLoadData(true);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoadData(true);
      });
  }, [category]);

  return (
    <div className="mt-5 container">
      <h1 className="menu-title">Fresh From Foodie</h1>
      <h1 className="menu-header"> OUR SPECIAL MENU</h1>
      
      <Form.Select
        className="selector"
        
        name="category"
        onChange={(e) => {
          handleChange(e);
          setLoadData(false);
        }}
        aria-label="Default select example"
      >
        <option >Select Category</option>
        <option value="sea food">Sea food</option>
        <option value="mexican food">Mexican food</option>
        <option value="drinks">Drinks</option>
        <option value="burger">Burger</option>
        <option value="pizza">Pizza</option>
        <option value="slice cake">Slice Cake</option>
      </Form.Select>
      <div className="d-flex justify-content-center mb-5">
        {!loadData && <Box sx={{ display: 'flex' }}>
      <CircularProgress color="secondary" />
    </Box>}
      </div>

      <div className="row d-flex justify-content-center">
        {item.map((food) => (
          <FoodItemCard food={food} title={food.title} price={food.price} img={food.img} category={food.category}></FoodItemCard>
        ))}
      </div>
    </div>
  );
};

export default FoodItem;
