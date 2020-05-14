import React from "react";
import "./ProductDetail.scss";
import CImageSelector from "components/client/CImageSelector";

const imgs = [
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-huarache-run-dna-ch-1-ar3864-101-1",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
];
const CProductDetail = () => (
  <div className="detail-display-bg">
    <div className="detail-display-wrapper clearfix responsive-mid">
      <CImageSelector
        imgs={imgs}
        className="detail-gallery-wrapper"
        imageContainerClassName="image-container"
      ></CImageSelector>
    </div>
  </div>
);

export default CProductDetail;
