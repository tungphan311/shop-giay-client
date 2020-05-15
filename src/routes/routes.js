import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ClientHome from "../pages/Client/Home/ClientHome";
import AdminHome from "../pages/Admin/Home/AdminHome";
import ClientProductList from "../pages/Client/ProductList/ClientProductList";
import ClientProductDetail from "pages/Client/ProductDetail";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import EmptyLayout from "../Layout/EmptyLayout/EmptyLayout";
import ClientLayout from "../Layout/ClientLayout/ClientLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import AAddShoes from "pages/Admin/AddShoes/AddShoes";
import Cart from "../pages/Client/Cart";

// component for admin site to determine user is logined or not
export const AuthorizedRoute = ({ component: Component, isUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isUser ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/admin/login",
          }}
        />
      )
    }
  />
);

export const CAuthorizedRoute = ({
  component: Component,
  isCustomer,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isCustomer ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

function Routes() {
  // temp variable
  // TODO: define a method to determine user identity
  const isUser = true;

  const isCustomer = true;

  return (
    <Switch>
      <Route exact path={["/", "/products", "/products/:id", "/cart"]}>
        <ClientLayout>
          <Route exact path="/" component={ClientHome} />
          <Route exact path="/products" component={ClientProductList} />
          <Route exact path="/products/:id" component={ClientProductDetail} />
          <CAuthorizedRoute
            exact
            path="/cart"
            component={Cart}
            isCustomer={isCustomer}
          />
        </ClientLayout>
      </Route>
      <Route exact path={["/admin", "/admin/shoes/add"]}>
        <AdminLayout>
          <AuthorizedRoute
            exact
            path="/admin"
            component={AdminHome}
            isUser={isUser}
          />
          <AuthorizedRoute
            exact
            path="/admin/shoes/add"
            component={AAddShoes}
            isUser={isUser}
          />
        </AdminLayout>
      </Route>
      <Route exact path={["/admin/login"]}>
        <EmptyLayout>
          <Route exact path="/admin/login" component={AdminLogin} />
        </EmptyLayout>
      </Route>
    </Switch>
  );
}

export default Routes;
