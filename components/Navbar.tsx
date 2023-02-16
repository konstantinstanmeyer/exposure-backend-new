import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../src/store'
import { setUsername, setToken, setError } from '@/features/auth/authSlice'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProfileUrl {
    username: string;
    pictureUrl: string;
}

export default function Navbar(){
    const [imageUrl, setImageUrl] = useState<string>("");
    
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

    useEffect(() => {
        (
            async() => {
                try {
                    const token = localStorage.getItem('token');

                    console.log(token);

                    if (username) {
                        const { data } = await axios.get<ProfileUrl>(`http://localhost:3001/imageUrl`, {
                            headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
                        });
                        setImageUrl(data.pictureUrl);
                    }
                } catch(e: any){
                    console.log(e)
                    dispatch(setError(e.message))
                }
            }
        )();
    }, [username])

    return(
        <div className="h-20 w-screen bg-neutral-800 flex flex-row items-center fixed top-0 z-40">
            <Link href="/">
                <img className="h-16 mx-12 mt-1" src="/logo.png" />
            </Link>
            {/* <p className="text-black invert-[40%] select-none font-bold text-xl">hello {username ? `, ${username}` : null}</p> */}
            { !username ? null :
            <>
                <Link className="ml-auto mx-3 font-bold mb-1 hover:bg-gray-700 transition-all duration-300 rounded-full w-[40px] h-[40px] flex items-center justify-center" href="/post">
                    <p className="mb-[0.25rem] text-black invert-[40%] text-2xl">+</p>
                </Link>
                <Link href="/" className="text-gray-300 text-sm font-mono font-bold mx-5 mt-2 hover:underline">
                    <img className="w-8 h-8 invert-[40%] mx-auto" src="/home.png" />
                    <p className="text-black invert-[40%] text-center text-lg dangrek">home</p>
                </Link>
                <Link href="/suggest" className="text-gray-300 text-sm font-mono font-bold mx-5 mt-2 hover:underline flex flex-col justify-center">
                    <img className="w-8 h-8 invert-[40%] mx-auto" src="/suggestion.png" />
                    <p id="nav-text" className="text-black invert-[40%] text-center nav-text text-lg">suggest</p>
                </Link>
                <p onClick={() => handleLogout()} className={`text-black invert-[40%] ${username ? null : "opacity-0"} text-lg font-mono font-bold mx-5 hover:underline hover:cursor-pointer`} id="nav-text">log out</p>
                <img onClick={() => router.push(`/profile/${username}`)} className="w-12 ml-5 mr-10 rounded-full h-12 object-cover bg-center hover:cursor-pointer" src={imageUrl !== "" ? imageUrl : `/profile.png`} />
            </>
            }
        </div>
    )
}