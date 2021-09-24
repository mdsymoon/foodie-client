import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllItem = () => {
  const [allItems, setAllItems] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    fetch(`https://rocky-citadel-22706.herokuapp.com/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data);
        setLoadData(true);
      });
  },[allItems]);

  const handleDelete = (_id) => {
    fetch(`https://rocky-citadel-22706.herokuapp.com/deleteItems`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://rocky-citadel-22706.herokuapp.com/items`)
          .then((res) => res.json())
          .then((data) => {
            setAllItems(data);
          });
      },[_id]);
  };
  return (
    <div className="container">
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
              <tr key={item._id}>
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
                  <Tooltip
                    title="DELETE"
                    placement="left"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    <IconButton>
                      <HighlightOffIcon />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center mt-5">
          {!loadData && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="secondary" />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllItem;
