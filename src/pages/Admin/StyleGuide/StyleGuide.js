import React, { useState } from "react";
import AProviderSelect from "Components/Admin/Creatable/ProviderSelect";

function StyleGuide() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container mt-5">
      <AProviderSelect selected={selected} setSelected={setSelected} />
    </div>
  );
}

export default StyleGuide;
