import { ClockCircleOutlined } from '@ant-design/icons';
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	notification,
	Radio,
	Row,
	Select,
	Space,
} from 'antd';
import React, { useState } from 'react';
import './styles.css';

const CreateExam = () => {
	const [api, contextHolder] = notification.useNotification();

	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState(null);
	const [time, setTime] = useState(null);
	const [subject, setSubject] = useState('html');
	const [level, setLevel] = useState('basic');
	const [questions, setQuestions] = useState([
		{
			question: null,
			answers: [],
			answer_correct: null,
		},
	]);

	const handleChangeTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleChangeTime = (event) => {
		setTime(event.target.value);
	};

	const handleChangeSubject = (value) => {
		setSubject(value);
	};

	const handleChangeLevel = (value) => {
		setLevel(value);
	};

	const handleAddQuestion = () => {
		const newQuestion = {
			question: null,
			answers: [],
			answer_correct: null,
		};

		setQuestions([...questions, newQuestion]);
	};

	// Hàm xử lý nội dung câu hỏi
	const handleChangeQuestion = (event, index) => {
		const questionsTemp = [...questions];
		questionsTemp[index].question = event.target.value;

		setQuestions(questionsTemp);
	};

	// Hàm xử lý đáp án
	const handleChangeAnswer = (event, index, indexAswer) => {
		const questionsTemp = [...questions];
		questionsTemp[index].answers[indexAswer] = event.target.value;

		setQuestions(questionsTemp);
	};

	// Hàm chọn đáp án đúng
	const handleChangeAnswerCorrect = (event, index) => {
		const questionsTemp = [...questions];
		questionsTemp[index].answer_correct = event.target.value;

		setQuestions(questionsTemp);
	};

	// Hàm tạo đề thi
	const handleCreateExam = async () => {
		setIsLoading(true);
		const newExams = {
			title,
			time,
			subject,
			level,
			questions,
			highest_point: null,
		};

		try {
			const response = await fetch('http://localhost:8080/exams', {
				method: 'POST',
				body: JSON.stringify(newExams),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			api.success({
				message: 'Tạo đề thi thành công',
			});

			setTitle(null);
			setTime(null);
			setSubject('html');
			setLevel('basic');
			setQuestions([
				{
					question: null,
					answers: [],
					answer_correct: null,
				},
			]);
		} catch (e) {
			api.error({
				message: 'Tạo đề thi không thành công',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const checkStatusDisabledButtonCreate = () => {
		if (!title || !time || !subject || !level || questions.length < 2) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className='create-exam'>
			{contextHolder}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>Tạo đề thi</h1>
			</div>

			<Form name='basic' layout='vertical'>
				<Row justify='space-between'>
					<Col span={11}>
						<div>
							<Divider orientation='left'>Nội dung đề thi</Divider>
						</div>
						<Row justify='space-between'>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Tên đề thi'>
									<Input
										size='large'
										value={title}
										onChange={handleChangeTitle}
									/>
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Thời gian'>
									<Input
										prefix={<ClockCircleOutlined />}
										suffix='phút'
										type='number'
										size='large'
										value={time}
										onChange={handleChangeTime}
									/>
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Môn thi'>
									<Select
										size='large'
										value={subject}
										onChange={handleChangeSubject}
										options={[
											{
												value: 'html',
												label: 'HTML',
											},
											{
												value: 'css',
												label: 'CSS',
											},
											{
												value: 'javascript',
												label: 'Javascript',
											},
											{
												value: 'reactjs',
												label: 'ReactJS',
											},
											{
												value: 'nodejs',
												label: 'NodeJS',
											},
										]}
									/>
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Mức độ'>
									<Select
										size='large'
										value={level}
										onChange={handleChangeLevel}
										options={[
											{
												value: 'basic',
												label: 'Cơ bản',
											},
											{
												value: 'medium',
												label: 'Trung bình',
											},
											{
												value: 'advanced',
												label: 'Nâng cao',
											},
										]}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col span={11}>
						<div>
							<Divider orientation='left'>Số lượng câu hỏi</Divider>
						</div>
						<Row justify='space-between'>
							<Col span={24} style={{ padding: '0px 12px' }}>
								{questions.map((question, index) => (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											marginTop: index === 0 ? '0px' : '20px',
										}}
									>
										<Form.Item label={`Câu hỏi ${index + 1}`}>
											<Input.TextArea
												onChange={(event) => handleChangeQuestion(event, index)}
											/>
										</Form.Item>
										<Radio.Group
											onChange={(event) =>
												handleChangeAnswerCorrect(event, index)
											}
										>
											<Space direction='vertical' style={{ width: '100%' }}>
												<Radio value='A'>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
														}}
													>
														<div style={{ marginRight: '8px', width: '78px' }}>
															Đáp án A
														</div>
														<Input
															onChange={(event) =>
																handleChangeAnswer(event, index, 0)
															}
														/>
													</div>
												</Radio>
												<Radio value='B'>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
														}}
													>
														<div style={{ marginRight: '8px', width: '78px' }}>
															Đáp án B
														</div>
														<Input
															onChange={(event) =>
																handleChangeAnswer(event, index, 1)
															}
														/>
													</div>
												</Radio>
												<Radio value='C'>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
														}}
													>
														<div style={{ marginRight: '8px', width: '78px' }}>
															Đáp án C
														</div>
														<Input
															onChange={(event) =>
																handleChangeAnswer(event, index, 2)
															}
														/>
													</div>
												</Radio>
												<Radio value='D'>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
														}}
													>
														<div style={{ marginRight: '8px', width: '78px' }}>
															Đáp án D
														</div>
														<Input
															onChange={(event) =>
																handleChangeAnswer(event, index, 3)
															}
														/>
													</div>
												</Radio>
											</Space>
										</Radio.Group>
									</div>
								))}

								<Button
									fullWidth
									style={{ marginTop: '12px' }}
									onClick={handleAddQuestion}
								>
									Thêm mới câu hỏi
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>

				<div
					style={{
						marginTop: '32px',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Button danger style={{ marginLeft: '12px' }}>
						Đóng lại
					</Button>
					<Button
						type='primary'
						style={{ marginRight: '12px' }}
						onClick={handleCreateExam}
						loading={isLoading}
						disabled={checkStatusDisabledButtonCreate()}
					>
						Tạo đề thi
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default CreateExam;
