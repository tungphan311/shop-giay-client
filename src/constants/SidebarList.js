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
    id: "member",
    icon: "fas fa-user",
    title: "Hội viên",
    href: "/admin/members",
    sub: [
      { href: "/admin/members/add", title: "Thêm hội viên mới" },
      { href: "/admin/members", title: "Danh sách hội viên" },
    ],
  },
];
