import { useSelector } from "react-redux"
import { RootState } from "@/src/store"
import { useEffect, useState, ChangeEvent } from "react"
import axios from 'axios'
import { useRouter } from "next/router";

interface UserInfo{ 
    email: string;
    pictureUrl: string;
    username: string;
}

export default function EditUser(){
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [file, setFile] = useState<Boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isClicked, setIsClicked] = useState<boolean>(false);

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

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        
    }

    return(
        <div className="w-1/3 bg-neutral-600 mx-auto flex flex-col mt-32 justify-center rounded-lg">
            <p className="text-center dangrek font-bold text-neutral-900 text-3xl my-6">Edit Profile</p>
            <div className="w-2/3 mx-auto">
                <input type="text" placeholder="email..." value={email as string} className="!outline-none py-2 px-3 rounded-lg mb-2 w-full bg-neutral-300"/>
            </div>
            <div className="w-2/3 mx-auto">
                <input type="text" placeholder="username..." value={username as string} className="!outline-none py-2 px-3 rounded-lg my-2 w-full bg-neutral-300"/>
            </div>
            <img className={`${imageUrl === "" ? "invisible" : null} w-3/5 rounded-xl mx-auto aspect-square object-cover bg-center mt-4 mb-2`} src={imageUrl !== "" ? imageUrl : undefined} />
            <form className="w-1/2 flex flex-col justify-center mx-auto" onSubmit={handleSubmit}>
                {isClicked ? 
                    <button onClick={() => setIsClicked(true)} className="w-full mx-auto rounded-md bg-neutral-400 hover:bg-neutral-700 transition-all font-bold text-sm my-2 duration-200">change image</button> :
                    <>
                        <input onChange={() => setFile(true)} type="file" className="mt-2 py-[0.15rem] file:bg-neutral-500 hover:file:bg-neutral-400 mx-auto transitional-all duration-300 file:!outline-none file:rounded-lg text-neutral-800 text-sm px-2 w-4/5"/>
                        {file ? <p className="text-center text-sm font-bold select-none">image attached</p> : <p className="text-center text-sm font-bold select-none">no file</p>}
                    </>
                }
                <button className="bg-neutral-400 w-1/2 mx-auto mt-4 mb-6 rounded-lg hover:bg-neutral-500 transition-all duration-300 font-bold">submit</button>
            </form>
        </div>
    )
}