import { useRouter } from 'next/router'
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Category(){
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [obscurity, setObscurity] = useState<string | number | readonly string[] | undefined>(1);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    let categoryName;

    const router = useRouter();

    console.log(router.pathname)

    useEffect(() => {
        categoryName = router.query?.categoryName;

        if (!categoryName) router.push('/');
    }, [])

    async function submitCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        axios.post('http://localhost:3001/add-category', {
            name: category,
            imageUrl: imageUrl,
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    async function submitSubCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        axios.post('http://localhost:3001/add-sub-category', {
            name: category,
            imageUrl: imageUrl,
            category: "Farming",
            obscurity: obscurity
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    return(
        <div className="relative w-screen">
            <Navbar />
            <div className="w-1/2 mt-20 grid grid-cols-2 mx-auto relative">
                <Link href="/hello" className={`h-72 w-72 mt-16 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                    <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>equipment</p>
                    <img src={isLoading ? "" : "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1989&q=80"} className={`w-full h-full rounded-full object-cover h-full`} />
                </Link>
                <Link href="/hello" className={`h-72 w-72 mt-16 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                    <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>equipment</p>
                    <img src={isLoading ? "" : "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1989&q=80"} className={`w-full h-full rounded-full object-cover h-full`} />
                </Link>
                <Link href="/hello" className={`h-72 w-72 mt-16 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                    <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>equipment</p>
                    <img src={isLoading ? "" : "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1989&q=80"} className={`w-full h-full rounded-full object-cover h-full`} />
                </Link>
                <Link href="/hello" className={`h-72 w-72 mt-16 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                    <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>equipment</p>
                    <img src={isLoading ? "" : "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1989&q=80"} className={`w-full h-full rounded-full object-cover h-full`} />
                </Link>
            </div>
            <p className="text-white text-center mt-14">hello</p>
        </div>
    )
}

{/* <form onSubmit={submitSubCategory}>
    <input value={category} onChange={(e) => setCategory(e.target.value)} />
    <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
    <input type="number" value={obscurity} onChange={(e: ChangeEvent<HTMLInputElement>) => setObscurity(e.target.value)} />
    <button className="text-white" type="submit">submit</button>
</form> */}