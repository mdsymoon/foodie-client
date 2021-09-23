import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const AllItem = () => {
    const [allItems , setAllItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(),
        })
          .then((res) => res.json())
          .then((data) => {
            setAllItems(data);
          });
      });

      const handleDelete = (_id) => {
        
        fetch(`http://localhost:5000/deleteItems`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id }),
          
        })
          .then((res) => res.json())
          .then((data) => {
            fetch(`http://localhost:5000/items`)
              .then((res) => res.json())
              .then((data) => {
                setAllItems(data);
              });
          });
      };
    return (
        <div className='container'>
      <h1 className="menu-header mt-5">ALL ITEMS COLLECTION</h1>
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
            {allItems.map((item) => (
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

export default AllItem;