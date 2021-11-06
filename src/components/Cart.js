import { useState } from "react";
import { product } from "/products";
function Cart() {
  const { product } = product;
  const [cartItems, setCartItems] = useState([]);
  const addProduct = (product) => {
    const existingItem = cartItems.find((e) => e.username === product.username);
    if (existingItem) {
      setCartItems(
        cartItems.map((e) =>
          e.username === product.username
            ? { ...existingItem, qty: existingItem.qty + 1 }
            : e
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const removeItem = (product) => {
    const existingItem = cartItems.find((e) => e.username === product.username);
    if (existingItem.qty === 1) {
      setCartItems(cartItems.filter((e) => e.username !== product.username));
    } else {
      setCartItems(
        cartItems.map((e) =>
          e.username === product.username
            ? { ...existingItem, qty: existingItem.qty - 1 }
            : e
        )
      );
    }
  };
  return (
    <div>
      <Header CartItems={cartItems.length}></Header>
      <div>
        <Main product={product} addProduct={addProduct}></Main>
        <Basket
          cartItems={cartItems}
          addProduct={addProduct}
          removeItem={removeItem}
        ></Basket>
      </div>
    </div>
  );
}

export default Cart;
