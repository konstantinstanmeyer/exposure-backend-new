import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';
import validate from "@/util/validateUser"
import { fetchPosts } from '@/features/post/postSlice';

export default function Sub(){
    const username = useSelector((state: RootState) =>  state.auth.username);
    const token = useSelector((state: RootState) =>  state.auth.token);
    const posts = useSelector((state: RootState) => state.posts.posts);
    const status = useSelector((state: RootState) => state.posts.status);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    useEffect(() => {
        if (router.isReady){
            if(username && token){
                dispatch(fetchPosts({ token: localStorage.getItem('token') as string, category: router.query.category, subCategory: router.query.subName }));
                console.log("reached")
            } else if (validate(dispatch)){
                console.log(posts)
                dispatch(fetchPosts({ token: localStorage.getItem('token') as string, category: router.query.category, subCategory: router.query.subName }));
            }
        }
    }, [router.isReady])

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
                <Link href={`/post/?category=${router.query.category}&sub=${router.query.subName}`} className={`bg-gray-300 hover:bg-gray-500 ${status === 'loading' ? "animate-pulse" : null} transition-all duration-200 w-64 h-[15rem] my-8 rounded-md relative flex justify-center items-center mx-auto`}>
                    <p className="text-center text-6xl font-light">+</p>
                </Link>
                {status === 'loading' ? 
                <>
                    <div className={`bg-gray-300 hover:bg-gray-500 animate-pulse transition-all duration-200 w-64 h-[15rem] my-8 rounded-md relative flex justify-center items-center mx-auto`}/>
                    <div className={`bg-gray-300 hover:bg-gray-500 animate-pulse transition-all duration-200 w-64 h-[15rem] my-8 rounded-md relative flex justify-center items-center mx-auto`}/>
                </>
                : null}
                {posts.length > 0 ? posts.map((post, i) => 
                    <div key={i} className={`bg-white w-64 ${post.sizing === 1 ? "h-[15rem]" : "h-[25rem] row-span-2"} my-8 rounded-md relative flex mx-auto justify-center`}>
                        <img src={post.imageUrl} className="w-full h-2/5 rounded-t-md object-cover absolute" />
                        <div className="z-30 h-3/5 w-full flex flex-col bg-gray-300 rounded-br-md rounded-bl-md items-center mt-auto">
                            <div className="w-4/5 h-1/6 flex items-center">
                                <p className="w-full mt-2 font-bold text-lg text-gray-900 dangrek mx-auto">{post.title}</p>
                            </div>
                            <p className={`lg:text-base w-4/5 mx-auto ${post.sizing === 1 ? "h-3/6" : "h-3/5"} sm:text-xs pavanam text-gray-900/90`}>{post.description.length > 0 && post.sizing === 1 ? post.description.slice(0, 60) + "..." : post.sizing === 2 ? post.description.slice(0, 140) + "..." : null} <Link className="text-xs text-blue-800" href={`/view-post/${post._id}`}> more</Link></p>
                            <div className={`${post.sizing === 1 ? "h-2/6 [&>*]:mt-1" : "h-2/5 [&>*]:mt-2"} w-4/5 flex`}>
                                    <img className="h-9 w-9 object-cover rounded-md" src={post.creator.pictureUrl !== "" ? post.creator.pictureUrl : "/profile.png"} />
                                    <Link href={`/profile/${post.creator.username}`} className="text-gray-900/90 dangrek font-bold text-sm h-fit ml-2">@{post.creator.username}</Link>
                            </div>
                        </div>
                    </div>
                ): null}
            </div>
        </div>
    )
}