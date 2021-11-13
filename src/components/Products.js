import { useState, useEffect } from "react";
import BASE_URL from "../BaseURL";
import { Link, useHistory } from "react-router-dom";

const Products = (props) => {
  const { jerseys, setJerseys, fetchJerseys, user } = props;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [searchTerm,setSearchTerm]= useState("");
  //   console.log(info.data);
  useEffect(() => {
    fetchJerseys();
  }, []);
  return (
    <>
      {user && user.admin && <Link to="create_jersey">ADD NEW JERSEY</Link>}
      <div>
        <input 
        type="text"
        placeholder="Search..."
        onChange={(e)=>{setSearchTerm(e.target.value)}}
        />
      </div>
      <div>
        {jerseys.filter((jersey)=>{
          if(searchTerm ==""){
            return jersey
          }else if (jersey.title.toLowerCase().includes(searchTerm.toLowerCase()))
          return jersey}).map((jersey) => {
          console.log(jersey);

          return (
            <div>
              {jersey.image.slice(0, 4) == "https" ? (
                <img className="thumbnail" src={jersey.image} />
              ) : (
                <img className="thumbnail" src={`/images/${jersey.image}`} />
              )}
              <h3>{jersey.title}</h3>
              <h5>{jersey.price}</h5>
              <h5>{jersey.description}</h5>
              <h5>{jersey.category_id}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Products;
