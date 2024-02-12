import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useQueryClient } from 'react-query'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";


// get all reviews

const getReviews = async () => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return await axios.get(`${API_BASE_URL}/reviews`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetReviews = () => {
 
  return useQuery("reviews", getReviews);
};