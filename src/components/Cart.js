import { useEffect, useState } from "react";

const Cart = (props) => {
  const {
    activeOrder,
    jerseys,
    setActiveOrder,
    cartProducts,
    setCartProducts,
    fetchCartProducts,
    checkForCart,
    filterCartProducts,
  } = props;
  console.log(activeOrder);
  const [userProduct, setUserProduct] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchCartProducts();
    filterCartProducts();
  }, []);

  console.log(cartProducts);

  const sum = cartProducts.reduce(
    (partial_sum, product) =>
      partial_sum +
      parseFloat(product.cartprice) * parseFloat(product.cartquantity),
    0
  );
  return (
    <div>
      <div>
        <div>
          <h2>Items:</h2>

          <div>
            {cartProducts.map((product) => {
              return (
                <div className="jersey-columns">
                  <div>
                    {product.image.includes("https") ? (
                      <img className="thumbnail" src={product.image} />
                    ) : (
                      <img
                        className="thumbnail"
                        src={`/images/${product.image}`}
                      />
                    )}
                  </div>
                  <div>
                    <h3>{product.title}</h3>
                  </div>
                  <div>
                    <h3>Price: ${product.cartprice}</h3>
                  </div>
                  <div>
                    <h3>Quantity: {product.cartquantity}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="subtotal">
            Subtotal: ${sum}
            <div>
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
