import { useState, useEffect } from "react";
import BASE_URL from "../BaseURL";
import { Link, useHistory } from "react-router-dom";

const Products = (props) => {
  const {
    jerseys,
    setJerseys,
    fetchJerseys,
    user,
    activeOrder,
    setActiveOrder,
  } = props;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category_id, setCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState("");
  //   console.log(info.data);
  useEffect(() => {
    fetchJerseys();
  }, []);

  const addToCart = async ({ product_id, price, quantity }) => {
    const response = await fetch(`${BASE_URL}/orders/${user.id}/orders`);
    const orders = await response.json();
    const cartOrder = orders.filter((order) => {
      return order.status == "pending";
    });
    if (cartOrder.length > 0) {
      setActiveOrder(cartOrder[0]);
    } else {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id, status: "pending" }),
      });
      const order = await response.json();
      setActiveOrder(order);
    }

    const resp = await fetch(`${BASE_URL}/productorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
        price: price,
        order_id: activeOrder.id,
        quantity: quantity,
      }),
    });
    const productOrder = await resp.json();
    console.log(productOrder);
    setActiveOrder(productOrder);
  };

  return (
    <>
      {user && user.admin && <Link to="create_jersey">ADD NEW JERSEY</Link>}
      <div className="searchbar-div">
        <input
        className="product-searchbar"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>


      <div className="jerseyGrid">
        {jerseys
          .filter((jersey) => {
            if (searchTerm == "") {
              return jersey;
            } else if (
              jersey.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
              return jersey;
          })
          .map((jersey) => {
            return (
              <div className="jersey-columns">
                {jersey.image.includes("https") ? (
                  <img className="thumbnail" src={jersey.image} />
                ) : (
                  <img className="thumbnail" src={`/images/${jersey.image}`} />
                )}
                <h2>{jersey.title}</h2>
                <h3>${jersey.price}</h3>
                <h5>{jersey.description}</h5>
                {jersey.category_id == 1 ? (
                  <h5>Men's Jersey</h5>
                ) : jersey.category_id == 2 ? (
                  <h5>Women's Jersey</h5>
                ) : (
                  <h5>Youth Jersey</h5>
                )}
                {jersey.quantity > 0 ? (
                  <>
                    <div>
                      <p>Choose Quantity– {jersey.quantity} remaining:</p>
                      <select
                        className="quantity"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      >
                        {Array(jersey.quantity)
                          .fill("")
                          .map((nonsense, index) => {
                            return (
                              <option value={index + 1}>{index + 1}</option>
                            );
                          })}
                      </select>
                      <button
                        className="addCart"
                        onClick={() => {
                          addToCart({
                            product_id: jersey.id,
                            price: jersey.price,
                            quantity: quantity,
                          });
                        }}
                      >
                        Add to cart!
                      </button>
                    </div>
                  </>
                ) : (
                  <p>SOLD OUT</p>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Products;
