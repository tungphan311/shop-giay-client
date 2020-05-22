import React, { useState, useEffect } from "react";
import ACreatable from "Components/Admin/Creatable/Creatable";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROVIDERS, ADD_PROVIDERS } from "state/reducers/AShoesReducer";

function AProviderSelect({ selected = null, setSelected }) {
  // state
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(selected);
  const [currentLength, setCurrentLength] = useState(0);
  const [isAdd, setIsAdd] = useState(false);

  // create dispatch
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.aShoes.providers);

  useEffect(() => {
    dispatch({ type: GET_PROVIDERS });

    setLoading(true);
  }, []);

  if (providers.length > currentLength && loading) {
    setLoading(false);

    const newOptions = providers.map((p) => ({ value: p.Id, label: p.Name }));

    setOptions(newOptions);

    setCurrentLength(providers.length);

    if (isAdd) {
      setSelected(newOptions[newOptions.length - 1]);

      setIsAdd(false);
    }
  }

  const handleChange = (value) => {
    setSelected(value);
  };

  const handleCreate = (value) => {
    setLoading(true);

    dispatch({ type: ADD_PROVIDERS, name: value });

    setIsAdd(true);
  };

  const props = {
    loading,
    handleChange,
    handleCreate,
    options,
    value: selected,
    placeholder: "Chọn nhà cung cấp ...",
  };

  return <ACreatable {...props} />;
}

export default AProviderSelect;
