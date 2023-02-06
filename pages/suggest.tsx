import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from "@/src/store";
import { ChangeEvent, useEffect, useState } from "react";
import { setUsername, setToken } from "@/features/auth/authSlice";
import { useRouter } from 'next/router'

export default function Suggest(){
    const [type, setType] = useState<String>("");
    const [category, setCategory] = useState<String>("");
    const [subCategory, setSubCategory] = useState<String>("");
    const [error, setError] = useState<String | null>("");
    const [obscurity, setObscurity] = useState<Number>(1);

    const router = useRouter();

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
            } else { router.push('/login') }
        }
    }, [])

    function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        if (type === "Category" && category !== "" && subCategory !== ""){

        } else {
            setError("All fields must be filled out and valid");
        }
    }

    return (
        <div>
            <div className="w-1/4 bg-white flex flex-col">
                <div>
                    <form className="">

                    </form>
                </div>
            </div>
            {error ? 
            <div className="fixed w-1/5 bg-red-700 rounded-lg h-fit z-40 mx-auto left-[40%] bottom-10">
            <p className="text-center mx-6 py-3 font-bold font-mono select-none">{error}</p>
            <p onClick={() => setError(null)} className="absolute top-1 right-3 rotate-45 font-bold text-xl hover:cursor-pointer">+</p>
            </div>
            : null }
        </div>
    )
}