import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';
import ListExams from './pages/ListExams';
import Contact from './pages/Contact';
import DetailExam from './pages/DetailExam';
import Transcript from './pages/Transcript';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Admin from './pages/Admin';
import Dashboard from './pages/Admin/Dashboard';
import ManageExams from './pages/Admin/ManageExams';
import CreateExam from './pages/Admin/ManageExams/CreateExam';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageFeedback from './pages/Admin/ManageFeedback';
import AuthContext from './contexts/AuthContext';
import { useState } from 'react';

const App = () => {
	const [userCurrent, setUserCurrent] = useState(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			return user;
		}

		return null;
	});

	const handleChangeUserCurrent = (user) => {
		localStorage.removeItem('user');
		setUserCurrent(user);
	};

	const valueContext = {
		userCurrent,
		onChangeUserCurrent: handleChangeUserCurrent,
	};

	return (
		<AuthContext.Provider value={valueContext}>
			<Routes>
				<Route path='/' element={<DefaultLayout />}>
					<Route path='' element={<Home />} />
					<Route path='list-exams' element={<ListExams />} />
					<Route path='list-exams/:id' element={<DetailExam />} />
					<Route path='contact' element={<Contact />} />
					<Route path='transcript' element={<Transcript />} />
					<Route path='profile/:id' element={<Profile />} />
					<Route path='change-password' element={<ChangePassword />} />
				</Route>
				<Route path='/admin' element={<Admin />}>
					<Route path='' element={<Dashboard />} />
					<Route path='exams' element={<ManageExams />} />
					<Route path='exams/create' element={<CreateExam />} />
					<Route path='exams/edit/:id' element={<CreateExam />} />
					<Route path='users' element={<ManageUsers />} />
					<Route path='feedback' element={<ManageFeedback />} />
				</Route>
			</Routes>
		</AuthContext.Provider>
	);
};

export default App;
