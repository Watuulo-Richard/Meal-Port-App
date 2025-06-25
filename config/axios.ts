'use server'
import { baseUrl } from '@/types/types';
import axios from 'axios';

export const axiosAPI = axios.create({
    baseURL: `${baseUrl}/api/v1`,
    headers: {'Content-Type':'application/json'},
})