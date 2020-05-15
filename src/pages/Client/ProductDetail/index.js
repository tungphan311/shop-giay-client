import React from "react";
import CProductDetail from "Components/client/CProductDetail";
import CProductRating from "Components/client/CProductRating";

function ProductDetail({
  match: {
    params: { id },
  },
}) {
  return (
    <>
      <CProductDetail id={id} />
      <CProductRating id={id} />
    </>
  );
}

export default ProductDetail;
