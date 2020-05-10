# Một vài lưu ý khi code:

1. Sau khi clone prj về, chạy lệnh: _yarn_ để cài đặt package
2. Khi muốn cài thư viện mới, dùng lệnh: _yarn add_ để thêm package, tránh dùng _npm install_

# Cấu trúc của prj:

_Mọi code mới đều sẽ được thêm vào folder `src`_: mọi file js đều chứa trong 1 folder cùng tên để quản lý source cùng với các file css (nếu có)

- folder `Component`: chứa các component nhỏ sẽ được sử dụng trong prj: _datepicker, header, footer, input, ..._,
- folder `layouts`: 1 trang web thường có nhiều trang web giống nhau ở nhiều thành phần như header, footer, sidebar, ... Các thành phần đó sẽ được code chung thành 1 layout thay vì mỗi trang web lại phải copy lại đoạn code đó. Hiện tại đang có 3 layout:

1. ClientLayout: Layout cho phía client site
2. AdminLayout: Layout cho phía admin site
3. EmptyLayout: 1 vài trang web sẽ có cấu trúc riêng như trang đăng nhập, trang 404, ...

- folder `pages`: chứa các component của từng trang trong hệ thống, folder được chia thành 2 phần **admin** và **client**, trong mỗi phần thì từng trang web sẽ có 1 folder riêng, đặt tên như sau: _Admin/Client + tên trang_, trong folder sẽ chứa code js, css cho trang đó
- folder `routes`: chứa file `routes.js`, nơi khai báo các url của web và các component của pages tương ứng với url đó
- folder `services`: chứa các đoạn code axios, tương tác với api
- folder `state`: chứa code quản lý state, có 2 folder con: reducers (chứa các reducer) và sagas (chứa các saga)
- folder `utils`: chứa các function được sử dụng nhiều lần trong prj, và có thể được sử dụng ở nhiều component

# Quy trình thêm 1 trang mới:

1. Tạo 1 folder con ở `pages`, đặt vào đúng sub folder (admin | client), đặt tên như quy tắc ở trên
2. Cài đặt code cho component
3. Để có thể truy cập vào url mong muốn, vào file `routes.js`, thêm 1 <Route /> vào layout mong muốn, sau đó thêm path vào list path ở component <Route> cha để có thể truy cập vào path đó
