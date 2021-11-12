import { useState, useEffect } from "react";
import BASE_URL from "../BaseURL";
import { useHistory } from "react-router-dom";

const Products = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [jerseys, setJerseys] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategoryId] = useState("");

  const fetchJerseys = async () => {
    const response = await fetch(`${BASE_URL}/products`, {
      contentType: "application/json",
      // contentType: "text/plain",
    });
    const info = await response.json();
    // const info = [];
    console.log(info, "info");
    setJerseys(info);
  };
  //   console.log(info.data);
  useEffect(() => {
    fetchJerseys();
  }, []);
  return (
    <div>
      <h1>Fan Haven Jerseys!</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("image", image);
          formData.append("quantity", quantity);
          formData.append("price", price);
          formData.append("description", description);
          formData.append("categoryId", category_id);
          console.log("running");
          const response = await fetch("http://localhost:3001/api/products", {
            method: "POST",
            body: formData,
          });
          console.log(response);
          const info = await response.json();
          fetchJerseys();
          console.log(info);
        }}
      >
        <input
          placeholder="Player's Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="M/F/Y"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button>Add jersey!</button>
      </form>
      {jerseys.map((jersey) => (
        <div>
          <img src={`/images/${jersey.image}`} />
          {/* <img>{jersey.image}</img> */}
          <h3>{jersey.title}</h3>
          <h5>{jersey.price}</h5>
          <h5>{jersey.description}</h5>
          <h5>{jersey.category_id}</h5>
        </div>
      ))}
    </div>
  );
};
export default Products;
