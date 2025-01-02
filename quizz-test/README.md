```jsx
-route:
	route cho user
		Chung
			+Trang chủ /pages/Home => route: '/'
			+Danh sách đề thi /pages/ListExams => route: '/list-exams'
			+Liên hệ /pages/Contact => route: '/contact'
			+Trang chi tiết đề thi /pages/DetailExam => route: '/exams/:slug'
            VD: Ten de thi: De thi ReactJS => '/list-exams/de-thi-reactjs'
			+Not found /pages/NotFound
		Chưa đăng nhập
			+Đăng nhập /layouts/Navigation/index.js => FormLogin
			+Đăng ký /layouts/Navigation/index.js => FormRegister
		Đã đăng nhập
			+Bảng điểm /pages/Transcript => route: '/transcript'
			+Trang cá nhân /pages/Profile => route: '/profile'
			+Đổi mật khẩu /pages/ChangePassword => route: '/change_password'
	route cho admin
        Dashboard /pages/Admin/Dashboard => route: '/admin'
		Đề thi
			+Quản lý đề thi /pages/Admin/ManageExams => route: '/admin/exams'
			+Tạo đề thi /pages/Admin/ManageExams/CreateExam => route: '/admin/exams/create'
		Người dùng
			+Quản lý người dùng /pages/Admin/ManageUsers => route: '/admin/users'
		Feedback
			+Quản lý feedback /pages/Admin/ManageFeedback => route: '/admin/feedback'
		
	
-features:
	+Đăng nhập/ Đăng ký
	+Phân quyền
	+Danh sách đề thi (user)
	+Lọc đề thi/Tìm kiếm đề thi
	+Quản lý đề thi (admin)
	+Quản lý user
	+Đổi mật khẩu
	+Chi tiết user(trang cá nhân)
	+Thi thử
	+Bảng điểm
	+Liên hệ (user gửi email feedback cho admin)
```