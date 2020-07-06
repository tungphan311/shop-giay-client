import React, { Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import "./Promotion.scss";
import { Button } from "react-bootstrap";
import history from "state/history";
class APromotion extends Component {
  render() {
    return (
      <div className="APromotion">
        <ABreadcrumb title="Danh sách khuyễn mãi" list={BREADCRUMB} />
        <div className="ui-empty-state_container max-width-center">
          <div className="row align-items-center">
            <div className="col-xs-12 col-md-6">
              <h3 className="ui-empty-state_title">Chương trình khuyến mãi</h3>
              <h4 className="ui-empty-state_subtitle">
                Tạo ra các mã coupon, cài đặt một sản phẩm, hoặc một nhóm sản
                phẩm khuyến mãi dành cho các khách hàng thân thiết của bạn.
              </h4>
              <div className="ui-empty-state_btngroup">
                <Button
                  onClick={() => history.push("/admin/promotion/add")}
                  className="fa fa-plus-circle btn-primary"
                  type="button"
                >
                  Tạo khuyến mãi
                </Button>
              </div>
            </div>
            <div className="col-xs-12 col-md-6 pt-2">
              <img src="//hstatic.net/0/0/global/design/omni/discounts-init-v3.svg"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const BREADCRUMB = [{ link: "/admin/promotion", name: "Danh sách khuyến mãi" }];

export default APromotion;
