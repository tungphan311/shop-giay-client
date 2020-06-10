import React, { useState } from "react";
import AddShoesForm from "Components/Admin/Form/AddShoes/AddShoesForm";
import AAddStock from "Components/Admin/Form/Stock/AddStock";
import { useDispatch } from "react-redux";
import { ADD_SHOES } from "state/reducers/AShoesReducer";

function MultipleForm() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);

  switch (page) {
    case 1:
      return <AddShoesForm onSubmit={nextPage} />;

    case 2:
      return (
        <AAddStock
          onSubmit={() => dispatch({ type: ADD_SHOES })}
          previousPage={previousPage}
        />
      );

    default:
      return null;
  }
}

export default MultipleForm;
