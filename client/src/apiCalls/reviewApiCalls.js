import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useQueryClient } from 'react-query'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";


// post review

export const postReview = async (reviewData) => {
    console.log(reviewData)
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return axios.post(`${API_BASE_URL}/reviews`, reviewData,{
      headers:{
        'authorization':"Bearer "+ token
      }
    });
  }
  
  export const usePostReview = () => {
    const queryClient = useQueryClient()
  return useMutation(postReview,{
    onSuccess: (data) => {
        queryClient.invalidateQueries('product');
    },
  })
  }