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
    // cloudName: 'tungg',
    loading: false,
    unsignedUploadPreset: "testUpload",
  };

  addPhoto = () => {
    if (this.state.image) return;
    var imageInput = this.refs.imageInput;
    imageInput.click();
  };

  inputChange = (event) => {
    const reader = new FileReader();
    const files = event.target.files[0];
    reader.onloadend = () => {
      console.log(1, reader.result);

      this.setState({ image: reader.result, loading: false });
      console.log(2, this.state.image);
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
                <image alt="add button" className="fa fa-plus-circle" />
                <div className="add-btn-label">Add photo</div>
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
              />
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
