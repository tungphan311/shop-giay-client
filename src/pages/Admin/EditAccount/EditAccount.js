import React, { Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import {
  GET_ACCOUNT_BY_ID,
  EDIT_ACCOUNT,
} from "state/reducers/AAccountReducer";
import AAddAccountForm from "Components/Admin/Form/AddAccount/AddAccount";

const mapDispatchToProps = (dispatch) => ({
  getAccountById: (id) => dispatch({ type: GET_ACCOUNT_BY_ID, id }),
  handleSubmit: (id) => dispatch({ type: EDIT_ACCOUNT, id }),
});

class AEditAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };
  }
  componentDidMount = () => {
    const {
      getAccountById,
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ id: id });
    getAccountById(id);
  };

  render() {
    const { id } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div>
        <ABreadcrumb title="Cập nhật thông tin giày" list={BREADCRUMB} />
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <AAddAccountForm
                id={id}
                onSubmit={() => handleSubmit(id)}
                type="edit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const BREADCRUMB = [{ link: "/admin/account", name: "Quản Tài Khoản" }];

export default connect(null, mapDispatchToProps)(AEditAccount);
