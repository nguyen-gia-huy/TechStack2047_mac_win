import { Avatar, Button, Divider, Input, List, Modal } from 'antd';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ManageFeedback = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [content, setContent] = useState('');
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		console.log(content);
		emailjs
			.send(
				'YOUR_SERVICE_ID', // Thay bằng Service ID của bạn
				'YOUR_TEMPLATE_ID', // Thay bằng Template ID của bạn
				{
					name: 'Dũng',
					email: 'tiendung.do@secomus.com',
					message: content,
				},
				'YOUR_USER_ID' // Thay bằng User ID của bạn
			)
			.then((result) => {
				console.log('Email sent successfully:', result.text);
			})
			.catch((error) => {
				console.error('Error sending email:', error.text);
			})
			// .finally(() => {
			// 	setIsModalOpen(false);
			// });
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

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
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={650}
				okText='Gửi'
				cancelText='Đóng lại'
			>
				<Input.TextArea
					style={{
						height: '150px',
					}}
					value={content}
					onChange={(event) => setContent(event.target.value)}
				/>
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
							<Button type='link' onClick={showModal}>
								Phản hồi
							</Button>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default ManageFeedback;
