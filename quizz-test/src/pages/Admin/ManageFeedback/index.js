import { Avatar, Button, Input, List, Modal } from 'antd';
import React from 'react';

const ManageFeedback = () => {
	const dataSource = [
		{
			name: 'test1',
			email: 'test1@example.com',
			title: 'Test Title',
		},
		{
			name: 'test2',
			email: 'test2@example.com',
			title: 'Test Title',
		},
	];

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '12px',
				}}
			>
				<h1>Hòm thư góp ý </h1>
			</div>
			<Modal
				title='Phản hồi ý kiến'
				width={650}
				okText='Gửi'
				cancelText='Đóng lại'
			>
				<Input.TextArea />
			</Modal>
			<div>
				<List
					dataSource={dataSource}
					renderItem={(item) => (
						<List.Item key={item.name}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ width: '40px', height: '40px' }}>
										{item.name}
									</Avatar>
								}
								title={item.title}
								description={item.email}
							/>
							<Button type='link'>Phản hồi</Button>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default ManageFeedback;
