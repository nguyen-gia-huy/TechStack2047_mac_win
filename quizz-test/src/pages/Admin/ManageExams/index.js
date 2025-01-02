import React from 'react';
import { Button, notification, Space, Table, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDeleteExam, useGetExams } from '../../../apis/exams';
import { useNavigate } from 'react-router-dom';

const ManageExams = () => {
	const [api, contextHolder] = notification.useNotification();

	const navigate = useNavigate();

	const { data } = useGetExams();
	const { mutate: deleteExam } = useDeleteExam({
		callbackSuccess: (data) => {
			api.success({
				message: 'Xóa đề thi thành công',
				placement: 'topRight',
			});
		},
		callbackError: (error) => {
			api.error({
				message: 'Xóa đề thi thất bại',
				description: error,
				placement: 'topRight',
			});
		},
	});

	const handleDeleteExam = (id) => {
		deleteExam(id);
	};

	const handleUpdateExam = (id) => {
		navigate(`./edit/${id}`);
	};

	const columns = [
		{
			title: 'Tên đề thi',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Môn thi',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Mức độ',
			key: 'level',
			dataIndex: 'level',
		},
		{
			title: 'Số lượng câu hỏi',
			key: 'action',
			render: (_, { questions }) => <Tag color='green'>{questions.length}</Tag>,
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Tooltip title='Chỉnh sửa'>
						<Button
							onClick={() => handleUpdateExam(record.id)}
							shape='circle'
							icon={<EditOutlined />}
						/>
					</Tooltip>
					<Tooltip title='Xóa'>
						<Button
							onClick={() => handleDeleteExam(record.id)}
							shape='circle'
							icon={<DeleteOutlined />}
						/>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div>
			{contextHolder}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '12px',
				}}
			>
				<h1>Danh sách đề thi </h1>
			</div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default ManageExams;
