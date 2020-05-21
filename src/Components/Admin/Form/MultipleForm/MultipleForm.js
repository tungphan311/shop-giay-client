import React, { useState } from "react";
import AddShoesForm from "Components/Admin/Form/AddShoes/AddShoesForm";
import AAddStock from "Components/Admin/Form/Stock/AddStock";

function MultipleForm() {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);

  switch (page) {
    case 1:
      return <AddShoesForm onSubmit={nextPage} />;

    case 2:
      return <AAddStock onSubmit={nextPage} previousPage={previousPage} />;

    default:
      return null;
  }
}

export default MultipleForm;
