import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

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

 