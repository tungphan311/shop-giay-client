import React from "react";
import CProductDetail from "Components/client/CProductDetail";

function ProductDetail({
  match: {
    params: { id },
  },
}) {
  return <CProductDetail id={id} />;
}

export default ProductDetail;
