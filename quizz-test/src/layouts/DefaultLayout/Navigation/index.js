import {
	Avatar,
	Button,
	Checkbox,
	Dropdown,
	Form,
	Input,
	Modal,
	notification,
} from 'antd';
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navigation.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddUser, useGetUsers } from '../../../apis/users';
import AuthContext from '../../../contexts/AuthContext';

const FormLogin = ({ onRegister, formLogin }) => {
	return (
		<Form name='basic' layout='vertical'>
			<Form.Item
				label='Email'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formLogin.errors.email && 'error'}
				help={formLogin.errors.email}
			>
				<Input
					size='large'
					name='email'
					value={formLogin.values.email}
					onChange={formLogin.handleChange}
				/>
			</Form.Item>
			<Form.Item
				label='Mật khẩu'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formLogin.errors.password && 'error'}
				help={formLogin.errors.password}
			>
				<Input.Password
					size='large'
					name='password'
					value={formLogin.values.password}
					onChange={formLogin.handleChange}
				/>
			</Form.Item>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Form.Item name='remember' valuePropName='checked'>
					<Checkbox>Ghi nhớ mật khẩu</Checkbox>
				</Form.Item>

				<Button type='link' onClick={onRegister}>
					Đăng ký
				</Button>
			</div>
		</Form>
	);
};

const FormRegister = ({ formRegister }) => {
	return (
		<Form name='basic' layout='vertical'>
			<Form.Item
				label='Email'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formRegister.errors.email && 'error'}
				help={formRegister.errors.email}
			>
				<Input
					size='large'
					name='email'
					value={formRegister.values.email}
					onChange={formRegister.handleChange}
				/>
			</Form.Item>
			<Form.Item
				label='Tên tài khoản'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formRegister.errors.username && 'error'}
				help={formRegister.errors.username}
			>
				<Input
					size='large'
					name='username'
					value={formRegister.values.username}
					onChange={formRegister.handleChange}
				/>
			</Form.Item>
			<Form.Item
				label='Mật khẩu'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formRegister.errors.password && 'error'}
				help={formRegister.errors.password}
			>
				<Input.Password
					size='large'
					name='password'
					value={formRegister.values.password}
					onChange={formRegister.handleChange}
				/>
			</Form.Item>
		</Form>
	);
};

const Navigation = () => {
	const [api, contextHolder] = notification.useNotification();
	const userId = localStorage.getItem("loggedUserId");
	const { userCurrent, onChangeUserCurrent } = useContext(AuthContext);

	const [isShowModal, setIsShowModal] = useState(false);
	const [statusModal, setStatusModal] = useState('register');

	const items = [
		{
			key: '1',
			label: <Link to={`/profile/${userId}`}>Thông tin</Link>,
		},
		{
			key: '2',
			label: <Link to='/profile'>Đổi mật khẩu</Link>,
		},
		// {
		// 	key: '3',
		// 	label: <Link to='/change-info'>Thay đổi thông tin</Link>,
		// },
		{
			key: '4',
			label: <div onClick={() => onChangeUserCurrent(null)}>Đăng xuất</div>,
		},
		
		{
			type: 'divider',
		},
		userCurrent?.role === 'admin' && {
			key: '5',
			label: <Link to='/admin'>Quản trị</Link>,
		},
	];

	const hanldeShowModal = () => {
		setIsShowModal(true);
	};

	const handleHideModal = () => {
		setIsShowModal(false);
	};

	const handleClickButtonRegister = () => {
		setStatusModal('register');
		hanldeShowModal();
	};

	const handleClickButtonLogin = () => {
		setStatusModal('login');
		hanldeShowModal();
	};

	const handleChangeStatusRegister = () => {
		setStatusModal('register');
	};

	const { data: listUsers } = useGetUsers();
	const { mutate: addUser } = useAddUser({
		callbackSuccess: (data) => {
			handleHideModal();
			api.success({
				message: 'Đăng ký thành công',
				placement: 'topRight',
			});

			onChangeUserCurrent(data.data);
			localStorage.setItem('user', JSON.stringify(data.data));
		},
		callbackError: (error) => {
			api.error({
				message: 'Đăng ký thất bại',
				description: error,
				placement: 'topRight',
			});
		},
	});

	const formRegister = useFormik({
		initialValues: {
			email: '',
			username: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required('Email không được để trống')
				.email('Chưa đúng định email'),
			username: Yup.string()
				.min(2, 'Tên tài khoản quá ngắn')
				.max(50, 'Tên tài khoản quá dài')
				.required('Tên tài khoản không được để trống'),
			password: Yup.string()
				.min(6, 'Mật khẩu không hợp lệ')
				.max(24, 'Mật khẩu không hợp lệ')
				.required('Mật khẩu không được để trống'),
		}),
		onSubmit: (data) => {
			console.log('Form register: ', data);
			let isExistEmail = false;
			for (let user of listUsers) {
				if (user.email === data.email) {
					isExistEmail = true;
				}
			}

			if (isExistEmail) {
				api.error({
					message: 'Đăng ký thất bại',
					description: 'Email đã tồn tại.',
					placement: 'topRight',
				});
			} else {
				addUser(data);
			}
		},
	});

	const formLogin = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required('Email không được để trống')
				.email('Chưa đúng định email'),
			password: Yup.string()
				.min(6, 'Mật khẩu không hợp lệ')
				.max(24, 'Mật khẩu không hợp lệ')
				.required('Mật khẩu không được để trống'),
		}),
		onSubmit: (data) => {
			for (let user of listUsers) {
				if (user.email === data.email && user.password === data.password) {
					handleHideModal();
					api.success({
						message: 'Đăng nhập thành công',
						placement: 'topRight',
					});
					onChangeUserCurrent(user);

					localStorage.setItem('user', JSON.stringify(user));
					localStorage.setItem("loggedUserId", user.id);
					return;
				}
			}

			api.error({
				message: 'Đăng nhập thất bại',
				placement: 'topRight',
			});
		},
	});

	const handleSubmit = () => {
		if (statusModal === 'register') {
			formRegister.handleSubmit();
			return;
		}

		formLogin.handleSubmit();
	};

	return (
		<>
			{contextHolder}
			<nav className='nav-app'>
				<div className='wrapper'>
					<div className='logo'>
						<Link to='#'>Thi Online</Link>
					</div>
					<input type='radio' name='slider' id='menu-btn' />
					<input type='radio' name='slider' id='close-btn' />
					<ul className='nav-links'>
						<label htmlFor='close-btn' className='btn close-btn'>
							<i className='fas fa-times' />
						</label>
						<li>
							<NavLink to='/'>Trang chủ</NavLink>
						</li>
						<li>
							<NavLink to='/list-exams?subject=all' className='desktop-item'>
								Môn thi
							</NavLink>
							<input type='checkbox' id='showDrop' />
							<label htmlFor='showDrop' className='mobile-item'>
								Dropdown Menu
							</label>
							<ul className='drop-menu'>
								<li>
									<NavLink to='/list-exams?subject=html'>HTML</NavLink>
								</li>
								<li>
									<NavLink to='/list-exams?subject=css'>CSS</NavLink>
								</li>
								<li>
									<NavLink to='/list-exams?subject=javascript'>
										Javascript
									</NavLink>
								</li>
								<li>
									<NavLink to='/list-exams?subject=reactjs'>ReactJS</NavLink>
								</li>
								<li>
									<NavLink to='/list-exams?subject=nodejs'>NodeJS</NavLink>
								</li>
							</ul>
						</li>
						<li>
							<NavLink to='/transcript'>Bảng điểm</NavLink>
						</li>

						<li>
							<NavLink to='/contact'>Liên hệ</NavLink>
						</li>
					</ul>
					<label htmlFor='menu-btn' className='btn menu-btn'>
						<i className='fas fa-bars' />
					</label>

					<div className='profile'>
						{userCurrent ? (
							<>
								{/* Đã đăng nhập */}
								<Dropdown menu={{ items }} placement='top'>
									<Avatar
										size='large'
										style={{ width: '55px', height: '55px' }}
									>
										{userCurrent.username.slice(0, 1)}
									</Avatar>
								</Dropdown>
							</>
						) : (
							<>
								{/* Chưa đăng nhập */}
								<Button
									onClick={handleClickButtonRegister}
									style={{ margin: '0px 8px' }}
								>
									Đăng ký
								</Button>
								<Button
									onClick={handleClickButtonLogin}
									style={{ margin: '0px 8px' }}
								>
									Đăng nhập
								</Button>
							</>
						)}
					</div>
				</div>
			</nav>
			<Modal
				title={statusModal === 'register' ? 'Đăng ký' : 'Đăng nhập'}
				open={isShowModal}
				okText={statusModal === 'register' ? 'Đăng ký' : 'Đăng nhập'}
				cancelText='Đóng lại'
				maskClosable={false}
				onOk={handleSubmit}
				onCancel={handleHideModal}
			>
				{statusModal === 'register' ? (
					<FormRegister formRegister={formRegister} />
				) : (
					<FormLogin
						onRegister={handleChangeStatusRegister}
						formLogin={formLogin}
					/>
				)}
			</Modal>
		</>
	);
};

export default Navigation;
