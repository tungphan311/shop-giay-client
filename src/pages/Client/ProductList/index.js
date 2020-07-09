import React from "react";
import CProductDetail from "Components/client/CProductDetail";
import CProductRating from "Components/client/CProductRating";
import CProductByCategory from "../../../Components/client/CProductByCategory/index";
function ProductDetail({
  match: {
    params: { id, pageNumber },
  },
}) {
  return (
    <>
      <CProductByCategory id={id} pageNumber={pageNumber} />
    </>
  );
}

export default ProductDetail;
