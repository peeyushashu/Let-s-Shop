import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import ProductList from './containers/ProductList'
import OrderSummary from "./containers/OrderSummary";
import CheckoutForm from "./containers/Ckeckout";



const BaseRouter = () => (
  <Hoc>
    <Route exact path="/productlist" component={ProductList} />
    <Route exact path="/order-summary" component={OrderSummary} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/checkout" component={CheckoutForm} />
  </Hoc>
);

export default BaseRouter;
