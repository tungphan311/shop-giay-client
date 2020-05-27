import React, { useState } from "react";
import AProviderSelect from "Components/Admin/Creatable/ProviderSelect";
import {
  GET_PROVIDERS,
  ADD_PROVIDERS,
  GET_COLORS,
  ADD_COLOR,
  GET_SIZES,
  ADD_SIZE,
} from "state/reducers/AShoesReducer";

function StyleGuide() {
  const [provider, setProvider] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  return (
    <div className="container mt-5">
      <div>
        <AProviderSelect
          selected={provider}
          setSelected={setProvider}
          getReducer={GET_PROVIDERS}
          addReducer={ADD_PROVIDERS}
          stateName="providers"
          placeholder="Chọn nhà cung cấp ..."
        />
      </div>
      <div className="mt-5">
        <AProviderSelect
          selected={color}
          setSelected={setColor}
          getReducer={GET_COLORS}
          addReducer={ADD_COLOR}
          stateName="colors"
          placeholder="Chọn màu ..."
        />
      </div>
      <div className="mt-5">
        <AProviderSelect
          selected={size}
          setSelected={setSize}
          getReducer={GET_SIZES}
          addReducer={ADD_SIZE}
          stateName="sizes"
          placeholder="Chọn size giày ..."
        />
      </div>
    </div>
  );
}

export default StyleGuide;
