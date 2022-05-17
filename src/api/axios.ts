import axios from 'axios';
import { API_BASE_URL } from './config';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
export default instance;