import React, { useContext } from "react";
import { UserContext } from "./../../../App";
import { useState } from "react";
import { useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Table} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const OrderItem = () => {
  const [loggedInUser] = useContext(UserContext);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/orderItem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [order, loggedInUser.email]);

  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/deleteOrder`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:5000/orderItem`)
          .then((res) => res.json())
          .then((data) => {
            setOrder(data);
          });
      });
  };
  return (
    <div className="container">
      <h1 className="menu-header mt-5">MY ORDER ITEM</h1>
      <div>
        <Table style={{ minWidth: "700px" }} responsive>
          <thead>
            <tr>
              <th>Item</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr>
                <td>
                  <img
                    src={`data:image/png;base64,${item.img.img}`}
                    style={{ width: "70px" }}
                    alt=""
                  />
                </td>
                <td>
                  <p style={{ marginTop: "10px" }}>{item.title}</p>
                </td>
                <td>
                  <p style={{ marginTop: "10px" }}>${item.price}</p>
                </td>
                <td>
                  <p style={{ marginTop: "10px" }}>{item.category}</p>
                </td>
                <td>
                  <Tooltip title="cancel" placement="left" style={{ marginTop: "10px" }} onClick={() =>{handleDelete(item._id)}}>
                    <IconButton>
                      <HighlightOffIcon  />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderItem;
