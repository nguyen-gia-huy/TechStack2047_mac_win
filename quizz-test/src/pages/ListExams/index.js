import { SearchOutlined } from '@ant-design/icons';
import { Card, Divider, Input, Select } from 'antd';
import React from 'react';

const ListExams = () => {
	const titleSubject = {
		html: 'HTML',
		css: 'CSS',
		javascript: 'JavaScript',
		reactjs: 'ReactJS',
		nodejs: 'NodeJS',
	};

	const titleLevel = {
		basic: 'Cơ bản',
		medium: 'Trung bình',
		advanced: 'Nâng cao',
	};

	return (
		<>
			<div
				style={{
					marginTop: '32px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>Đề thi HTMl</h1>

				<Input
					prefix={<SearchOutlined />}
					style={{ height: '35px', width: '230px' }}
				/>
			</div>
			<Card style={{ marginTop: '32px' }}>
				<div style={{ position: 'relative' }}>
					<Divider orientation='left' style={{ margin: '0px' }}>
						HTML
					</Divider>
					<Select
						style={{
							width: 150,
							position: 'absolute',
							right: '8px',
							top: '-4px',
						}}
						options={[
							{ value: 'all', label: 'Tất cả' },
							{
								value: 'basic',
								label: 'Cơ bản',
							},
							{
								value: 'edium',
								label: 'Trung bình',
							},
							{
								value: 'advanced',
								label: 'Nâng cao',
							},
						]}
					/>
				</div>
			</Card>
		</>
	);
};

export default ListExams;
