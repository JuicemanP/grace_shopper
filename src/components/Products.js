import { useState, useEffect } from "react";
import BASE_URL from "../BaseURL";
import { useHistory } from "react-router-dom";

const Products = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [jerseys, setJerseys] = useState([]);

  const fetchJerseys = async () => {
    const response = await fetch(`${BASE_URL}/products`, {
      contentType: "application/json",
      //   contentType: "text/plain",
    });
    const info = await response.json();
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
          console.log("running");
          const response = await fetch("http://localhost:3001/api/products", {
            method: "POST",
            body: formData,
          });
          const info = await response.json();
          fetchJerseys();
          console.log(info);
        }}
      >
        <input
          placeholder="Player's title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button>Add jersey!</button>
      </form>
      {jerseys.map((jersey) => (
        <div>
          <h3>{jersey.title}</h3>
          {/* <img src={`http://localhost:3001/api/images/${jersey.image}`} /> */}
        </div>
      ))}
    </div>
  );
};

export default Products;
