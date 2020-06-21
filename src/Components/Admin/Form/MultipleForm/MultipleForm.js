import React, { useState } from "react";
import AddShoesForm from "Components/Admin/Form/AddShoes/AddShoesForm";
import AAddStock from "Components/Admin/Form/Stock/AddStock";
import { useDispatch } from "react-redux";
import { ADD_SHOES, EDIT_SHOES } from "state/reducers/AShoesReducer";

function MultipleForm({ id, type = "add" }) {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const handleSubmit = () =>
    type === "add"
      ? dispatch({ type: ADD_SHOES })
      : dispatch({ type: EDIT_SHOES, id });

  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);

  switch (page) {
    case 1:
      return <AddShoesForm type={type} onSubmit={nextPage} />;

    case 2:
      return (
        <AAddStock
          type={type}
          onSubmit={handleSubmit}
          previousPage={previousPage}
        />
      );

    default:
      return null;
  }
}

export default MultipleForm;
