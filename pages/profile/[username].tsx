import { useRouter } from "next/router"
import { useEffect } from "react";

export default function ProfileView(){
    const router = useRouter();
    const { query = {} } = router || {};
    const { username = undefined } = query || {};

    useEffect(() => {
        (async() => {
            
        })()
    }, [])

    return (
        <div className="">
            
        </div>
    )
}