import React from "react";
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
