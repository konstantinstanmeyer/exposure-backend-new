import { useSelector } from "react-redux"
import { RootState } from "@/src/store"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router";

interface UserInfo{ 
    email: string;
    pictureUrl: String;
    username: String;
}

export default function EditUser(){
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [imageUrl, setImageUrl] = useState<String>("");
    const [username, setUsername] = useState<String>("");
    const [email, setEmail] = useState<String>("");

    const router = useRouter();

    const usernameState = useSelector((state: RootState) => state.auth.username)
    const tokenState = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        setIsLoading(true);
        (
            async() => {
                if(usernameState && tokenState) {
                    const { data } = await axios.get<UserInfo>(`http://localhost:3001/profile`, {
                        headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
                    });
                    setImageUrl(data.pictureUrl);
                    setUsername(data.username);
                    setEmail(data.email);
                } else {
                    router.push('/');
                }
            }
        )();
    }, [])

    return(
        <div className="w-1/4 bg-white mx-auto flex flex-col mt-32">
            <p>Edit Profile</p>
        </div>
    )
}