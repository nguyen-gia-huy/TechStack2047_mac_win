import {
	ClockCircleOutlined,
	QuestionCircleOutlined,
	StarOutlined,
	StockOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Divider, List } from 'antd';
import React from 'react';

const Home = () => {
	const listExam = [
		{
			title: 'Đề thi 1',
			time: '45',
			questions: [
				{
					question: 'Câu hỏi 1',
					answer: {
						A: 'Đáp án A',
						B: 'Đáp án B',
						C: 'Đáp án C',
						D: 'Đáp án D',
					},
					answer_correct: [1],
				},
			],
		},
		{
			title: 'Đề thi 1',
			time: '45',
			questions: [
				{
					question: 'Câu hỏi 1',
					answer: {
						A: 'Đáp án A',
						B: 'Đáp án B',
						C: 'Đáp án C',
						D: 'Đáp án D',
					},
					answer_correct: [1],
				},
			],
		},
	];

	return (
		<>
			<div style={{ marginTop: '32px' }}>
				<h1>Tuyển chọn các đề thi</h1>
			</div>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					HTML
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'html')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description={
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div>
											<QuestionCircleOutlined />
											<span style={{ marginLeft: '4px' }}>50 câu</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<ClockCircleOutlined />
											<span style={{ marginLeft: '4px' }}>40 phút</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<StarOutlined />
											<span style={{ marginLeft: '4px' }}>
												Điểm cao nhất: 9
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<StockOutlined />
											<span style={{ marginLeft: '4px' }}>Mức độ: cơ bản</span>
										</div>
									</div>
								}
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					CSS
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'css')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					Javascript
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'javascript')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					ReactJS
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'reactjs')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					NodeJS
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'nodejs')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card>
		</>
	);
};

export default Home;
