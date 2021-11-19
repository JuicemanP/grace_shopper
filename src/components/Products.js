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
    fetchCartProducts,
    setCartProducts,
  } = props;
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryName, setCategoryName] = useState("All");
  const [cartNotification, setCartNotification] = useState(0);
  //   console.log(info.data);
  useEffect(() => {
    fetchJerseys();
  }, []);

  useEffect(() => {
    const filteredJerseys = jerseys.filter(
      (jersey) => jersey.category_id == categoryId
    );
    return setJerseys(filteredJerseys);
  }, [categoryId]);

  const filterByCategory = async (category_id) => {
    await fetchJerseys();
    if (category_id == 1) {
      setCategoryName("Men's");
      setCategoryId(1);
    } else if (category_id == 2) {
      setCategoryName("Women's");
      setCategoryId(2);
    } else if (category_id == 3) {
      setCategoryName("Youth");
      setCategoryId(3);
    } else {
      setCategoryName("All");
      await fetchJerseys();
      return;
    }
  };

  const addToCart = async ({ product_id, price, quantity }) => {
    setCartProducts([]);
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
    fetchCartProducts();
    // history.push("/cart");
  };

  return (
    <>
      <div className="add-jersey">
        {user && user.admin && <Link to="create_jersey">ADD NEW JERSEY</Link>}
      </div>
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
      <div className="category-bar">
        <div className="category-select">
          Shop Jerseys by category:{" "}
          <span
            className="category"
            onClick={() => {
              filterByCategory(1);
            }}
          >
            Men's Jerseys{" "}
          </span>
          <span
            className="category"
            onClick={() => {
              filterByCategory(2);
            }}
          >
            Women's Jerseys{" "}
          </span>
          <span
            className="category"
            onClick={() => {
              filterByCategory(3);
            }}
          >
            Youth Jerseys{" "}
          </span>
          <span
            className="category"
            onClick={() => {
              filterByCategory(4);
            }}
          >
            All Jerseys
          </span>
        </div>

        <div className="category-select">
          Currently Viewing {categoryName} Jerseys
        </div>
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
                {user && jersey.quantity > 0 && (
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
                          setCartNotification(jersey.id);
                          addToCart({
                            product_id: jersey.id,
                            price: jersey.price,
                            quantity: quantity,
                          });
                        }}
                      >
                        Add to cart!
                      </button>
                      {cartNotification == jersey.id && (
                        <span className="cart-notif">Added to Cart!</span>
                      )}
                    </div>
                  </>
                )}
                {user && jersey.quantity == 0 && <p>SOLD OUT</p>}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Products;
