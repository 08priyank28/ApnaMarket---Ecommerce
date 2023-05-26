import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer'
import Home from './component/Home/Home'
import WebFont from "webfontloader"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './component/Product/ProductDetails'
import Products from "./component/Product/Products.js"
import Search from './component/Search/Search'
import LoginSignUp from './component/User/LoginSignUp'
import store from "./store"
import { loadUser } from './actions/userAction'
import UserOptions from "./component/layout/Header/UserOptions"
import { useSelector } from "react-redux"
import Profile from "./component/User/Profile"
import ProtectedRoute from "./component/Route/ProtectedRoute"
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import axios from "axios"
import Payment from "./component/Cart/Payment"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Order/MyOrders"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
// import OrderList from "./component/Admin/OrderList"
// import ProcessOrder from "./component/Admin/ProcessOrder"
// import UsersList from "./component/Admin/UsersList"
// import UpdateUser from "./component/Admin/UpdateUser"
// import ProductReviews from "./component/Admin/ProductReviews"
// import Contact from "./component/layout/Contact/Contact"
// import About from "./component/layout/About/About"
// import NotFound from "./component/layout/Not Found/NotFound"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [])

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>

              <Route exact path='/process/payment' element={<ProtectedRoute component={Payment} />} />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/products/:keyword' element={<Products />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />


          <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
          <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />


          <Route exact path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />

          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/shipping' element={<ProtectedRoute component={Shipping} />} />
          <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder} />} />
          <Route exact path='/success' element={<ProtectedRoute component={OrderSuccess} />} />
          <Route exact path='/orders' element={<ProtectedRoute component={MyOrders} />} />
          <Route exact path='/order/:id' element={<ProtectedRoute component={OrderDetails} />} />


          <Route
            isAdmin={true}
            exact path='/admin/dashboard'
            element={<ProtectedRoute component={Dashboard} />}
          />

          <Route
            isAdmin={true}
            exact path="/admin/products"
            element={<ProtectedRoute component={ProductList} />}
          />

          <Route
            isAdmin={true}
            exact path="/admin/product"
            element={<ProtectedRoute component={NewProduct} />}
          />

          <Route
            isAdmin={true}
            exact path="/admin/product/:id"
            element={<ProtectedRoute component={UpdateProduct} />}
          />



          <Route exact path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
