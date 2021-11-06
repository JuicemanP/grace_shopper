import { useState,useEffect} from "react"

import BASE_URL from "../BaseURL"


const Products = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [jerseys, setJerseys] = useState([]);
    const fetchJerseys = async () => {
      const response = await fetch(`${BASE_URL}/getProducts`, {
        contentType: "application/json",
        //   contentType: "text/plain",
      });
      const info = await response.json();
      // setJerseys(info.data);
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
            formData.append("name", name);
            formData.append("image", image);
            console.log("running");
            const response = await fetch("http://localhost:3001/api/products", {
              method: "POST",
              body: formData,
            });
            const info = await response.json();
          }}
        >
          <input
            placeholder="Player's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button>Add jersey!</button>
        </form>
        {jerseys.map((jerseys) => (
          <div>
            <h3>{jerseys.name}</h3>
            <img src={`http://localhost:3001/api/images/${jerseys.image}`} />
          </div>
        ))}
      </div>
    );
  };
  export default Products