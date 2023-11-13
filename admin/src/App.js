import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { QueryClientProvider,QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useSelector } from "react-redux";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";

const queryClient = new QueryClient()

function App() {

  const { currentUser } = useSelector((state) => state.userSlice);

  console.log(currentUser?.data)

  return (
    <>
      <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    {currentUser?.data.role === 'admin'  ? ( 
    <>
    <Topbar />
          <div className="container">
          <Sidebar />
          <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<UserList />}></Route>
          <Route path="/user/:userId" element={<User />}></Route>
          <Route path="/newUser" element={<NewUser />}></Route>
          <Route path="/products" element={<ProductList />}></Route>
          <Route path="/product/:productId" element={<Product />}></Route>
          <Route path="/newproduct" element={<NewProduct />}></Route>
        </Routes>
        </div>
    </>
    ) : (
      <Login />
    )
    }
  
  </BrowserRouter>
  <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>

  </>
  );
}

export default App;
