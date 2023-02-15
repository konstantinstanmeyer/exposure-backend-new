import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '@/src/store'
import validate from '@/util/validateUser'
import { useRouter } from "next/router";
import { setError } from "@/features/auth/authSlice";
import { Post, setEditPostId } from "@/features/post/postSlice";
import axios from "axios";
import Link from "next/link";

export default function viewPost(){
    const [title, setTitle] = useState<String>("");
    const [username, setUsername] = useState<String>("");
    const [description, setDescription] = useState<String>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [profileUrl, setProfileUrl] = useState<string>("");
    const [date, setDate] = useState<string | Date>("");
    const [category, setCategory] = useState<String>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();
    const { query = {} } = router || {};
    const { postId = undefined } = query || {};

    const userState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);
    const editId = useSelector((state: RootState) => state.posts.editPostId);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(router.isReady){
            if (postId){
                if(userState && tokenState){
                    fetchPost();
                } else if(validate(dispatch)) {
                    fetchPost();
                } else {
                    router.push('/login');
                }
            } else {
                router.push('/')
            }
        }
    }, [postId, router.isReady])

    async function fetchPost(){
        try {
            if (postId){
                const { data } = await axios.get<Post>(`http://localhost:3001/post/${postId}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')} } );
                setTitle(data.title);
                setDescription(data.description);
                setUsername(data.creator.username);
                setProfileUrl(data.creator.pictureUrl);
                setImageUrl(data.imageUrl);
                setCategory(data.category);
                setDate(new Date(data.date).toString().split(' ').slice(0,4).join(' '))
                if (userState === data.creator.username || localStorage.getItem('username') === data.creator.username){
                    dispatch(setEditPostId(data._id));
                }
                // console.log(data);
                setIsLoading(false);
            } else {
                router.push('/')
            }
        } catch(e: any) {
            dispatch(setError(e.status + e.message));
            // console.log(e);
        }
    }

    // console.log(profileUrl)

    return(
        <div className="flex justify-center">
            <div className="w-56 flex flex-col justify-center rounded-lg mt-32 relative">
                <div className="w-full h-10 flex flex-row items-center">
                    <img className={`w-8 mx-2 h-8 rounded-full bg-neutral-800 ${isLoading ? "animate-pulse" : null}`} src={profileUrl === "" || !profileUrl ? "/profile.png" : profileUrl} />
                    <div className="flex flex-col items-center">
                        <Link className="text-sm text-gray-300 font-bold" href={username === "" || !username ? "/" : `/profile/${username}`}>@{username}</Link>
                        <p className="text-gray-300 text-xs -ml-4">{`${date}`}</p>
                    </div>
                </div>
                <img className={`w-56 h-56 bg-neutral-800 ${isLoading ? "invisible" : null} aspect-square object-cover bg-bottom rounded-xl my-1`} src={imageUrl} />
                <p className={`text-gray-300 font-bold rounded-lg text-lg min-w-10 items-center ${isLoading ? "bg-neutral-800 my-1 animate-pulse" : null}`}>
                    {title}
                    {" "}
                    {editId ? <Link className="hover:bg-gray-600 transition-all duration-300 text-sm bg-gray-300 text-neutral-800 text-center px-2 py-1 rounded-lg" href={`/edit`}>edit</Link> : null}
                </p>
                <p id="post-description" className={isLoading ? "w-56 h-40 -mt-1 animate-pulse bg-neutral-800" : "text-gray-300 text-md -mt-1 w-72 rounded-lg"}>{description}</p>
                <Link href={`/category/${category}`} className="text-blue-500 text-sm">Discover this category</Link>
            </div>
        </div>
    )
}