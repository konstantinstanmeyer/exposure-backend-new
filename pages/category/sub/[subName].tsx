import Navbar from '@/components/Navbar'
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store';
import validate from "@/util/validateUser"

export default function Sub(){
    const [posts, setPosts] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const username = useSelector((state: any) =>  state.auth.username);
    const token = useSelector((state: any) =>  state.auth.token);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        if(username && token){
            axios.get(`http://localhost:3001/posts/${router.query.category}/${router.query.subName}`, { headers: { "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setPosts(res.data.posts)
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
        } else if(validate(dispatch)){
            axios.get(`http://localhost:3001/posts/${router.query.category}/${router.query.subName}`, { headers: { "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setPosts(res.data.posts)
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
            });
        } else {
            router.push('/login');
        }
    }, [])

    console.log(posts)

    return (
        <div className="relative">
            <Navbar />
            <Link href={`/category/${router.query.category}`} className="absolute top-7 ml-10 bg-white px-5 py-2 flex flex-row items-center space-x-2 rounded-lg">
                <img className="w-8 h-8" src="/back.png" />
                <p className="lg:block md:hidden">Go back to {router.query.category}</p>
            </Link>
            <div className="fixed flex flex-row items-center text-white w-full z-40 top-[7.25rem] h-10 ml-3 select-none">
                <p className="text-gray-900 mx-auto text-center text-3xl rounded-md font-bold bg-white/50 backdrop-blur px-4 py-1">{`${router.query.subName ? router.query.subName : " "}`}</p>
            </div>
            <div className="grid-cols-3 mt-40 mx-auto w-1/2 grid relative pl-5">
                <Link href={`/post/?category=${router.query.category}&sub=${router.query.subName}`} className={`bg-gray-300 hover:bg-gray-500 ${isLoading ? "animate-spin" : null} transition-all duration-200 w-5/6 h-[15rem] my-8 rounded-md relative flex justify-center items-center mx-auto`}>
                    <p className="text-center text-6xl font-light">+</p>
                </Link>
                {posts.length > 0 ? posts.map(post => 
                    <div className={`bg-white w-5/6 h-[15rem] ${post.sizing === 1 ? "h-[15rem]" : "h-[25rem] row-span-2"} my-8 rounded-md relative mx-auto flex justify-center`}>
                        <img src={post.imageUrl} className="w-full h-full rounded-md object-cover bg-bottom absolute" />
                        <p className=" font-bold text-gray-900 absolute mt-2">{post.title}</p>
                        <div className="z-30 h-[30%] w-full bg-gray-300 rounded-br-md rounded-bl-md items-center mt-auto backdrop-blur">
                            <div className="flex flex-row items-center">
                                <img className="w-12 h-12 object-cover rounded-md ml-3" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
                                <div className="flex flex-col">
                                    <Link href={`/user/${post.creator.username}`} className="text-xs mr-auto ml-5 mt-2">@{post.creator.username}</Link>
                                    <p className={`lg:text-sm ml-5 sm:text-xs mr-4 text-gray-900`}>{post.description.length > 0 && post.sizing === 1 ? post.description.slice(0, 32) + "..." : post.sizing === 2 ? post.description.slice(0, 84) + "..." : null} <Link className="text-xs text-blue-800" href={`/view-post/${post._id}`}> view</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ): null}
            </div>
        </div>
    )
}