import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function Sub(){
    const [category, setCategory] = useState<String | undefined | String[]>("")
    const [subName, setSubName] = useState<String | undefined | String[]>("");

    const router = useRouter();

    useEffect(() => {
        console.log(router);

        setCategory(router.query.category);
        setSubName(router.query.subName);


    }, [])

    return (
        <div className="relative">
            <Navbar />
            <div className="fixed flex flex-row items-center text-white w-full z-40 top-[7.25rem] h-10 ml-3 select-none">
                <p className="text-gray-900 mx-auto text-center text-3xl rounded-md font-bold bg-white/50 backdrop-blur px-4 py-1">{`${subName}`}</p>
            </div>
            <div className="grid-cols-3 mt-40 mx-auto w-1/2 grid relative pl-5">
                <Link href={`/post/?category=${category}&sub=${subName}`} className="bg-gray-300 hover:bg-gray-500 transition-all duration-200 w-5/6 h-[15rem] my-8 rounded-md relative flex justify-center items-center mx-auto">
                    <p className="text-center text-6xl font-light">+</p>
                </Link>
                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md relative mx-auto">
                    <img src="https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" className="w-full h-full rounded-md" />
                </div>
                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[25rem] row-span-2 my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[25rem] row-span-2 my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[25rem] row-span-2 my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[25rem] row-span-2 my-8 rounded-md mx-auto" />
                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md mx-auto" />

                <div className="bg-white w-5/6 h-[15rem] my-8 rounded-md mx-auto" />

            </div>
        </div>
    )
}