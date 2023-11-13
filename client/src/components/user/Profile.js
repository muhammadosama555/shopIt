import React from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { useGetUserDetails } from "../../apiCalls/userApiCalls";

const Profile = () => {
  const { currentUser } = useSelector(state => state.userSlice) || null
  const userId = currentUser.data._id


  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId)

  const fallbackImage = '/images/avatar.jpg';

  return (
    <>
      {isUserLoading ? (
        <Loader />
      ) : (
        <>
          <div className="profile wrapper flex justify-center items-center mt-20 mb-10">
            <div className="bg-white rounded-md shadow-xl mx-6 py-14 px-8 w-full max-w-[550px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1100px]">
              <div className="pl-10">
                <h2 className="text-4xl">My Profile</h2>
              </div>
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center mt-20 gap-14 md:gap-20 lg:gap-32 xl:gap-32">
                <div className="flex flex-col gap-8">
                  <figure className="w-[250px] md:w-[300px] lg:w-[300px] xl:w-[300px] h-[250px] md:h-[300px] lg:h-[300px] xl:h-[300px] bg-yellow-500">
                    <img
                      className="rounded-circle img-fluid"
                      src={userDetails.data.user?.imgUrl || fallbackImage}
                      alt={userDetails.data.user.username}
                    />
                  </figure>
                  <div className="flex justify-center">
                    <button className="text-black font-semibold bg-slate-200 w-full py-4 px-16 rounded-md hover:bg-slate-300 hover:transition-all">
                      <Link to="/profile/update">Edit Profile</Link>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-5 lg:w-2/5 xl:w-2/5">
                  <div>
                    <h4 className="text-2xl font-semibold">Full Name</h4>
                    <p className="text-lg">{userDetails.data.user.username}</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold">Email Address</h4>
                    <p className="text-lg">{userDetails.data.user.email}</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold">Joined On</h4>
                    <p className="text-lg">
                      {String(userDetails.data.user.createdAt).substring(0, 10)}
                    </p>
                  </div>
                
                  <div className="flex justify-center ">
                    <button className="text-black font-semibold bg-slate-200 w-full py-4 px-16 rounded-md hover:bg-slate-300 hover:transition-all">
                      <Link to="/password/update">Change Password</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
