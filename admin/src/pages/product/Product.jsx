import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { getProductDetails, updateproduct } from "../../reducers/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateProductReset } from "../../reducers/productReducers";
import { useState } from "react";

export default function Product() {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { productsDetails,isUpdated } = useSelector((state) => state.productSlice);

  const productData = productsDetails.product;
  const dispatch = useDispatch();
  console.log(productsDetails, id);

  useEffect(() => {
    getProductDetails(dispatch, id);
    console.log(productsDetails, id);
    if (isUpdated) {
      dispatch(updateProductReset());
    }
  }, [dispatch, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateproduct(dispatch, formData, id);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            {/* <img src={productData.images[0].url} /> */}
            <span className="productName">{productData.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{productData._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">
                {productData.description}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">category:</span>
              <span className="productInfoValue">{productData.category}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{productData.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">rating:</span>
              <span className="productInfoValue">{productData.rating}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{productData.stock}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">No of Reviews:</span>
              <span className="productInfoValue">
                {productData.numOfReviews}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Seller:</span>
              <span className="productInfoValue">{productData.seller}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={submitHandler}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text"
            placeholder={productData.name}
             name="name"
             onChange={handleInputChange}
             />
            <label>Description</label>
            <input type="text"
            placeholder={productData.description}
            name="description"
             onChange={handleInputChange}
             />
            <label>Category</label>
            <input type="text"
            placeholder={productData.category}
            name="category"
             onChange={handleInputChange}
             />
            <label>Seller</label>
            <input type="text"
            placeholder={productData.seller}
            name="seller"
             onChange={handleInputChange}
             />
            <label>Price</label>
            <input type="number"
            placeholder={productData.price}
            name="price"
             onChange={handleInputChange}
             />
            <label>Rating</label>
            <input type="number"
            placeholder={productData.rating}
            name="rating"
             onChange={handleInputChange}
             />
            <label>Stock</label>
            <input type="number"
            placeholder={productData.stock}
            name="stock"
             onChange={handleInputChange}
             />
            <label>No of Reviews</label>
            <input type="number"
            placeholder={productData.numOfReviews}
            name="numOfReviews"
             onChange={handleInputChange}
             />
            
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
