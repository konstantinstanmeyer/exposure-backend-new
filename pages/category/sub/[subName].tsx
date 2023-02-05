import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Sub(){
    const router = useRouter();

    useEffect(() => {
        console.log(router);
    }, [])

    return (
        <div className="relative">
            <Navbar />
            <div className="grid-cols-3 mt-40 mx-auto w-1/2 grid">
                <Link href={`/post?category=${"yes"}`} className="bg-gray-300 hover:bg-gray-500 transition-all duration-200 w-5/6 h-[15rem] my-4 rounded-md relative flex justify-center items-center">
                    <p className="text-center text-6xl font-light">+</p>
                </Link>
                <div className="bg-white w-5/6 h-[15rem] my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[25rem] row-span-2 my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[25rem] row-span-2 my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[25rem] row-span-3 my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[15rem] my-4 rounded-md" />
            </div>
        </div>
    )
}