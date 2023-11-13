import { Link, useParams } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useGetProductDetails, useUpdateProduct } from "../../apiCalls/productApiCalls";
import { useRef } from "react";
import Loader from "../../components/Loader";

export default function Product() {

    const nameInputElement = useRef();
    const priceInputElement = useRef();
    const descriptionInputElement = useRef();
    const stockInputElement = useRef();
    const categoryInputElement = useRef();
  
    const { productId } = useParams()
  
  
    const { isLoading: isProductLoading, data: productDetails } = useGetProductDetails(productId)
    console.log(productDetails?.data)
    const {
        mutate: updateProductMutate,
        isLoading: isUpdateProductLoading,
        isError: isUpdateProductError,
        error: updateProductError,
      } = useUpdateProduct();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
          name: nameInputElement.current?.value,
          price: priceInputElement.current?.value,
          description: descriptionInputElement.current?.value,
          stock: stockInputElement.current?.value,
          category: categoryInputElement.current?.value,
          productId: productId,
        };
  
        console.log(data)
        updateProductMutate(data);
     
      };

      const categories = [
                    "Electronics",
                    "Cameras",
                    "Laptops",
                    "Food",
                    "Headphones",
                    "Books",
                    "Clothes",
                    "Sports",
                    "Accessories"

      ]

  return (
     <>
     {isProductLoading ? <Loader/> :
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
    
      </div>
      <div className="productBottom">
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input
                   type="text"
                   defaultValue={productDetails.data.product.name}
                   ref={nameInputElement}
                    />
                  <label>Price</label>
                  <input
                   type="text"
                   defaultValue={productDetails.data.product.price}
                   ref={priceInputElement}
                    />
                  <label>Description</label>
                  <input
                   type="text"
                   defaultValue={productDetails.data.product.description}
                   ref={descriptionInputElement}
                    />
                  <label>Stock</label>
                  <input
                   type="number"
                   defaultValue={productDetails.data.product.stock}
                   ref={stockInputElement}
                    />
                 
                  <label>Category</label>
                  <select ref={categoryInputElement} name="category" id="category">
                      <option value={productDetails.data.product.category}>{productDetails.data.product.category}</option>
                      {categories.map((category)=>(
                      <>
                      {productDetails.data.product.category !== category &&
                       <option key={category} value={category}>{category}</option>
                      }
                      </>)
                      )}
                     
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div> }
    </>
  );
}
