import { setUsername, setToken } from '@/features/auth/authSlice'
import { AppDispatch } from '../src/store'

export default function validate(dispatch: AppDispatch){
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if(username && token){
        dispatch(setUsername(username));
        dispatch(setToken(token));

        return true;
    } else {
        return false;
    }
}