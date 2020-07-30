import {LOGIN_USER} from './type'
import axios from 'axios'

export function loginUser(reciveSubmitData) {
    const request = axios.post('/api/users/login', reciveSubmitData)
    .then(res => res.data);

    return {
        type : LOGIN_USER,
        payload : request
    }
}