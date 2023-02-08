import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../src/store'
import { setUsername, setToken } from '@/features/auth/authSlice'
import { useEffect } from 'react';
import verify from "@/util/validateUser"

export default function Navbar(){
    const dispatch = useDispatch<AppDispatch>();

    const username = useSelector((state: any) =>  state.auth.username);
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        if(!username || !token){
            const localUsername = localStorage.getItem('username');
            const localToken = localStorage.getItem('token');

            if (username && token) {
                dispatch(setUsername(localUsername));
                dispatch(setToken(localToken));
            } else { router.push('/login') }
        }
    }, [])

    const router = useRouter();

    async function handleLogout(){
        dispatch(setUsername(null));
        dispatch(setToken(null));

        localStorage.removeItem('username');
        localStorage.removeItem('token');

        router.push('/login');
    }

    return(
        <div className="h-20 w-screen bg-neutral-800 flex flex-row items-center fixed top-0 z-40">
            <Link href="/">
                <img className="h-16 mx-12 mt-1" src="/logo.png" />
            </Link>
            <p className="text-black invert-[40%] select-none font-bold text-xl">hello {username ? `, ${username}` : null}</p>
            <Link className="ml-auto mx-3 font-bold mb-1 hover:bg-gray-700 transition-all duration-300 rounded-full w-[30px] h-[30px] flex items-center justify-center" href="/post">
                <p className="mb-[0.15rem] text-black invert-[40%]">+</p>
            </Link>
            <Link href="/" className="text-gray-300 text-sm font-mono font-bold mx-5 mt-2 hover:underline">
                <img className="w-8 h-8 invert-[40%] mx-auto" src="/suggestion.png" />
                <p className="text-black invert-[40%] text-center">home</p>
            </Link>
            <Link href="/suggest" className="text-gray-300 text-sm font-mono font-bold mx-5 mt-2 hover:underline flex flex-col justify-center">
                <img className="w-8 h-8 invert-[40%] mx-auto" src="/suggestion.png" />
                <p className="text-black invert-[40%] text-center">suggest</p>
            </Link>
            <p onClick={() => handleLogout()} className="text-black invert-[40%] text-sm font-mono font-bold mx-5 hover:underline hover:cursor-pointer">log out</p>
            <img onClick={() => router.push(`/profile/${username}`)} className="w-10 ml-5 mr-10 rounded-full hover:cursor-pointer" src="/profile.png" />
        </div>
    )
}