export const SIDEBAR_LIST = [
  {
    id: "dashboard",
    icon: "fas fa-home",
    title: "Trang chủ",
    href: "/admin",
  },
  {
    id: "orders",
    icon: "fas fa-file-invoice-dollar",
    title: "Đon hàng",
    href: "/admin/orders",
  },
  {
    id: "shoes",
    icon: "fas fa-capsules",
    title: "Quản lý kho",
    href: ["/admin/shoes", "/admin/shoes-import", "/admin/shoes-add"],
    sub: [
      { href: "/admin/shoes", title: "Danh sách sản phẩm" },
      { href: "/admin/shoes-import", title: "Nhập hàng mới" },
      { href: "/admin/shoes-add", title: "Thêm giày mới" },
    ],
  },
  {
    id: "providers",
    icon: "fas fa-user",
    title: "Nhà cung cấp",
    href: ["/admin/provider", "/admin/add-provider"],
    sub: [
      { href: "/admin/provider", title: "Danh sách nhà cung cấp" },
      { href: "/admin/add-provider", title: "Thêm nhà cung cấp mới" },
    ],
  },
  {
    id: "customers",
    icon: "fas fa-user",
    title: "Khách hàng",
    href: "/admin/customers",
  },
  {
    id: "promotion",
    icon: "fas fa-tags",
    title: "Khuyến mãi",
    href: "/admin/promotion",
  },
  {
    id: "account",
    icon: "fas fa-user",
    title: "Tài khoản",
    href: "/admin/account",
  },
];
