import React, { Component, Fragment } from "react";
import "./UploadPhoto.scss";
import { Button } from "react-bootstrap";

// const UploadPhoto = ({
//   placeholder = "",
//   className = "",
//   label = "",
//   type = "text",
//   meta = {}, // redux form
//   input, // redux form
//   inputFile = React.createRef(),
//   data = "",
//   reader = new FileReader(),
//   onChangeHandler = (event) => {
// reader = new FileReader();
// inputFile = event.target.files[0];
// reader.onloadend = () => {
//   console.log(1, reader.result);
//   data = reader.result;
// };

// reader.readAsDataURL(inputFile);

//     console.log(3, inputFile);
//   },
// }) => {
//   );
// };

// export default UploadPhoto;

class AUploadPhoto extends Component {
  state = {
    image: "",
    loading: false,
    unsignedUploadPreset: "testUpload",
    hover: false,
  };

  addPhoto = () => {
    console.log("click");
    // if (this.state.image) return;
    var imageInput = this.refs.imageInput;
    imageInput.click();
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
    console.log(this.state.hover);
  };

  inputChange = (event) => {
    const reader = new FileReader();
    // const files = event.target.files;
    // if (!files) return;
    const files = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ image: reader.result, loading: false });
      console.log(this.state);
    };

    reader.readAsDataURL(files);

    if (!files) return;
  };
  removePhoto = () => {
    this.setState({ image: "" });
  };

  render() {
    const { image, loading } = this.state;
    return (
      <div id="image-uploader">
        <input
          type="file"
          id="image-input"
          style={{ display: "none" }}
          ref="imageInput"
          onChange={this.inputChange}
        />
        <div className="photo-upload-wrapper" onClick={this.addPhoto}>
          {!image ? (
            !loading ? (
              <Fragment>
                <image alt="add button" className="fa fa-plus-circle " />
                <div className="add-btn-label">Thêm ảnh</div>
              </Fragment>
            ) : (
              <div className="loadersmall" />
            )
          ) : (
            <Fragment>
              {/* <div className="image-uploaded" id="gallery" /> */}
              <img
                src={image}
                alt="image upload"
                id="image-loaded"
                className="add-photo-image-upload"
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.addPhoto}
              />
              <span className="hiden">
                <image alt="add button" className="fas fa-edit" />
                <div className="add-btn-label">Sửa ảnh </div>
              </span>
              <Button
                className="close add-photo-close-button btn btn-icon btn-link"
                onClick={this.removePhoto}
              >
                &times;
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default AUploadPhoto;
