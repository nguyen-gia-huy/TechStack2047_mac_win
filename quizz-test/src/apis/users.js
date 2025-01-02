import axios from 'axios';
import { BASE_URL } from '../constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const URL = {
	get: `${BASE_URL}/users`,
	post: `${BASE_URL}/users`,
};

const fetchUsers = () => {
	return axios.get(URL.get);
};

const addUser = (newUser) => {
	return axios.post(URL.post, newUser);
};

export const useGetUsers = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
		select: (data) => data.data,
	});
};

export const useAddUser = ({ callbackSuccess, callbackError }) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addUser,
		onSuccess: (data) => {
			queryClient.invalidateQueries(['users']);
			callbackSuccess(data);
		},
		onError: (err) => {
			callbackError();
		},
	});
};
