import {
	ClockCircleOutlined,
	QuestionCircleOutlined,
	SearchOutlined,
	StarOutlined,
	StockOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Button,
	Card,
	Divider,
	Input,
	List,
	Select,
	Skeleton,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { convertTitleToSlug } from '../../helpers';

const ListExams = () => {
	const navigate = useNavigate();
	const [searchParms, setSearchParms] = useSearchParams();
	const subjectFilter = searchParms.get('subject');
	const [levelFilter, setLevelFilter] = useState('all');

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

	const [listExam, setListExam] = useState([]);

	const getListExam = async (subject) => {
		// Có thể sử dụng thử viện axios
		const response = await fetch(
			`http://localhost:8080/exams?subject=${subject}`
		);
		const exams = await response.json();

		setListExam(exams);
	};

	const handleChangeLevel = (value) => {
		setLevelFilter(value);
	};

	const handleRedirect = (exam) => {
		let slug = convertTitleToSlug(exam.title);
		slug = `${slug}-${exam.id}.html`;

		navigate(`/detail/${slug}`);
	};

	useEffect(() => {
		getListExam(subjectFilter);
	}, [subjectFilter]);

	return (
		<>
			<div
				style={{
					marginTop: '32px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>Đề thi {titleSubject[subjectFilter]}</h1>

				<Input
					prefix={<SearchOutlined />}
					style={{ height: '35px', width: '230px' }}
				/>
			</div>
			<Card style={{ marginTop: '32px' }}>
				<div style={{ position: 'relative' }}>
					<Divider orientation='left' style={{ margin: '0px' }}>
						{titleSubject[subjectFilter]}
					</Divider>
					<Select
						onChange={handleChangeLevel}
						value={levelFilter}
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
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={
						levelFilter === 'all'
							? listExam
							: listExam.filter((exam) => exam.level === levelFilter)
					}
					renderItem={(exam) => (
						<List.Item
							actions={[
								<Button onClick={() => handleRedirect(exam)}>Thi thử</Button>,
							]}
						>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description={
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div>
											<QuestionCircleOutlined />
											<span style={{ marginLeft: '4px' }}>
												{exam?.questions?.length} câu
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<ClockCircleOutlined />
											<span style={{ marginLeft: '4px' }}>
												{exam?.time} phút
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<StarOutlined />
											<span style={{ marginLeft: '4px' }}>
												Điểm cao nhất: {exam?.highest_point ?? 'Chưa có'}
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<StockOutlined />
											<span style={{ marginLeft: '4px' }}>
												Mức độ: {titleLevel[exam?.level] ?? 'Chưa xác định'}
											</span>
										</div>
									</div>
								}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</>
	);
};

export default ListExams;
