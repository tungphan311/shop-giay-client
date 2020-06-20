import React, { useState, useEffect } from "react";
import ACreatable from "Components/Admin/Creatable/Creatable";
import { useDispatch, useSelector } from "react-redux";

function AProviderSelect({
  selected,
  setSelected,
  getReducer,
  addReducer,
  stateName,
  placeholder,
  label,
  meta = {},
}) {
  const { touched, error } = meta;
  const showError = touched && error;
  const { errCode } = error || {};

  // state
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentLength, setCurrentLength] = useState(0);
  const [isAdd, setIsAdd] = useState(false);

  // create dispatch
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.aShoes[stateName]);

  useEffect(() => {
    dispatch({ type: getReducer });

    setLoading(true);
  }, [dispatch, getReducer]);

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
    label,
  };

  return (
    <div>
      <label>{label}</label>
      <ACreatable {...props} />
      {showError && (
        <span style={{ position: "absolute", color: "#f25961" }}>
          {errCode}
        </span>
      )}
    </div>
  );
}

export default AProviderSelect;
