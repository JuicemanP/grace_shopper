import { useEffect, useState } from "react";

const Cart = (props) => {
  const{activeOrder,jerseys,setActiveOrder,
    cartProducts,setCartProducts}=props
  console.log(activeOrder)
const [userProduct,setUserProduct]=useState({})
const [quantity, setQuantity] = useState(0);

useEffect(()=>{
},[]);
  
console.log(cartProducts)
 
  const sum =cartProducts.reduce((partial_sum, product) => partial_sum + parseFloat(product.cartprice ) * parseFloat(product.cartquantity), 0);
  return <div >
    <div>
<div>
 Items:
 <div>
   {cartProducts.map((product)=>{
return(<div>
    <div>
    {product.image.includes("https") ? (
                  <img className="thumbnail" src={product.image} />
                ) : (
                  <img className="thumbnail" src={`/images/${product.image}`} />
                )}
  </div>
  <div>
    <h3>{product.title}</h3>
  </div>
  <div>
    <h3>Price: ${product.cartprice}</h3>
  </div>
<div
><h3>Quantity: {product.cartquantity}</h3>
</div>
</div>)
   })}
   <div >
      Subtotal: ${sum}
    </div>
    <div>
      <button>Checkout</button>
    </div>
      </div>
<div>

</div>
</div>
    </div>
  </div>
}
export default Cart;
