import { useGetProducts } from "../../apiCalls/productApiCalls";
import { useGetReviews } from "../../apiCalls/reviewApiCalls";
import { useGetUsers } from "../../apiCalls/userApiCalls";
import Loader from "../../components/Loader";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";


export default function Home() {

  const {isLoading:isUsersLoading, data:users, isError:isUsersError, error:usersError} = useGetUsers()
  const {isLoading:isProductsLoading, data:products, isError:isProductsError, error:productsError} = useGetProducts()
  const {isLoading:isReviewsLoading, data:reviews, isError:isReviewsError, error:reviewsError} = useGetReviews()
  console.log(reviews)
  
  if (isUsersLoading) {
    return <Loader/>
  }
  
  if (isUsersError) {
    return <h2>{usersError.message}</h2>
  }

  if (isProductsLoading) {
    return <Loader/>
  }
  
  if (isProductsError) {
    return <h2>{productsError.message}</h2>
  }

  if (isReviewsLoading) {
    return <Loader/>
  }
  
  if (isReviewsError) {
    return <h2>{reviewsError.message}</h2>
  }

  return (
    <div className="home">
      <FeaturedInfo
      users={users}
      products={products}
      reviews={reviews}
      />
    </div>
  );
}
