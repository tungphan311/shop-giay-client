import React, { Component } from "react";
import ReactGA from "react-ga";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

export class GoogleAnalytics extends Component {
  componentDidMount = () => {
    const {
      location: { pathname, search },
    } = this.props;

    this.logPageChange(pathname, search);
  };

  componentDidUpdate = ({ location: prevLocation }) => {
    const {
      location: { pathname, search },
    } = this.props;

    const isDifferentPathname = pathname !== prevLocation.pathname;
    const isDifferentSearch = search !== prevLocation.search;

    if (isDifferentPathname || isDifferentSearch) {
      this.logPageChange(pathname, search);
    }
  };

  logPageChange = (pathname, search = "") => {
    const page = pathname + search;
    const { location } = window;

    ReactGA.set({
      page,
      location: `${location.origin}${page}`,
      ...this.props.options,
    });

    ReactGA.pageview(page);
  };

  render() {
    return null;
  }
}

GoogleAnalytics.propsTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  options: PropTypes.object,
};

const RouteTracker = () => <Route component={GoogleAnalytics} />;

const init = (options = {}) => {
  const isGAEnabled = process.env.NODE_ENV === "production";

  if (isGAEnabled) {
    ReactGA.initialize("UA-171400327-1");
  }

  return isGAEnabled;
};

export default { GoogleAnalytics, RouteTracker, init };
