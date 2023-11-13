import { useRef } from "react";
import { useCreateProduct } from "../../apiCalls/productApiCalls";
import "./newProduct.css";

export default function NewProduct() {

  const nameInputElement = useRef();
  const priceInputElement = useRef();
  const descriptionInputElement = useRef();
  const stockInputElement = useRef();
  const categoryInputElement = useRef();
  const imagesInputElement = useRef();

  const {
      mutate: createProductMutate,
      isLoading: isCreateProductLoading,
      isError: isCreateProductError,
      error: createProductError,
    } = useCreateProduct();
  
  const handleSubmit = async (event) => {
      event.preventDefault();
    
      const formData = new FormData();
      formData.append('name', nameInputElement.current?.value);
      formData.append('price', priceInputElement.current?.value);
      formData.append('description', descriptionInputElement.current?.value);
      formData.append('stock', stockInputElement.current?.value);
      formData.append('category', categoryInputElement.current?.value);
    
      // Append each selected file to FormData
      const files = imagesInputElement.current?.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }
      }
     createProductMutate(formData);
      
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
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form onSubmit={handleSubmit} className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
           type="file"
            id="file"
            ref={imagesInputElement} 
            onChange={(e) => console.log(e.target.files)} 
            accept="image/*"
            multiple 
             />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
           type="text"
            placeholder="Apple Airpods"
            ref={nameInputElement}
            />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
           type="text"
            placeholder="Write description of this product"
            ref={descriptionInputElement}
            />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input
           type="text"
            placeholder="123"
            ref={stockInputElement}
            />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
           type="text" 
           placeholder="150"
           ref={priceInputElement}
           />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select ref={categoryInputElement} name="category" id="category">
        {categories.map((category)=>
       <option key={category} value={category}>{category}</option>
        )}              
          </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
