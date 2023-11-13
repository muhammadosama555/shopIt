import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";
import { useNavigate } from "react-router-dom";

// get products

const getProducts = async (currentPage=1,limit=4,search="",category="",sortBy="",maxRating=5) => {
  
   let url = `${API_BASE_URL}/products?page=${currentPage}&limit=${limit}&search=${search}&sortBy=${sortBy}&maxRating=${maxRating}`;
   if (category) {
       url = `${API_BASE_URL}/products?page=${currentPage}&limit=${limit}&search=${search}&category=${category}&sortBy=${sortBy}&maxRating=${maxRating}`;
   }
    console.log(url); // Log the URL before making the request
   return await axios.get(url)
 }
 
 export const useGetProducts = (currentPage,limit,search,category,sortBy,maxRating) => {
   return useQuery(['products',currentPage,limit,search,category,sortBy,maxRating], () => getProducts(currentPage,limit,search,category,sortBy,maxRating))
 }

// get product details

const getProductDetails = async (productId) => {
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return axios.get(`${API_BASE_URL}/products/${productId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetProductDetails = (productId) => {
    return useQuery(["product",productId], () => {
        return getProductDetails(productId);
    });
  };

 // delete product

export const deleteProduct = async (productId) => {
  console.log(productId)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/products/${productId}`,{
    headers:{
      'authorization':"Bearer "+ token
    }
  });
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
return useMutation(deleteProduct,{
  onSuccess: (data) => {
    queryClient.invalidateQueries('products'); 
  },
})
}

// update product

export const updateProduct = async (productData) => {
  
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(`${API_BASE_URL}/products/${productData.productId}`, productData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: (data) => {
   
      queryClient.invalidateQueries("product");

    },
  });
};

// create product

export const createProduct = async (productData) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;

  return axios.post(`${API_BASE_URL}/products`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: "Bearer " + token,
    },
  });
};

export const useCreateProduct = () => {
  const navigate = useNavigate();
  return useMutation(createProduct, {
    onSuccess: (data) => {
      navigate("/products");
 
    },
  });
};