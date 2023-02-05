import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../src/store'
import { setUsername, setToken } from '@/features/auth/authSlice'

export default function Navbar(){
    const dispatch = useDispatch<AppDispatch>();

    const username = useSelector((state: any) =>  state.auth.username);

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
            <img className="w-14 mx-12" src="/camera.png" />
            <p className="text-gray-300 font-bold text-3xl">hello{username ? `, ${username}` : "NO"}</p>
            <Link className="ml-auto mx-3 text-gray-300 font-bold mb-1 hover:bg-gray-700 transition-all duration-300 rounded-full px-3 py-1" href="/post">+</Link>
            <Link href="/" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">home</Link>
            <Link href="/friends" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">suggest</Link>
            <p onClick={() => handleLogout()} className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline hover:cursor-pointer">log out</p>
            <img onClick={() => router.push(`/profile`)} className="w-10 ml-5 mr-10 rounded-full hover:cursor-pointer" src="/profile.png" />
        </div>
    )
}