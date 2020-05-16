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
import { getItemFromStorage } from "utils/storage";

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

function Routes() {
  const isUser = getItemFromStorage("identity");

  return (
    <Switch>
      <Route exact path={["/", "/products", "/products/:id"]}>
        <ClientLayout>
          <Route exact path="/" component={ClientHome} />
          <Route exact path="/products" component={ClientProductList} />
          <Route exact path="/products/:id" component={ClientProductDetail} />
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
