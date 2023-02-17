import { setError } from "@/features/auth/authSlice";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from '@/src/store';
import { useDispatch, useSelector } from "react-redux";
import validate from "@/util/validateUser";
import { setAdmin } from "@/features/admin/adminSlice";
import axios from "axios";
import Link from 'next/link';

interface Post {

}


export default function ProfileView(){
    const [isUser, setIsUser] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [email, setEmail] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    const router = useRouter();
    const { query = {} } = router || {};
    const { username = undefined } = query || {};

    const dispatch = useDispatch<AppDispatch>();

    const usernameState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);
    const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);

    useEffect(() => {
        setIsLoading(true);
        if(!usernameState || !tokenState){
            if (validate(dispatch)){
                fetchUser();
            } else {
                router.push('/login')
            }
        } else {
            fetchUser();
        }
    }, [])

    async function fetchUser(){
        try {
            if (username){
                const response: any = await axios.get(`http://localhost:3001/profile/${username}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                if (response.status === 200) {
                    if (response.data.username === usernameState){
                        setIsUser(true);
                    }
                    if (usernameState === username && response.data.admin){
                        dispatch(setAdmin(true));
                    }
                    setEmail(response.data.email);
                    setImageUrl(response.data.pictureUrl);
                    setPosts(response.data.posts);
                    console.log(response.data);
                    setIsLoading(false);
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
    }

    if (isLoading) return (
    <div className="absolute h-full w-full">
        <div className={`mt-36 w-1/2 bg-neutral-700 ${isLoading ? "animate-pulse" : null} h-1/2 mx-auto flex flex-row relative rounded-xl`}>
            <div className={`w-1/3 h-full bg-neutral-700 ${isLoading ? "animate-pulse" : null} rounded-l-xl flex flex-col items-center`}/>
            <div className={`w-2/3 h-full bg-neutral-600 ${isLoading ? "animate-pulse" : null} rounded-xl`}/>
        </div>
    </div>)

    return (
        <div className="absolute h-full w-full">
            <div className="mt-36 w-1/2 bg-neutral-700 h-1/2 mx-auto flex flex-row relative rounded-xl">
                <div className="w-1/3 bg-neutral-700 rounded-l-xl flex items-center flex-col relative">
                    <img className="w-2/3 rounded-full aspect-square object-cover bg-bottom mx-5 mt-auto" src={imageUrl ? imageUrl : "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"} />
                    <p className="w-fit mb-auto dangrek text-neutral-900 text-xl text-center">@{username}</p>
                    {isUser ? <button onClick={() => router.push('/profile')} className="absolute bottom-5 w-1/4 text-center rounded-lg text-neutral-400 dangrek bg-neutral-900 transition-auto duration-300 hover:bg-neutral-400 hover:text-neutral-900">edit</button> : null}
                </div>
                <div className="w-2/3 bg-neutral-600 rounded-xl justify-center flex flex-col overflow-y-scroll">
                    <p className="w-full text-3xl font-bold dangrek h-1/5 items-center flex justify-center underline underline-offset-4">recent posts</p>
                    <div className="w-full h-4/5 bg-neutral-600 rounded-xl justify-center flex flex-wrap overflow-y-scroll">
                        {posts.length > 0 ? posts.map((post: any, i) =>
                        <div key={i + " " + post} className="w-5/6 h-1/3 bg-white my-5 rounded-lg flex">
                            <img className="h-[80%] aspect-square object-cover bg-bottom rounded-lg my-auto ml-3" src={post.imageUrl} />
                            <div className="w-3/4 ml-3 mr-2 h-[90%] my-auto overflow-y-scroll">
                                <p className="dangrek font-bold text-lg">{post.title}</p>
                                <p className="pavanam text-sm">{post.description.length > 60 ? post.description.slice(0,70) : post.description}<Link className="text-xs text-blue-800" href={`/view-post/${post._id}`}> more</Link></p>
                            </div>
                        </div>) : null}
                    </div>
                </div>
            </div>
            {isAdmin ?
            <Link href="/admin" className="absolute w-20 h-20 bg- z-40 top-32 right-8 flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
                <p className="dangrek text-xl text-center">admin view</p>
            </Link> : null}
        </div>
    )
}