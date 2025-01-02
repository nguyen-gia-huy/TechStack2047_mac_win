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
import React, { useEffect, useState } from 'react';
import './styles.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	useCreateExam,
	useGetExam,
	useUpdateExam,
} from '../../../../apis/exams';
import { useParams } from 'react-router-dom';

const CreateExam = () => {
	const params = useParams();
	const idExam = params.id;

	const [api, contextHolder] = notification.useNotification();

	const [statePage, setStatePage] = useState('create');
	const [questions, setQuestions] = useState([
		{
			question: '',
			answers: ['', '', '', ''],
			answerCorrect: -1,
		},
	]);

	const validationSchema = Yup.object({
		name: Yup.string().required('Tên đề thi không được bỏ trống'),
		time: Yup.number()
			.required('Thời gian làm bài là bắt buộc')
			.min(1, 'Thời gian phải lớn hơn 0'),
		subject: Yup.string().required('Môn học không được bỏ trống'),
		level: Yup.number()
			.required('Cấp độ là bắt buộc')
			.oneOf([1, 2, 3], 'Cấp độ phải là Cơ bản hoặc Trung bình hoặc Nâng cao'),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			time: 0,
			subject: '',
			level: 1,
			highestScore: 0,
		},
		// validationSchema,
		onSubmit: (data) => {
			const newExam = { ...data, questions };

			if (statePage === 'create') {
				createExam(newExam);
			} else {
				updateExam(newExam);
			}
		},
	});

	const { data } = useGetExam(idExam);

	const { mutate: createExam, isPending } = useCreateExam({
		callbackSuccess: (data) => {
			api.success({
				message: 'Tạo đề thi thành công',
				placement: 'topRight',
			});
			setQuestions([
				{
					question: '',
					answers: ['', '', '', ''],
					answerCorrect: -1,
				},
			]);

			formik.handleReset();
		},
		callbackError: (error) => {
			api.error({
				message: 'Tạo đề thi thất bại',
				description: error,
				placement: 'topRight',
			});
		},
	});

	const { mutate: updateExam } = useUpdateExam({
		callbackSuccess: (data) => {
			api.success({
				message: 'Sửa đề thi thành công',
				placement: 'topRight',
			});
		},
		callbackError: (error) => {
			api.error({
				message: 'Sửa đề thi thất bại',
				description: error,
				placement: 'topRight',
			});
		},
	});

	const handleAddQuestion = () => {
		setQuestions([
			...questions,
			{
				question: '',
				answers: ['', '', '', ''],
				answerCorrect: -1,
			},
		]);
	};

	const handleChangeContentQuestion = (value, index, key, indexAnswer = -1) => {
		const newQuestions = [...questions];
		if (indexAnswer !== -1) {
			newQuestions[index][key][indexAnswer] = value;
		} else {
			newQuestions[index][key] = value;
		}

		setQuestions(newQuestions);
	};

	useEffect(() => {
		if (idExam) {
			setStatePage('edit');
		}
	}, [idExam]);

	useEffect(() => {
		if (data?.questions.length > 0) {
			setQuestions(data.questions);
		}
		if (data?.name) {
			formik.setFieldValue('name', data.name);
		}
		if (data?.time) {
			formik.setFieldValue('time', data.time);
		}
		if (data?.subject) {
			formik.setFieldValue('subject', data.subject);
		}
		if (data?.level) {
			formik.setFieldValue('level', data.level);
		}
		if (data?.level) {
			formik.setFieldValue('id', data.id);
		}
	}, [data]);

	return (
		<div className='create-exam'>
			{contextHolder}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>{statePage === 'create' ? 'Tạo' : 'Sửa'} đề thi</h1>
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
										name='name'
										value={formik.values.name}
										onChange={formik.handleChange}
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
										name='time'
										value={formik.values.time}
										onChange={formik.handleChange}
									/>
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Môn thi'>
									<Select
										size='large'
										name='subject'
										value={formik.values.subject}
										onChange={(value) => formik.setFieldValue('subject', value)}
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
										name='level'
										value={formik.values.level}
										onChange={(value) => formik.setFieldValue('level', value)}
										options={[
											{
												value: 1,
												label: 'Cơ bản',
											},
											{
												value: 2,
												label: 'Trung bình',
											},
											{
												value: 3,
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
						{questions?.map((question, index) => (
							<Row justify='space-between'>
								<Col span={24} style={{ padding: '0px 12px' }}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											marginTop: '0px',
										}}
									>
										<Form.Item label={`Câu hỏi ${index + 1}`}>
											<Input.TextArea
												value={question?.question}
												onChange={(event) =>
													handleChangeContentQuestion(
														event.target.value,
														index,
														'question'
													)
												}
											/>
										</Form.Item>
										<Radio.Group
											value={Number(question?.answerCorrect)}
											onChange={(event) => {
												handleChangeContentQuestion(
													event.target.value,
													index,
													'answerCorrect'
												);
											}}
										>
											<Space direction='vertical' style={{ width: '100%' }}>
												<Radio value={0}>
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
															value={question?.answers[0]}
															onChange={(event) =>
																handleChangeContentQuestion(
																	event.target.value,
																	index,
																	'answers',
																	0
																)
															}
														/>
													</div>
												</Radio>
												<Radio value={1}>
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
															value={question?.answers[1]}
															onChange={(event) =>
																handleChangeContentQuestion(
																	event.target.value,
																	index,
																	'answers',
																	1
																)
															}
														/>
													</div>
												</Radio>
												<Radio value={2}>
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
															value={question?.answers[2]}
															onChange={(event) =>
																handleChangeContentQuestion(
																	event.target.value,
																	index,
																	'answers',
																	2
																)
															}
														/>
													</div>
												</Radio>
												<Radio value={3}>
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
															value={question?.answers[3]}
															onChange={(event) =>
																handleChangeContentQuestion(
																	event.target.value,
																	index,
																	'answers',
																	3
																)
															}
														/>
													</div>
												</Radio>
											</Space>
										</Radio.Group>
									</div>
								</Col>
							</Row>
						))}
						<Button
							onClick={handleAddQuestion}
							fullWidth
							style={{ marginTop: '12px' }}
						>
							Thêm mới câu hỏi
						</Button>
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
						onClick={formik.handleSubmit}
						loading={isPending}
					>
						{statePage === 'create' ? 'Tạo' : 'Cập nhật'} đề thi
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default CreateExam;
