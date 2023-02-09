import { setError } from "@/features/auth/authSlice";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { AppDispatch } from '@/src/store';
import { useDispatch } from "react-redux";


export default function ProfileView(){
    const router = useRouter();
    const { query = {} } = router || {};
    const { username = undefined } = query || {};

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        (async() => {
            try {
                if (username){
                    
                } else {
                    router.push('/');
                }
            } catch(e: any){
                dispatch(setError(e));
            }
        })()
    }, [])

    return (
        <div className="">
            
        </div>
    )
}