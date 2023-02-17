import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { AppDispatch, RootState } from '../src/store'
import { setUsername, setToken, setError } from '@/features/auth/authSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import Link from "next/link"

//         email: "asdoiajsd",
//         password: "iuahhf"

export default function Login(){
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");

    const usernameState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if(username && token) {
            dispatch(setUsername(username))
            dispatch(setToken(token))
            router.push('/');
        }
    } ,[])

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_DB_URL + "login", {
                email: email,
                password: password
            })
            
            if(response.status === 200){
                console.log('working')
                const username = response.data.username;
                const token = response.data.token;

                localStorage.setItem("token", token);
                localStorage.setItem("username", username);

                dispatch(setUsername(username));
                dispatch(setToken(token));

                router.push('/');
            } else {
                dispatch(setError("Authentication Failed"));
            }
        } catch(e:any){
            dispatch(setError(e.response.data.message))
        }
    }

    if (usernameState !== null && tokenState !== null) router.push('/');

    return (
        <div className="w-screen h-screen relative justify-center items-center flex">
            <div className="bg-neutral-500 w-1/5 h-2/5 rounded-lg flex flex-col justify-center relative">
                <div className="h-1/3 flex items-center justify-center">
                    <h2 className="mx-auto text-center font-bold md:w-2/3 md:text-2xl sm:text-sm mt-2">Welcome to Exposure</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center w-4/5 mx-auto h-2/3">
                    <div className="w-5/6 h-1/5 mx-auto my-3 relative">
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email..." className="bg-gray-200 w-full h-full placeholder-gray-600 !outline-none rounded-sm indent-2" />
                        {/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) ? null : <p className="absolute w-full text-center -bottom-5 text-xs text-neutral-800 font-bold">*must be a valid email*</p>}
                    </div>
                    <div className="w-5/6 mx-auto h-1/5 my-3 relative">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password..." className="bg-gray-200 placeholder-gray-600 !outline-none h-full w-full rounded-sm indent-2" />
                    </div>
                    <div className="h-1/2 flex items-center justify-center">
                        <button className="bg-neutral-400 transition-all rounded-md duration-300 h-1/2 font-bold w-4/5 mx-auto hover:bg-neutral-600 relative">
                            Sign In
                        </button>
                    </div>
                </form>
                <Link href="/signup" className="absolute text-gray-300 hover:underline -bottom-10 w-full md:text-sm text-center sm:text-xs">Don't have an account? Sign up!</Link>
            </div>
        </div>
    )
}