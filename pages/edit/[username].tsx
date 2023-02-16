import { useSelector } from "react-redux"
import { RootState } from "@/src/store"
import { useEffect, useState } from "react"

export default function EditUser(){
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const username = useSelector((state: RootState) => state.auth.username)
    const token = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        setIsLoading(true);
        (
            async() => {
                if(username && token) {
                    
                }
            }
        )();
    }, [])

    return(
        <div>

        </div>
    )
}