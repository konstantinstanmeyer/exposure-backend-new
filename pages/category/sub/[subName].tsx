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
            <Link href={`/category/${router.query.category}`} className="absolute top-1 ml-10 bg-gray-300 px-5 py-2 flex flex-row items-center space-x-2 rounded-lg">
                <img className="w-8 h-8" src="/back.png" />
                <p className="lg:block md:hidden dangrek text-lg">Go back to {router.query.category}</p>
            </Link>
            <div className="fixed flex flex-row items-center text-white w-full z-40 top-[7.25rem] h-10 ml-3 select-none">
                <p className="text-black mx-auto text-center text-3xl rounded-md font-bold bg-white/50 backdrop-blur px-4 py-1 dangrek">{`${router.query.subName ? router.query.subName : " "}`}</p>
            </div>
            <div className="lg:grid-cols-3 md:grid-cols-2 mt-40 mx-auto w-2/3 grid relative pl-5">
                <Link href={`/post/?category=${router.query.category}&sub=${router.query.subName}`} className={`bg-gray-300 hover:bg-gray-500 ${isLoading ? "animate-spin" : null} transition-all duration-200 w-64 h-[15rem] my-8 rounded-md relative flex justify-center items-center mx-auto`}>
                    <p className="text-center text-6xl font-light">+</p>
                </Link>
                {posts.length > 0 ? posts.map(post => 
                    <div className={`bg-white w-64 h-[15rem] ${post.sizing === 1 ? "h-[15rem]" : "h-[25rem] row-span-2"} my-8 rounded-md relative flex mx-auto justify-center`}>
                        <img src={post.imageUrl} className="w-full h-2/5 rounded-md object-cover absolute" />
                        <div className="z-30 h-3/5 w-full flex flex-col bg-gray-400 rounded-br-md rounded-bl-md items-center mt-auto backdrop-blur">
                            <p className=" font-bold text-lg text-gray-900 mt-2 dangrek">{post.title}</p>
                            <p className={`lg:text-base ml-5 sm:text-xs mr-4 pavanam text-gray-900/90`}>{post.description.length > 0 && post.sizing === 1 ? post.description.slice(0, 32) + "..." : post.sizing === 2 ? post.description.slice(0, 84) + "..." : null} <Link className="text-xs text-blue-800" href={`/view-post/${post._id}`}> more</Link></p>
                            <img className="w-12 h-12 object-cover rounded-md" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
                            <Link href={`/user/${post.creator.username}`} className="text-sm mr-auto ml-5 mt-2">@{post.creator.username}</Link>
                        </div>
                    </div>
                ): null}
            </div>
        </div>
    )
}