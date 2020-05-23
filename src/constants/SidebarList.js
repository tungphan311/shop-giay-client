export const SIDEBAR_LIST = [
  {
    id: "dashboard",
    icon: "fas fa-home",
    title: "Trang chủ",
    href: "/admin",
  },
  {
    id: "bills",
    icon: "fas fa-file-invoice-dollar",
    title: "Tra cứu hoá đơn",
    href: "/admin/invoices",
  },
  {
    id: "shoes",
    icon: "fas fa-capsules",
    title: "Quản lý kho",
    href: ["/admin/shoes", "/admin/shoes/import", "/admin/shoes/add"],
    sub: [
      { href: "/admin/shoes", title: "Danh sách sản phẩm" },
      { href: "/admin/shoes/import", title: "Nhập hàng mới" },
      { href: "/admin/shoes/add", title: "Thêm giày mới" },
    ],
  },
  {
    id: "member",
    icon: "fas fa-user",
    title: "Hội viên",
    href: ["/admin/members", "/admin/members/add"],
    sub: [
      { href: "/admin/members/add", title: "Thêm hội viên mới" },
      { href: "/admin/members", title: "Danh sách hội viên" },
    ],
  },
];
