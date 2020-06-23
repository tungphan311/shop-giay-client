import React, { Component, Fragment, useEffect } from "react";
import "./UploadPhoto.scss";
import { Button } from "react-bootstrap";

class AUploadPhoto extends Component {
  state = {
    image: "",
    loading: false,
    cloudName: "tungg",
    unsignedUploadPreset: "testUpload",
    hover: false,
  };

  addPhoto = () => {
    var imageInput = this.refs.imageInput;
    imageInput.click();
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  uploadImage = (event, onChange) => {
    const file = event.target.files[0];
    const { cloudName } = this.state;
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.upload.addEventListener("progress", (e) => {
      this.setState({ loading: true });
    });
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // file upload successfully
        var response = JSON.parse(xhr.responseText);

        var url = response.secure_url;

        var token = url.split("/");
        token.splice(-2, 0, "w_150,c_scale");

        const image = token.join("/");

        this.setState({ image, loading: false });
        onChange(image);
      }
    };

    formData.append("upload_preset", "pcanrb6v");
    formData.append("tags", "browser_upload");
    formData.append("file", file);
    xhr.send(formData);
  };
  removePhoto = () => {
    this.setState({ image: "" });
  };

  render() {
    const { input } = this.props;
    const { onChange } = input;
    const { image, loading } = this.state;

    return (
      <div id="image-uploader">
        <input
          type="file"
          id="image-input"
          style={{ display: "none" }}
          ref="imageInput"
          accept="image/*"
          onChange={(event) => this.uploadImage(event, onChange)}
        />
        <input {...input} type="text" style={{ display: "none" }} />
        <div className="photo-upload-wrapper" onClick={this.addPhoto}>
          {!input.value ? (
            !loading ? (
              <Fragment>
                <div alt="add button" className="fa fa-plus-circle " />
                <div className="add-btn-label">Thêm ảnh</div>
              </Fragment>
            ) : (
              <div className="loadersmall" />
            )
          ) : (
            <Fragment>
              <img
                src={input.value}
                alt="upload"
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
