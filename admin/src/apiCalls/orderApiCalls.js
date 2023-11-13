import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useQueryClient } from 'react-query'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";
import { useNavigate } from "react-router-dom";


// post order

export const postOrder = async (orderData) => {
    console.log(orderData)
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return axios.post(`${API_BASE_URL}/orders`, orderData,{
      headers:{
        'authorization':"Bearer "+ token
      }
    });
  }
  
  export const usePostOrder = () => {
    const navigate = useNavigate()
  return useMutation(postOrder,{
    onSuccess: (data) => {
        navigate('/cart')
    },
  })
  }