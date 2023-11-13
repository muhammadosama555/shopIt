import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/reducers/userReducers";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// user to login.

export const login = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/login`, userData);
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return useMutation(login, {
    onSuccess: (data) => {
      dispatch(loginSuccess(data.data));
      navigate('/')
    },
  });
};

// User to logout

export const logout = async () => {
  return axios.get(`${API_BASE_URL}/auth/logout`);
}

export const useLogout = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
return useMutation(logout,{
  onSuccess: (data) => {
    dispatch(logoutSuccess())
    persistor.purge();
    navigate("/");
  },
})
}

// get all users

const getUsers = async ( token, search = "") => {
  return await axios.get(`${API_BASE_URL}/users?search=${search}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetUsers = (search) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return useQuery(["users",search], () => getUsers( token,search));
};

// get user details

const getUserDetails = async (userId, token) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetUserDetails = (userId) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return useQuery(["user", userId], () => getUserDetails(userId, token));
};

// create user

export const createUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation(createUser, {
    onSuccess: (data) => {
      navigate("/");
 
    },
  });
};

// Edit profile

export const updateProfile = async (userData) => {
  
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(`${API_BASE_URL}/users/${userData.userId}`, userData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: (data) => {
   
      queryClient.invalidateQueries("user");

    },
  });
};

// update user image

export const updateUserImage = async (userData) => {
  console.log(userData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(
    `${API_BASE_URL}/users/update-user-image/${userData.userId}`,
    userData,
    {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const useUpdateUserImage = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserImage, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries("user");
   
    },
  });
};


// user to change password

export const changePassword = async (userData) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/auth/change-password`, userData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useChangePassword = () => {
  return useMutation(changePassword, {
    onSuccess: (data) => {
    
    },
  });
};

// Generate Password

export const generatePassword = async (userData) => {
  return axios.put(`${API_BASE_URL}/auth/resetPassword`, userData);
};

export const useGeneratePassword = () => {
  const navigate = useNavigate();
  return useMutation(generatePassword, {
    onSuccess: (data) => {
      console.log(data)
      navigate("/");
  
    },
  });
};

// Generate Otp

export const generateOtp = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/generateOtp`, userData);
};

export const useGenerateOtp = () => {
  return useMutation(generateOtp, {
    onSuccess: (data) => {
      console.log(data)

    },
  });
};
