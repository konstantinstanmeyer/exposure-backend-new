import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { AppDispatch, RootState } from '../src/store'
import { AxiosResponse } from "axios"
import { setUsername, setToken, setError } from '@/features/auth/authSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import Link from 'next/link'

//         email: "asdoiajsd",
//         password: "iuahhf"

export default function Signup(){
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [confirmPassword, setConfirmPassword] = useState<any>("");

    const usernameState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        console.log(username)

        if(username && token) {
            dispatch(setUsername(username))
            dispatch(setToken(token))
            // router.push('/');
        }
    } ,[])

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        let response: AxiosResponse;

        if(password === "" || email === ""){
            return dispatch(setError("All fields must be filled"));
        }else if(password === confirmPassword){
            response = await axios.post("http://localhost:3001/signup", {
            email: email,
            password: password
            })
        } else {
            dispatch(setError("Passwords must be the same"));
            return;
        }
        
        if(!response?.data.message && response.status === 200){
            const username = response.data.username;
            const token = response.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("username", username);

            dispatch(setUsername(username));
            dispatch(setToken(token));

            router.push('/');
        } else if(response?.data?.message){
            dispatch(setError(response.data.message));
        } else {
            dispatch(setError("Authentication Failed"));
        }
    }

    if (usernameState !== null && tokenState !== null) router.push('/');

    return (
        <div className="w-screen h-screen relative justify-center items-center flex">
            <div className="bg-neutral-600 w-1/5 h-1/2 rounded-lg flex flex-col justify-center relative">
                <div className="h-1/5 flex items-center justify-center">
                    <h2 className="text-center font-bold md:w-2/3 md:text-2xl sm:text-sm mt-5">Sign Up</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center w-4/5 mx-auto h-4/5">
                    <div className="w-5/6 my-4 mx-auto relative">
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email..." className="bg-neutral-400 w-full placeholder-neutral-700 text-neutral-900 !outline-none rounded-md indent-3 h-10" />
                        {/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) ? null : <p className="absolute w-full text-center -bottom-5 text-xs text-red-500 font-bold">*must be a valid email*</p>}
                    </div>
                    <div className="w-5/6 my-4 mx-auto relative">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password..." className="bg-neutral-400 w-full placeholder-neutral-700 text-neutral-900 !outline-none rounded-md indent-3 h-10" />
                        {password.length > 4 ? null : <p className="absolute w-full text-center -bottom-5 text-xs text-red-500 font-bold">*5+ characters*</p>}
                    </div>
                    <div className="w-5/6 my-4 mx-auto relative">
                        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="confirm password..." className="bg-neutral-400 placeholder-neutral-700 text-neutral-900 w-full !outline-none rounded-md indent-3 h-10" />
                        {password.length > 4 && password === confirmPassword ? null : <p className="absolute w-full text-center -bottom-5 text-xs text-red-500 font-bold">*passwords must match*</p>}
                    </div>
                    <div className="h-1/4 flex items-center justify-center">
                        <button className="bg-neutral-800 text-neutral-400 transition-all rounded-md duration-300 h-1/2 font-bold w-4/5 mx-auto hover:bg-neutral-700 relative">
                            Confirm
                        </button>
                    </div>
                </form>
                <Link href="/login" className="absolute text-gray-300 hover:underline -bottom-10 w-full md:text-sm text-center sm:text-xs">Already have an account? Log in!</Link>
            </div>
        </div>
    )
}