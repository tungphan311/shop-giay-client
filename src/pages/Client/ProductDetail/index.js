import React from "react";
import CProductDetail from "components/client/CProductDetail";

function ProductDetail({
  match: {
    params: { id },
  },
}) {
  return (
    <>
      <CProductDetail />
    </>
  );
}

export default ProductDetail;
