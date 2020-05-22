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
import ClientCart from "../pages/Client/Cart";
import ClientLogin from "../pages/Client/Login";
import ClientShipping from "../pages/Client/Shipping";
import ClientPayment from "pages/Client/Payment/index";
import ClientOrder from "pages/Client/Order/index";
import ClientOrderDetail from "pages/Client/OrderDetail/index";
import { useSelector } from "react-redux";
import { getItemFromStorage } from "utils/storage";
import AShoesList from "pages/Admin/ShoesList/ShoesList";
import ANewImport from "pages/Admin/NewImport/NewImport";
import StyleGuide from "pages/Admin/StyleGuide/StyleGuide";

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
  const isUser = getItemFromStorage("identity");

  const isCustomer = useSelector((state) => state.cauth.username);

  return (
    <Switch>
      <Route
        exact
        path={[
          "/",
          "/products",
          "/products/:id",
          "/cart",
          "/checkout/shipping",
          "/checkout/payment",
          "/order",
          "/order/:id",
        ]}
      >
        <ClientLayout>
          <Route exact path="/" component={ClientHome} />
          <Route exact path="/products" component={ClientProductList} />
          <Route exact path="/products/:id" component={ClientProductDetail} />
          <CAuthorizedRoute
            exact
            path="/cart"
            component={ClientCart}
            isCustomer={isCustomer}
          />
          <CAuthorizedRoute
            exact
            path="/checkout/shipping"
            component={ClientShipping}
            isCustomer={true}
          />
          <CAuthorizedRoute
            exact
            path="/checkout/payment"
            component={ClientPayment}
            isCustomer={true}
          />
          <CAuthorizedRoute
            exact
            path="/order"
            component={ClientOrder}
            isCustomer={true}
          />
          <CAuthorizedRoute
            exact
            path="/order/:id"
            component={ClientOrderDetail}
            isCustomer={true}
          />
        </ClientLayout>
      </Route>
      <Route exact path={["/login"]}>
        <EmptyLayout>
          <Route exact path="/login" component={ClientLogin} />
        </EmptyLayout>
      </Route>
      <Route
        exact
        path={[
          "/admin",
          "/admin/shoes/add",
          "/admin/shoes",
          "/admin/shoes/import",
        ]}
      >
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
          <AuthorizedRoute
            exact
            path="/admin/shoes"
            component={AShoesList}
            isUser={isUser}
          />
          <AuthorizedRoute
            exact
            path="/admin/shoes/import"
            component={ANewImport}
            isUser={isUser}
          />
        </AdminLayout>
      </Route>
      <Route exact path={["/admin/login", "/admin/style-guide"]}>
        <EmptyLayout>
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/style-guide" component={StyleGuide} />
        </EmptyLayout>
      </Route>
    </Switch>
  );
}

export default Routes;
