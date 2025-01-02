import { Button, Card, Divider, Form, Input } from 'antd';
import React from 'react';

const Contact = () => {
	return (
		<>
			<div
				style={{
					marginTop: '32px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>Đóng góp ý kiến</h1>
			</div>
			<Card style={{ marginTop: '32px' }}>
				<div style={{ position: 'relative' }}>
					<Divider orientation='left' style={{ margin: '0px' }}>
						Ý kiến của bạn
					</Divider>
				</div>
				<Form name='basic' layout='vertical'>
					<Form.Item label='Họ và tên'>
						<Input size='large' />
					</Form.Item>

					<Form.Item label='Địa chỉ email'>
						<Input size='large' />
					</Form.Item>

					<Form.Item label='Ý kiến của bạn'>
						<Input.TextArea size='large' />
					</Form.Item>

					<Button type='primary'>Gửi ý kiến</Button>
				</Form>
			</Card>
		</>
	);
};
export default Contact;
