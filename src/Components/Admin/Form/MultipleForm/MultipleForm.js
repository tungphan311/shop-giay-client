import React, { useState } from "react";
import AddShoesForm from "Components/Admin/Form/AddShoes/AddShoesForm";
import AAddStock from "Components/Admin/Form/Stock/AddStock";
import { useDispatch } from "react-redux";
import { ADD_SHOES } from "state/reducers/AShoesReducer";

function MultipleForm({ id, type }) {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);

  switch (page) {
    case 1:
      return <AddShoesForm id={id} type={type} onSubmit={nextPage} />;

    case 2:
      return (
        <AAddStock
          id={id}
          type={type}
          onSubmit={(type) =>
            type === "add" ? dispatch({ type: ADD_SHOES }) : "0"
          }
          previousPage={previousPage}
        />
      );

    default:
      return null;
  }
}

export default MultipleForm;
