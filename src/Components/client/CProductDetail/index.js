import React, { useState } from "react";
import "./ProductDetail.scss";
import CImageSelector from "components/client/CImageSelector";
import { vietNamCurrency, stringTruncate } from "utils";
import CButton from "components/client/CButton";

const imgs = [
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-huarache-run-dna-ch-1-ar3864-101-1",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
  "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/nike-air-barrage-mid-ct8453-300-4",
];

const MAX_STAR_WIDTH = 105;
const EXAMPLE_SIZE = ["10", "11", "12", "13", "14", "15", "16"];
const EXAMPLE_DESC =
  "Originally released in 2009, the Nike LeBron VII was instantly known for its large full-length Air unit, which contained 80% more that previous units. They also have woven panels on the upper, leather wraparound mudguard, mid-cut design, and a rubber outsole.";
const MAX_CHAR = 100;
const CProductDetail = () => {
  const [desExpanded, setDesExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);
  return (
    <div className="detail-display-bg">
      <div className="detail-display-wrapper clearfix responsive-mid">
        <CImageSelector
          imgs={imgs}
          className="detail-gallery-wrapper"
          imageContainerClassName="image-container"
        ></CImageSelector>
        <div className="detail-display-info-wrapper">
          <div className="detail-display-info-section default">
            <div className="detail-review-rating">
              <div className="detail-rating-star">
                <span style={{ width: "105px" }}></span>
                <div className="detail-rating-review-count">(no reviews)</div>
              </div>
            </div>
            <h2 className="detail-title">
              Nike Air Barrage Mid (Super Bowl LIV)
            </h2>
            <p className="detail-price">
              <span className="price">{vietNamCurrency(99999)}</span>
              <span className="strokeText">{vietNamCurrency(199999)}</span>
            </p>
            <ul className="detail-additional-info">
              <li>Sì tai: style</li>
              <li>Code: !!@#@!</li>
              <p class="detail-description excerpt">
                {!desExpanded
                  ? stringTruncate(EXAMPLE_DESC, MAX_CHAR, "...")
                  : EXAMPLE_DESC}

                {EXAMPLE_DESC.length > MAX_CHAR - 3 ? (
                  <span
                    onClick={() => setDesExpanded((prev) => !prev)}
                    class="detail-description-readmore read"
                  >
                    {desExpanded ? "Thu nhỏ" : "Đọc thêm"}
                  </span>
                ) : (
                  ""
                )}
              </p>
            </ul>
          </div>
          <div>
            <div className="detail-display-info-section default sizes">
              <div className="size-selection">
                <p className="detail-section-title">&nbsp;</p>
                <p className="detail-section-show-size">
                  <a href="/#">Size Chart</a>
                </p>
                <ul className="detail-all-size clearfix">
                  {EXAMPLE_SIZE
                    ? EXAMPLE_SIZE.map((size, index) => (
                        <li>
                          <div
                            onClick={() => setSelectedSize(index)}
                            className={`label actived ${
                              index === selectedSize ? "selected" : ""
                            }`}
                          >
                            <span>{size}</span>
                          </div>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="detail-display-info-section detail-display-bag default">
            <CButton className="button" label="THÊM VÀO GIỎ" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CProductDetail;
