import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo({users,products,reviews}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users.data.users.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Products</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{products.data.products.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Reviews</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{reviews.data.data.length}</span> 
        </div>
      </div>
    </div>
  );
}
