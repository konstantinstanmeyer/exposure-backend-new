import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '@/src/store'
import validate from '@/util/validateUser'
import { useRouter } from "next/router";
import { setError, setEditId } from "@/features/auth/authSlice";
import axios from "axios";

interface Creator {
    username: String,
    imageUrl: string
}

interface Post {
    _id: String,
    title: String,
    category: String,
    subCategory: String,
    description: String,
    creator: Creator,
    imageUrl: string,
    sizing: Number,
    date: Date
}

export default function viewPost(){
    const [title, setTitle] = useState<String>("");
    const [username, setUsername] = useState<String>("");
    const [description, setDescription] = useState<String>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [profileUrl, setProfileUrl] = useState<string>("");

    const router = useRouter();
    const { query = {} } = router || {};
    const { postId = undefined } = query || {};

    const userState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);
    const editId = useSelector((state: RootState) => state.auth.editId);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async() => {
            if(userState && tokenState){
                fetchPost();
            } else if(validate(dispatch)) {
                fetchPost();
            } else {
                router.push('/login');
            }
        })();
    }, [postId])

    async function fetchPost(){
        try {
            if (postId){
                const { data } = await axios.get<Post>(`http://localhost:3001/post/${postId}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')} } );
                setTitle(data.title);
                setDescription(data.description);
                setUsername(data.creator.username);
                setProfileUrl(data.creator.imageUrl);
                setImageUrl(data.imageUrl);
                if (userState === data.creator.username){
                    dispatch(setEditId(data.creator.username));
                }
                console.log(data);
            }
        } catch(e: any) {
            dispatch(setError(e.status + e.message));
            console.log(e);
        }
    }

    return(
        <div className="flex justify-center">
            <div className="w-1/6 flex flex-col justify-center bg-neutral-400 rounded-lg mt-32 relative">
                <div className="w-full px-4 mt-4">
                    <img className="w-full h-full aspect-square object-cover bg-bottom rounded-md border-2 border-neutral-800" src={imageUrl} />
                </div>
                <p>{username}</p>
                <p>{}</p>
            </div>
        </div>
    )
}