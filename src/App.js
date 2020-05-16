import React from "react";
import Toastify from "Components/client/CToaster/Toasify";

function App({ children }) {
  return (
    <div className="App">
      <Toastify />
      {children}
    </div>
  );
}

export default App;
