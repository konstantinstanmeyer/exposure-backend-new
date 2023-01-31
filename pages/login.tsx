import { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"

// axios.post('http://localhost:3001/login', {
//         email: "asdoiajsd",
//         password: "iuahhf"
//       })
//       .then(res => {
//         localStorage.setItem('username', res.data.username);
//         localStorage.setItem('token', res.data.token);

//         dispatch(setUsername(res.data.username));
//         dispatch(setToken(res.data.token));
//       })

export default function Login(){
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("username") && localStorage.getItem("token")) router.push('/');


    } ,[])

    return (
        <div className="w-screen h-screen relative justify-center items-center flex">
            <div className="bg-gray-400 w-1/5 h-1/2 rounded-lg flex flex-col justify-center">
                <h2 className="mx-auto text-center font-bold text-2xl mb-4 sm:w-1/3 md:w-1/2">Welcome to Exposure</h2>
                <form className="flex flex-col justify-center w-4/5 mx-auto">
                    <input placeholder="email..." className="bg-gray-200 placeholder-gray-600 !outline-none rounded-sm indent-2 py-1 my-2" />
                    <input type="password" placeholder="password..." className="bg-gray-200 placeholder-gray-600 !outline-none rounded-sm indent-2 py-1 my-2" />
                    <button className="bg-gray-500 transition-all rounded-md duration-300 p-1 font-bold mt-4 w-4/5 mx-auto hover:bg-gray-600 relative">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}