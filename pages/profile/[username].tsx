import { setError } from "@/features/auth/authSlice";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { AppDispatch } from '@/src/store';
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setToken } from '@/features/auth/authSlice'
import axios from "axios";

interface Post {

}


export default function ProfileView(){
    const [isUser, setIsUser] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [email, setEmail] = useState<string>("");
    const [pictureUrl, setPictureUrl] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const router = useRouter();
    const { query = {} } = router || {};
    const { username = undefined } = query || {};

    const dispatch = useDispatch<AppDispatch>()

    const usernameState = useSelector((state: any) =>  state.auth.username);
    const tokenState = useSelector((state: any) =>  state.auth.token);

    useEffect(() => {
        if(!usernameState || !tokenState){
            const localUsername = localStorage.getItem('username');
            const localToken = localStorage.getItem('token');

            if (localUsername && localToken) {
                dispatch(setUsername(localUsername));
                dispatch(setToken(localToken));
            } else { router.push('/login') }
        }

        (async() => {
            try {
                if (username){
                    const response: any = await axios.get(`http://localhost:3001/profile/${username}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                    if (response.status === 200) {
                        if (response.data.username === usernameState){
                            setIsUser(true);
                            setEmail(response.data.email);
                            setPictureUrl(response.data.imageUrl);
                            setIsAdmin(response.data.isAdmin);
                            setPosts(response.data.posts);
                            console.log(response.data);
                        }
                    } else {
                        console.log(response);
                        dispatch(setError(response));
                    }
                } else {
                    router.push('/');
                }
            } catch(e: any){
                dispatch(setError(e));
            }
        })()
    }, [])

    return (
        <div className="">
            {isUser ? 
            <>
                <div className="mt-32">
                    hello
                </div>
            </> :
            <>
                
            </>
            }
            {isAdmin ? 
            <>

            </> :
            <>
            
            </>}
        </div>
    )
}