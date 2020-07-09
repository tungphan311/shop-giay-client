import React, { useState, useEffect } from "react";
import "./MenuBar.scss";
import { cGetBrandList } from "services/cProductService";
const initState = [
  {
    brands: [],
  },
];
const CMenuBar = ({ current_label }) => {
  const [brands, setbrands] = useState(initState);
  useEffect(() => {
    const list = cGetBrandList().then((res) => JSON.parse(res.data.data));
    Promise.all([list])
      .then(([listBrands]) => {
        setbrands((prev) => {
          const mapData = (branditem) => ({
            name: branditem,
          });
          setbrands(listBrands.map(mapData));
        });
      })
      .catch((error) => console.log(error));
  }, []);
  const renderBrandList = brands.map((branditem) => {
    let className_String = "";
    let href_string = "/category/" + branditem.name;
    if (current_label === branditem.name) {
      className_String =
        "list-group-item list-group-item-action bg-dark selected";
    } else {
      className_String = "list-group-item list-group-item-action bg-dark";
    }
    return (
      <a className={className_String} key={branditem.name} href={href_string}>
        {branditem.name}
      </a>
    );
  });

  let isViewingAll = false;
  if (current_label === "Danh sách sản phẩm") {
    isViewingAll = true;
  }

  // const renderBrandList = brands.map((brand_item) => {

  // });

  return (
    <div className="bg-dark" id="sidebar-wrapper">
      <div className="sidebar-heading">BRAND</div>
      <div className="list-group list-group-flush">
        <a
          key="all"
          href="/category/"
          className={
            isViewingAll
              ? "list-group-item list-group-item-action bg-dark selected"
              : "list-group-item list-group-item-action bg-dark"
          }
        >
          All brands
        </a>
        {renderBrandList}
      </div>
    </div>
  );
};

export default CMenuBar;
