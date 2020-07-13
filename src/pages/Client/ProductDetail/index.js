import React from "react";
import CNewProductDetail from "Components/client/CNewProductDetail/index";
import CNewRelatedProductSection from "Components/client/CNewRelatedProductSection/index";
function ProductDetail({
  match: {
    params: { id },
  },
}) {
  return (
    <>
      <CNewProductDetail id={id} />
      <CNewRelatedProductSection id={id} />
    </>
  );
}

export default ProductDetail;
