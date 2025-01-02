import axios from 'axios';
import { BASE_URL } from '../constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const URL = {
	get: `${BASE_URL}/exams`,
	getDetail: `${BASE_URL}/exams/:id`,
	post: `${BASE_URL}/exams`,
	update: `${BASE_URL}/exams/:id`,
	delete: `${BASE_URL}/exams/:id`,
};

const fetchExams = () => {
	return axios.get(URL.get);
};

const fetchExam = (id) => {
	return axios.get(URL.getDetail.replace(':id', id));
};

const createExam = (newExam) => {
	return axios.post(URL.post, newExam);
};

const updateExam = (data) => {
	const { id } = data;

	return axios.put(URL.update.replace(':id', id), data);
};

const deleteExam = (id) => {
	return axios.delete(URL.delete.replace(':id', id));
};

export const useGetExams = () => {
	return useQuery({
		queryKey: ['exams'],
		queryFn: fetchExams,
		select: (data) => data.data,
	});
};

export const useGetExam = (id) => {
	return useQuery({
		queryKey: [id],
		queryFn: () => fetchExam(id),
		select: (data) => data.data,
		enabled: !!id,
	});
};

export const useCreateExam = ({ callbackSuccess, callbackError }) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createExam,
		onSuccess: (data) => {
			queryClient.invalidateQueries(['exams']);
			callbackSuccess(data);
		},
		onError: (err) => {
			callbackError();
		},
	});
};

export const useUpdateExam = ({ callbackSuccess, callbackError }) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateExam,
		onSuccess: (data) => {
			queryClient.invalidateQueries(['exams']);
			queryClient.invalidateQueries([data.id]);
			callbackSuccess(data);
		},
		onError: (err) => {
			callbackError();
		},
	});
};

export const useDeleteExam = ({ callbackSuccess, callbackError }) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteExam,
		onSuccess: (data) => {
			queryClient.invalidateQueries(['exams']);
			callbackSuccess(data);
		},
		onError: (err) => {
			callbackError();
		},
	});
};
