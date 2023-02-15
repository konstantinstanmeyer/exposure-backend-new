import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from '@/src/store'
import { Post } from '@/features/post/postSlice'
import axios from 'axios';
import { useEffect } from "react"
import { useRouter } from "next/router";

export default function EditPost(){
    const editId = useSelector((state: RootState) => state.auth.editId);

    const router = useRouter();

    useEffect(() => {
        (
            async() => {
                if(editId){
                    const { data } = await axios.get<Post>(`http://localhost:3001/post/${editId}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')} } );
                    
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