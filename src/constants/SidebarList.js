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
    id: "customers",
    icon: "fas fa-user",
    title: "Khách hàng",
    href: "/admin/customers",
  },
  {
    id: "promotion",
    icon: "fas fa-tags",
    title: "Khuyến mãi",
    href: ["/admin/promotion", "/admin/promotion/add"],
  },
];
