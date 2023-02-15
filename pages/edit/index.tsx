import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from '@/src/store'
import { Post } from '@/features/post/postSlice'
import axios from 'axios';
import { useEffect } from "react"
import { useRouter } from "next/router";

export default function EditPost(){
    const postId = useSelector((state: RootState) => state.posts.editPostId);

    const router = useRouter();

    useEffect(() => {
        (
            async() => {
                if(postId){
                    const { data } = await axios.get<Post>(`http://localhost:3001/post/${postId}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')} } );
                    console.log(data);
                } else {
                    router.push('/');
                }
            }
        )()
    }, [])

    return(
        <div>
            
        </div>
    )
}