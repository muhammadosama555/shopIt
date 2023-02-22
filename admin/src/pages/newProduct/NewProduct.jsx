import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNewProduct } from "../../reducers/apiCalls";
import { isPostedReset } from "../../reducers/productReducers";
import "./newProduct.css";

export default function NewProduct() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isPosted } = useSelector((state) => state.productSlice);

  const submitHandler = (e) => {
    e.preventDefault();
    postNewProduct(dispatch, formData);
    if (isPosted) {
      dispatch(isPostedReset());
      Navigate("/products");
    }
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={submitHandler}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text"
           placeholder="Apple Airpods"
           name="name"
           onChange={handleTextChange}
            />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text"
           placeholder="Apple airpods are the best"
           name="description"
           onChange={handleTextChange}
           />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select name="category"
           id="category"
           onChange={handleTextChange}
           >
            <option value="Cameras">Cameras</option>
            <option value="Laptops">Laptops</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number"
           placeholder="123"
           name="price"
           onChange={handleTextChange}
           />
        </div>
        <div className="addProductItem">
          <label>inStock</label>
          <input type="number"
           placeholder="13"
           name="stock"
           onChange={handleTextChange}
           />
        </div>
        <div className="addProductItem">
          <label>Seller</label>
          <input type="text"
           placeholder="amazon"
           name="seller"
           onChange={handleTextChange}
           />
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
