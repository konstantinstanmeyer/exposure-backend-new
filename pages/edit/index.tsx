import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from '@/src/store'
import { Post } from '@/features/post/postSlice'
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/router";
import { setError } from "@/features/auth/authSlice";
import uploadToS3 from "@/util/uploadToS3";

export default function EditPost(){
    const postId = useSelector((state: RootState) => state.posts.editPostId);
    const username = useSelector((state: RootState) => state.auth.username);
    
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadState, setUploadState] = useState<boolean>(false);
    const [file, setFile] = useState<boolean>(false);
    
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (
            async() => {
                setIsLoading(true);
                try {
                    if(postId && username){
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

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
            
        const key = await uploadToS3(e);

        const token = localStorage.getItem('token');

        if (title !== "" && username && token){
            const response = await axios.post(`http://localhost:3001/edit/${postId}`, {
                title: title,
                username: username,
                imageUrl: key ? "https://exposure-s3-bucket.s3.amazonaws.com/" + key : imageUrl,
                description: description
            }, { headers: { "Authorization": "Bearer " + token } });
            
            if(response.status === 200){
                router.push(`/view-post/${postId}`)
            }
        }
    }
 
    return(
        <div className="relative flex flex-col justify-center mt-32 w-1/3 [&>*]:mx-auto mx-auto">
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
                <img className={`rounded-xl aspect-square w-full object-cover bg-bottom ${isLoading ? "invisible" : null}`} src={imageUrl ? imageUrl : isLoading ? "" : "/no-image.png"} />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                {uploadState ? 
                    <input onChange={() => setFile(true)} accept="image/jpeg image/png" type="file" name="file" className="mt-2 py-[0.15rem] file:bg-neutral-500 hover:file:bg-neutral-400 mx-auto transitional-all duration-300 file:!outline-none file:rounded-lg text-gray-600 text-sm px-2 w-2/5" /> : 
                    <p onClick={() => setUploadState(state => !state)} className="bg-neutral-400 hover:cursor-pointer text-neutral-800 rounded-lg px-2 py-1 my-2 text-sm dangrek w-2/3 text-center mx-auto">add new image (png, jpg, jpeg)</p>
                }
                {file ? <p className="text-sm text-center text-gray-600">*new file attached*</p> : null}
                <button type="submit" className="font-bold bg-neutral bg-neutral-700 text-neutral-400 py-2 max-w-[50%] mx-auto rounded-lg px-2 mt-3">submit changes</button>
            </form>
        </div>
    )
}