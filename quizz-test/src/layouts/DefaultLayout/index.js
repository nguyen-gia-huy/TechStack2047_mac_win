import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const { Content } = Layout;

const layoutStyle = {
	borderRadius: 8,
	overflow: 'hidden',
	width: 'calc(50% - 8px)',
	maxWidth: '1300px',
	margin: 'auto',
	backgroundColor: 'transparent',
	padding: '12px',
};

const DefaultLayout = ({ children }) => {
	return (
		<div>
			<Navigation />
			<Layout style={layoutStyle}>
				<div className='body-page'>
					<Content><Outlet /></Content>
				</div>
			</Layout>
		</div>
	);
};

export default DefaultLayout;
