import { setUsername, setToken } from '@/features/auth/authSlice'
import { AppDispatch } from '../src/store'

export default function validate(username: String | null, token: String | null, dispatch: AppDispatch){
    const localUsername = localStorage.getItem('username');
    const localToken = localStorage.getItem('token');

    if (username && token){
        return true;
    } else if(localUsername && localToken){
        dispatch(setUsername(localUsername));
        dispatch(setToken(localToken));

        return true;
    } else {
        return false;
    }
}