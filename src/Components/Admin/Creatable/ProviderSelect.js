import React, { useState, useEffect } from "react";
import ACreatable from "Components/Admin/Creatable/Creatable";
import { useDispatch, useSelector } from "react-redux";

function AProviderSelect({
  selected = null,
  setSelected,
  getReducer,
  addReducer,
  stateName,
  placeholder,
}) {
  // state
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(selected);
  const [currentLength, setCurrentLength] = useState(0);
  const [isAdd, setIsAdd] = useState(false);

  // create dispatch
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.aShoes[stateName]);

  useEffect(() => {
    dispatch({ type: getReducer });

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

    dispatch({ type: addReducer, name: value });

    setIsAdd(true);
  };

  const props = {
    loading,
    handleChange,
    handleCreate,
    options,
    value: selected,
    placeholder,
  };

  return <ACreatable {...props} />;
}

export default AProviderSelect;
