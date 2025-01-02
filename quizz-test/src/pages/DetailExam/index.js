import { Button, Radio, Space } from 'antd';
import React from 'react';
import './styles.css';

const DetailExam = () => {
	return (
		<div className='exam-detail-container'>
			{/* Header */}
			<header className='exam-header'>
				<div className='exam-title'>
					<h1>Tên Đề Thi</h1>
				</div>
				<div className='back-button'>
					<Button>Quay lại</Button>
				</div>
			</header>

			{/* Exam Info */}
			<section
				className='exam-info'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div>
					<h2>Thông Tin Đề Thi</h2>
					<p>
						<strong>Tên đề thi:</strong> Đề thi 1
					</p>
					<p>
						<strong>Thời gian làm bài:</strong> 60 phút
					</p>
					<p>
						<strong>Số lượng câu hỏi:</strong> 10 câu
					</p>
				</div>
				<div>
					<h2>Số câu trả lời đúng</h2>
					<h1>1/10</h1>
				</div>
			</section>

			{/* Countdown Timer */}

			<div className='countdown-timer'>
				{/* <h3>Thời gian còn lại: 60p</h3> */}
				<Button type='primary'>Bắt đầu làm bài</Button>
			</div>

			{/* Questions List */}
			<section className='questions-section'>
				{/* Question */}
				<div className='question-item'>
					<p>
						<strong>Câu 1:</strong> Câu hỏi 1?
					</p>
					<div className='answer-options' style={{ marginTop: '10px' }}>
						<Radio.Group>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Radio>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<div
											style={{
												marginRight: '8px',
												width: '78px',
												color: 'black',
											}}
										>
											Đáp án 1
										</div>
									</div>
								</Radio>
								<Radio>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<div
											style={{
												marginRight: '8px',
												width: '78px',
												color: 'black',
											}}
										>
											Đáp án 2
										</div>
									</div>
								</Radio>
								<Radio>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<div
											style={{
												marginRight: '8px',
												width: '78px',
												color: 'black',
											}}
										>
											Đáp án 3
										</div>
									</div>
								</Radio>
								<Radio>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<div
											style={{
												marginRight: '8px',
												width: '78px',
												color: 'black',
											}}
										>
											Đáp án 4
										</div>
									</div>
								</Radio>
							</Space>
						</Radio.Group>
					</div>
				</div>
			</section>

			<footer className='exam-footer'>
				<Button type='primary' className='submit-button'>
					Nộp bài
				</Button>
			</footer>
		</div>
	);
};

export default DetailExam;
