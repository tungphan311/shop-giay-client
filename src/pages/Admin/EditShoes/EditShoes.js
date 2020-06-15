import React, { Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import MultipleForm from "Components/Admin/Form/MultipleForm/MultipleForm";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { GET_SHOES_BY_ID } from "state/reducers/AShoesReducer";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getShoes: (id) => dispatch({ type: GET_SHOES_BY_ID, id }),
});

class AEditShoes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };
  }
  componentDidMount = () => {
    const {
      getShoes,
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ id: id });
    getShoes(id);
  };

  render() {
    const { id } = this.state;
    return (
      <div>
        <ABreadcrumb title="Thêm sản phẩm mới" list={BREADCRUMB} />
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <MultipleForm id={id} type="edit" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const BREADCRUMB = [{ link: "/admin/shoes", name: "Quản lý giày" }];

export default connect(mapStateToProps, mapDispatchToProps)(AEditShoes);
