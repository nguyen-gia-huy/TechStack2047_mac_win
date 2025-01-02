import {
	DashboardOutlined,
	FileTextOutlined,
	LoginOutlined,
	MailOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
const { Content, Sider } = Layout;

const DefaultLayoutAdmin = (props) => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const navigate = useNavigate();

	const handleRedirectPage = (url) => {
		navigate(url);
	};

	const listNav = [
		{
			key: '',
			icon: <DashboardOutlined />,
			label: <div onClick={() => handleRedirectPage('/admin')}>Trang chủ</div>,
		},
		{
			key: 'mange-exams',
			icon: <FileTextOutlined />,
			label: 'Đề thi',
			children: [
				{
					key: 'exams',
					label: (
						<div onClick={() => handleRedirectPage('/admin/exams')}>
							Danh sách đề thi
						</div>
					),
				},
				{
					key: 'exams/create',
					label: (
						<div onClick={() => handleRedirectPage('/admin/exams/create')}>
							Tạo đề thi
						</div>
					),
				},
			],
		},
		{
			key: 'mange-users',
			icon: <UserOutlined />,
			label: 'Người dùng',
			children: [
				{
					key: 'users',
					label: 'Danh sách người dùng',
				},
			],
		},
		{
			key: 'mange-feedback',
			icon: <MailOutlined />,
			label: 'Hòm thư góp ý',
			children: [
				{
					key: 'feedback',
					label: 'Danh sách phản hồi',
				},
			],
		},
		{
			key: 'logout',
			icon: <LoginOutlined />,
			label: 'Quay lại trang người dùng',
		},
	];

	return (
		<div className='nav-admin'>
			<Layout>
				<Layout>
					<Sider
						width={300}
						style={{
							background: colorBgContainer,
						}}
					>
						<Menu
							mode='inline'
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{
								height: '100%',
								borderRight: 0,
							}}
							items={listNav}
						/>
					</Sider>
					<Layout
						style={{
							padding: '0 24px 24px',
						}}
					>
						<Breadcrumb
							style={{
								margin: '16px 0',
							}}
						>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>List</Breadcrumb.Item>
							<Breadcrumb.Item>DefaultLayoutAdmin</Breadcrumb.Item>
						</Breadcrumb>
						<Content
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
							}}
						>
							{props.children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};
export default DefaultLayoutAdmin;
