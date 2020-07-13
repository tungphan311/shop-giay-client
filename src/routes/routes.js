import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import ClientHome from "../pages/Client/Home/ClientHome";
import AdminHome from "../pages/Admin/Home/AdminHome";
import ClientProductList from "pages/Client/ProductList";
import ClientProductDetail from "pages/Client/ProductDetail";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import EmptyLayout from "../Layout/EmptyLayout/EmptyLayout";
import ClientLayout from "../Layout/ClientLayout/ClientLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import AAddShoes from "pages/Admin/AddShoes/AddShoes";
import ClientCart from "../pages/Client/Cart";
import ClientLogin from "../pages/Client/Login";
import ClientSignup from "../pages/Client/Signup";
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
import { SET_AUTHORIZE } from "state/reducers/aLoadingReducer";
import { connect } from "react-redux";
import AProviderList from "pages/Admin/ProviderList/ProviderList";
import AAddProvider from "pages/Admin/AddProvider/AddProvider";
import AProviderEdit from "pages/Admin/ProviderEdit/ProviderEdit";
import AAccount from "pages/Admin/Account/Account";
import AAddAccount from "pages/Admin/AddAccount/AddAccount";
import AEditAccount from "pages/Admin/EditAccount/EditAccount";
import CUserProfile from "pages/Client/Profile/index";
import CUpdatePassword from "pages/Client/UpdatePassword/index";

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

const mapDispatchToProps = (dispatch) => ({
  resetAuthorize: () => dispatch({ type: SET_AUTHORIZE }),
});

class Routes extends Component {
  componentWillMount = () => {
    this.unlisten = this.props.history.listen(() => {
      this.props.resetAuthorize();
    });
  };

  componentWillUnmount = () => {
    this.unlisten();
  };

  render() {
    const isUser = getItemFromStorage("identity");

    const isCustomer = getItemFromStorage(TOKEN_KEY);

    return (
      <Switch>
        <Route
          exact
          path={[
            "/",
            "/category",
            "/category/page/:pageNumber",
            "/category/:id/",
            "/category/:id/page/:pageNumber",
            "/products/:id",
            "/cart",
            "/checkout/shipping",
            "/checkout/payment",
            "/order",
            "/order/:id",
            "/profile/update",
            "/profile/password",
          ]}
        >
          <ClientLayout>
            <Route exact path="/" component={ClientHome} />
            <Route exact path="/category" component={ClientProductList} />
            <Route exact path="/category/:id" component={ClientProductList} />
            <Route
              exact
              path="/category/:id/page/:pageNumber"
              component={ClientProductList}
            />
            <Route
              exact
              path="/category/page/:pageNumber"
              component={ClientProductList}
            />
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
            <CAuthorizedRoute
              exact
              path="/profile/update"
              component={CUserProfile}
              isCustomer={isCustomer}
            />
            <CAuthorizedRoute
              exact
              path="/profile/password"
              component={CUpdatePassword}
              isCustomer={isCustomer}
            />
          </ClientLayout>
        </Route>
        <Route exact path={["/login", "/signup"]}>
          <EmptyLayout>
            <Route exact path="/login" component={ClientLogin} />
            <Route exact path="/signup" component={ClientSignup} />
          </EmptyLayout>
        </Route>
        {/* <AdminRoute> */}
        <Route exact path={["/admin/login", "/admin/style-guide"]}>
          <EmptyLayout>
            <Route exact path="/admin/login" component={AdminLogin} />
            <Route exact path="/admin/style-guide" component={StyleGuide} />
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
            "/admin/provider",
            "/admin/add-provider",
            "/admin/provider/:id",
            "/admin/account",
            "/admin/account-add",
            "/admin/account/:id",
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
                path="/admin/provider"
                component={AProviderList}
                isUser={isUser}
              />
              <AuthorizedRoute
                exact
                path="/admin/provider/:id"
                component={AProviderEdit}
                isUser={isUser}
              />
              <AuthorizedRoute
                exact
                path="/admin/add-provider"
                component={AAddProvider}
                isUser={isUser}
              />
              <AuthorizedRoute
                exact
                path="/admin/account"
                component={AAccount}
                isUser={isUser}
              />
              <AuthorizedRoute
                exact
                path="/admin/account-add"
                component={AAddAccount}
                isUser={isUser}
              />
              <AuthorizedRoute
                exact
                path="/admin/account/:id"
                component={AEditAccount}
                isUser={isUser}
              />
              <AuthorizedRoute
                exact
                path="/admin/*"
                component={() => <AErrorPage code={404} />}
                isUser={isUser}
              />
            </Switch>
          </AdminLayout>
        </Route>
        {/* </AdminRoute> */}
      </Switch>
    );
  }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(Routes);
