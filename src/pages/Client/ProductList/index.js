import React from "react";
import CProductByCategory from "../../../Components/client/CProductByCategory/index";
import qs from "query-string";

function ProductDetail({
  match: {
    params: { id, pageNumber },
  },
  location: { search },
}) {
  const { gender, "new-shoes": isNew, q: key } = qs.parse(search);

  console.log(key);

  return (
    <>
      <CProductByCategory
        id={id}
        pageNumber={pageNumber}
        gender={gender}
        isNew={isNew}
        search={key}
      />
    </>
  );
}

export default ProductDetail;
