import { useState } from "react";
import { useHistory } from "react-router";
import BASE_URL from "../BaseURL";

const NewJersey = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategoryId] = useState("");
  const { user, fetchJerseys } = props;
  return (
    <>
      {user.admin ? (
        <>
          <h3>Add a new jersey to inventory:</h3>
          <div className="newJersey">
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
                const response = await fetch(`${BASE_URL}/products`, {
                  method: "POST",
                  body: formData,
                });
                console.log(response);
                const info = await response.json();
                fetchJerseys();
                console.log(info);
                history.push("/products");
              }}
            >
              <input
                className="name"
                placeholder="Player's Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="team"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                className="number"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <input
                className="price"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {/* <input
              placeholder="M/F/Y"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
            />  */}
              <span className="mfy">Category:</span>
              <select name="selectList" id="selectList">
                <option value={category_id[1]}>Men</option>{" "}
                <option value={category_id[2]}>Women</option>{" "}
                <option value={category_id[3]}>Youth</option>
              </select>

              <input
                className="file"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button id="addingJersey">Add jersey!</button>
            </form>
          </div>
        </>
      ) : (
        <h3>NOT AUTHORIZED TO CREATE NEW JERSEYS</h3>
      )}
    </>
  );
};

export default NewJersey;
