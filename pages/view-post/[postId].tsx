import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '@/src/store'
import validate from '@/util/validateUser'
import { useRouter } from "next/router";
import { setError, setEditId } from "@/features/auth/authSlice";
import axios from "axios";

interface Creator {
    username: String,
    imageUrl: String
}

interface Post {
    _id: String,
    title: String,
    category: String,
    subCategory: String,
    description: String,
    creator: Creator,
    imageUrl: String,
    sizing: Number,
    date: Date
}

export default function viewPost(){
    const [title, setTitle] = useState<String>("");
    const [username, setUsername] = useState<String>("");
    const [description, setDescription] = useState<String>("");
    const [imageUrl, setImageUrl] = useState<String>("");
    const [profileUrl, setProfileUrl] = useState<String>("");

    const router = useRouter();
    const { query = {} } = router || {};
    const { postId = undefined } = query || {};

    const userState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);
    const editId = useSelector((state: RootState) => state.auth.editId);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async() => {
            if(!userState || !tokenState){
                if (!validate(dispatch)){
                    router.push('/login')
                } else {
                    // fetchPost(postId);
                }
            } else {
                // fetchPost(postId);
            }
        })();
    }, [])

    async function fetchPost(){
        try {
            if (postId){
                const { data } = await axios.get<Post>('http://localhost:3001', { headers: { "Authorization": "Bearer " + localStorage.getItem('token')} } );
                setTitle(data.title);
                setDescription(data.description);
                setUsername(data.creator.username);
                setProfileUrl(data.creator.imageUrl);
                setImageUrl(data.imageUrl);
                if (userState === data.creator.username){
                    dispatch(setEditId(data.creator.username));
                }
            }
        } catch(e: any){
            dispatch(setError(e.status + e.message));
        }


    }

    return(
        <div className="">

        </div>
    )
}