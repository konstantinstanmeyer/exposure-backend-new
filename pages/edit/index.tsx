import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from '@/src/store'
import { Post } from '@/features/post/postSlice'
import axios from 'axios';
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { setError } from "@/features/auth/authSlice";

export default function EditPost(){
    const postId = useSelector((state: RootState) => state.posts.editPostId);
    
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (
            async() => {
                setIsLoading(true);
                try {
                    if(postId){
                        const { data } = await axios.get<Post>(`http://localhost:3001/post/${postId}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')} } );
                        console.log(data);
                        setTitle(data.title as string);
                        setDescription(data.description as string);
                        setImageUrl(data.imageUrl as string);
                        setIsLoading(false);
                    } else {
                        router.push('/');
                    }
                } catch(e: any){
                    dispatch(setError(e.message));
                }
            }
        )()
    }, [])

    async function submit(){

    }
 
    return(
        <div className="relative flex flex-col justify-center mt-32 w-1/3 [&>*]:mx-auto">
            <div className="relative w-1/3">
                <p className="text-gray-300 absolute -top-5 text-sm ml-2">title</p>
                <input value={title} onChange={e => setTitle(e.target.value)} className="bg-neutral-400 rounded-lg w-full indent-3 font-bold py-2 !outline-none" />
            </div>
            <div className="relative w-2/3 my-8">
                <p className="text-gray-300 absolute -top-5 text-sm ml-2">description</p>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="bg-neutral-400 rounded-lg pl-3 pr-3 py-2 !outline-none min-h-[10rem] w-full text-sm pavanam" />
            </div>
            <div className="relative w-2/5 mb-2">
            <p className="text-gray-300 absolute -top-5 text-sm ml-2">image</p>
                <img className="rounded-xl aspect-square w-full object-fit bg-bottom" src={imageUrl ? imageUrl : isLoading ? "" : "/no-image.png"} />
            </div>
            <button className="bg-neutral-400 text-neutral-800 rounded-lg px-2 py-1 my-2 text-sm dangrek">change image (png, jpg, jpeg)</button>
            <button onClick={() => submit()} className=""></button>
        </div>
    )
}