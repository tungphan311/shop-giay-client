import CSearchHoverContainer from "Components/client/CNavBar/CSearchHoverContainer";
import CHoverContainer from "Components/client/CNavBar/CHoverContainer";

export const NAVBAR_ITEM_LIST = [
  {
    label: "NAM",
    href: "#",
  },
  {
    label: "NỮ",
    href: "#",
  },
  {
    label: "HÀNG MỚI VỀ",
    href: "#",
  },
];

export const NAVBAR_BUTTON_LIST = [
  {
    icon: "search",
    hoverComponent: CSearchHoverContainer,
  },
  {
    icon: "user",
    hoverComponent: CHoverContainer,
  },
  // {
  //   icon: "info",
  //   hoverComponent: CHoverContainer,
  // },
  {
    icon: "inventory",
    //hoverComponent: CHoverContainer,
    href: "/cart",
  },
];

export const USER_HOVER_CONTENT = [
  {
    label: "Thông tin cá nhân",
    href: "#",
  },
  {
    label: "Thông tin đơn hàng",
    href: "#",
  },
];
