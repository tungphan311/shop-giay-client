import React, { Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";

import "./AddPromotion.scss";
import { Button } from "react-bootstrap";
import AAddPromoteForm from "Components/Admin/Form/AddPromotion/AddPromotion";

class AAddPromotion extends Component {
  render() {
    return <AAddPromoteForm></AAddPromoteForm>;
  }
}

export default AAddPromotion;
