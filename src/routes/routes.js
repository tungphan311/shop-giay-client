import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ClientHome from "../pages/Client/Home/ClientHome";
import AdminHome from "../pages/Admin/Home/AdminHome";
import ClientProductList from "../pages/Client/ProductList/ClientProductList";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import EmptyLayout from "../Layout/EmptyLayout/EmptyLayout";
import ClientLayout from "../Layout/ClientLayout/ClientLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";

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
  // temp variable
  // TODO: define a method to determine user identity
  const isUser = true;

  return (
    <Switch>
      <Route exact path={["/", "/products"]}>
        <ClientLayout>
          <Route exact path="/" component={ClientHome} />
          <Route exact path="/products" component={ClientProductList} />
        </ClientLayout>
      </Route>
      <Route exact path={["/admin"]}>
        <AdminLayout>
          <AuthorizedRoute
            exact
            path="/admin"
            component={AdminHome}
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