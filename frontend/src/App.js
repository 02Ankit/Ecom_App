import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

// Auth or User imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'
import Cart from "./components/cart/Cart";
import { useEffect } from 'react';
import { useSelector } from "react-redux";

function App() {

useEffect(() => {

  store.dispatch(loadUser())

}, [])




  return (
    <Router>
      <div className="App">
          <Header />
        <div className="container container-fluid">
          <Routes>
            <Route  path="/" element={< Home />} />
            <Route  path="/search/:keyword" element={< Home />} />

            <Route  path="/product/:id" element={< ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route  path ="/login" element={< Login />} />
            <Route  path ="/register" element={< Register />} />
            <Route path="/my_profile" element={<ProtectedRoute> < Profile /></ProtectedRoute>} />
            <Route path="/my_profile/update" element={<ProtectedRoute>< UpdateProfile /> </ProtectedRoute>} />
            <Route path="/password/update" element={<ProtectedRoute>< UpdatePassword /></ProtectedRoute>}  />
            <Route path="/password/forgot" element={<ForgotPassword />} exact />
            <Route path="/password/reset/:token" element={<NewPassword />} exact />
          </Routes>
          </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
