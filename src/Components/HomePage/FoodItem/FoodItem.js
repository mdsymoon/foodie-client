import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import FoodItemCard from "../FoodItemCard/FoodItemCard";

const FoodItem = () => {
    const [item , setItem] = useState([]);
    const [category , setCategory] = useState(null);


    const handleChange = (e) => {
        const newCategory = {category: e.target.value}
        setCategory(newCategory);
        console.log(category);
        
    }

    useEffect(() => {
        fetch(`http://localhost:5000/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({category}),
        })
          .then((res) => res.json())
          .then((data) => {
            setItem(data);
            
          });
      },[category]);

  return (
    <div className="mt-5 container">


      <Form.Select defaultValue="see food" name="category" onChange={(e) => {handleChange(e);}} aria-label="Default select example">
        <option>Select Category</option>
        <option value="sea food">Sea food</option>
        <option value="mexican food">Mexican food</option>
        <option value="drinks">Drinks</option>
      </Form.Select>


      {item.map((food) => <FoodItemCard food={food}></FoodItemCard>)}
    </div>
  );
};

export default FoodItem;
