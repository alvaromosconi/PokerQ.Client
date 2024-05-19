import axios from 'axios'
import { authHeader } from './auth-header'

const API_URL = "https://localhost:7098/api/user"

export function getUser() {
    return axios.get(API_URL, { headers: authHeader() })
}