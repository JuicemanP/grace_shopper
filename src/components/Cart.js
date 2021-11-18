import { useEffect, useState } from "react";
import BASE_URL from "../BaseURL";

const Cart = (props) => {
  const{activeOrder,jerseys,setActiveOrder,
    cartProducts,setCartProducts,fetchCartProducts
  ,checkForCart}=props
const [userProduct,setUserProduct]=useState({})
const [quantity, setQuantity] = useState(0);
const [errorMessage,setErrorMessage]=useState("")

const handleDelete= (async (id)=>{
  const resp = await fetch(`${BASE_URL}/productorders/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
       
      }
    })
    console.log(resp)
    const info = await resp.json()
    fetchCartProducts()
    if(info.error){
      setErrorMessage(info.error)
      return
  }
  setErrorMessage("")
})
useEffect(()=>{
 fetchCartProducts()
},[]);
  
console.log(cartProducts)

  const sum =cartProducts.reduce((partial_sum, product) => partial_sum + parseFloat(product.cartprice ) * parseFloat(product.cartquantity), 0);
  return <div >
    <div>
<div>
 <h2 className="items-text">Items:</h2>
 
 <div className="cart-grid">
   
   {cartProducts.map((product)=>{
return(<div className="jersey-cart">
  
    <div >
    {product.image.includes("https") ? (
                  <img className="thumbnail-cart" src={product.image} />
                ) : (
                  <img className="thumbnail-cart" src={`/images/${product.image}`} />
                )}
  </div>
  <div>
    <h3 className="jersey-title">{product.title}</h3>
  </div>
  <div>
    <h3 className="jersey-price"> ${product.cartprice}</h3>
  </div>
<div
><h3 className="jersey-quantity">Quantity: {product.cartquantity}</h3>

</div>
<div>
  <button onClick={()=>handleDelete(product.id)}>REMOVE</button>
</div>
</div>)

   })}
 

</div>
<div className="subtotal">
  <div className="total">Subtotal: ${sum}
  </div>
      
      <div>
        <button className="checkout-btn" >Checkout</button>
        </div>
    </div>
      </div>
    </div>
    
  </div>
}
export default Cart;
