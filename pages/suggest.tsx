import Navbar from "@/components/Navbar"
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from "@/src/store";
import { useEffect } from "react";
import { setUsername, setToken } from "@/features/auth/authSlice";

export default function Suggest(){
    const userState = useSelector((state: any) =>  state.auth.username);
    const tokenState = useSelector((state: any) =>  state.auth.token);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(!userState || !tokenState){
            const username = localStorage.getItem('username');
            const token = localStorage.getItem('token');
        
            if (username && token) {
                dispatch(setUsername(username));
                dispatch(setToken(token));
            }
            }
    }, [])

    return (
        <div>
            <Navbar />
            <div className="w-1/4 bg-white flex flex-col">
                <div>
                    
                </div>
            </div>
        </div>
    )
}