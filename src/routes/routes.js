import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
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
import { getItemFromStorage } from "utils/storage";
import AShoesList from "pages/Admin/ShoesList/ShoesList";
import ANewImport from "pages/Admin/NewImport/NewImport";
import StyleGuide from "pages/Admin/StyleGuide/StyleGuide";
import { TOKEN_KEY } from "constants/index";
import AEditShoes from "pages/Admin/EditShoes/EditShoes";
import ACustomerDetail from "pages/Admin/CustomerDetail/CustomerDetail";
import ACustomer from "pages/Admin/Customers/Customer";
import APromotion from "pages/Admin/Promotion/Promotion";
import AAddPromotion from "pages/Admin/AddPromotion/AddPromotion";
import AOrders from "pages/Admin/Orders/Orders";
import AOrderDetail from "pages/Admin/OrderDetail/OrderDetail";
import AErrorPage from "pages/Admin/404Error/Error";

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

  const isCustomer = getItemFromStorage(TOKEN_KEY);

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
          <Route exact path="/cart" component={ClientCart} />
          <CAuthorizedRoute
            exact
            path="/checkout/shipping"
            component={ClientShipping}
            isCustomer={isCustomer}
          />
          <CAuthorizedRoute
            exact
            path="/checkout/payment"
            component={ClientPayment}
            isCustomer={isCustomer}
          />
          <CAuthorizedRoute
            exact
            path="/order"
            component={ClientOrder}
            isCustomer={isCustomer}
          />
          <CAuthorizedRoute
            exact
            path="/order/:id"
            component={ClientOrderDetail}
            isCustomer={isCustomer}
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
          "/admin/shoes-add",
          "/admin/shoes",
          "/admin/shoes-import",
          "/admin/shoes/:id",
          "/admin/customer/:id",
          "/admin/customers",
          "/admin/promotion",
          "/admin/promotion/add",
          "/admin/orders",
          "/admin/orders/:id",
          "/admin/*",
        ]}
      >
        <AdminLayout>
          <Switch>
            <AuthorizedRoute
              exact
              path="/admin"
              component={AdminHome}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/shoes-add"
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
              path="/admin/shoes-import"
              component={ANewImport}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/shoes/:id"
              component={AEditShoes}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/customer/:id"
              component={ACustomerDetail}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/customers"
              component={ACustomer}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/promotion"
              component={APromotion}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/promotion/add"
              component={AAddPromotion}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/orders"
              component={AOrders}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/orders/:id"
              component={AOrderDetail}
              isUser={isUser}
            />
            <AuthorizedRoute
              exact
              path="/admin/*"
              component={() => <AErrorPage code={401} />}
              isUser={isUser}
            />
          </Switch>
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
