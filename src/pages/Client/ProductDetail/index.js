import React from "react";
import CProductDetail from "Components/client/CProductDetail";
import CProductRating from "Components/client/CProductRating";
import CRelatedProductSection from "Components/client/CRelatedProductSection";
function ProductDetail({
  match: {
    params: { id },
  },
}) {
  return (
    <>
      <CProductDetail id={id} />
      <CRelatedProductSection id={id} />
      <CProductRating id={id} />
    </>
  );
}

export default ProductDetail;
