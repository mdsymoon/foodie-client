import React, { useState } from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import Button from "@restart/ui/esm/Button";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);

    fetch(`https://rocky-citadel-22706.herokuapp.com/addProduct`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
      });
  };
  return (
    <div className="addProduct-form">
      <h1>Add Items</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-control input-style"
          placeholder="Items Name"
          {...register("title", { required: true })}
        />
        <br />
        <input
          className="form-control input-style"
          placeholder="Items Price"
          type="number"
          {...register("price", { required: true })}
        />
        <br />
        <input
          className="form-control input-style"
          placeholder="Items category"
          {...register("category", { required: true })}
        />
        <br />
        <input
          className="input-style"
          type="file"
          {...register("img", { required: true })}
          onChange={handleFileChange}
        />
        <br />
        <br />

        <Button variant="contained" type="submit" className="mb-5">
          Add Items
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
