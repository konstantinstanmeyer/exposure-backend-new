import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/src/store"
import { useEffect, useState, ChangeEvent } from "react"
import { setUsername } from "@/features/auth/authSlice"
import axios from 'axios'
import { useRouter } from "next/router";
import uploadToS3 from "@/util/uploadToS3";
import { setError } from "@/features/auth/authSlice";

interface UserInfo{ 
    email: string;
    pictureUrl: string;
    username: string;
}

export default function EditUser(){
    const [file, setFile] = useState<Boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [localUsername, setLocalUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    const usernameState = useSelector((state: RootState) => state.auth.username)
    const tokenState = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        (
            async() => {
                if(usernameState && tokenState) {
                    const { data } = await axios.get<UserInfo>(process.env.NEXT_PUBLIC_DB_URL + 'profile', {
                        headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
                    });
                    setImageUrl(data.pictureUrl);
                    setLocalUsername(data.username);
                    setEmail(data.email);
                } else {
                    router.push('/');
                }
            }
        )();
    }, [])

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const key = await uploadToS3(e);

        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)){
            return dispatch(setError("Must be a valid email address"))
        } else if(localUsername.length < 5){
            return dispatch(setError("Username must be at least 5 characters"))
        }

        try{
            const response = await axios.post<UserInfo>(process.env.NEXT_PUBLIC_DB_URL + 'profile', {
                email: email,
                imageUrl: key ? "https://exposure-s3-bucket.s3.amazonaws.com/" + key : imageUrl,
                username: localUsername
            }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') }})

            console.log(response);

            if (response.status === 200){
                localStorage.setItem('username', localUsername);
                dispatch(setUsername(localUsername));
                router.push(`/profile/${localUsername}`);
            }
        } catch(e: any){
            dispatch(setError(e.message));
        }
    }

    return(
        <div className="w-1/4 bg-neutral-600 mx-auto flex flex-col mt-32 justify-center rounded-lg">
            <p className="text-center dangrek font-bold text-neutral-900 text-3xl my-6">Edit Profile</p>
            <div className="w-2/3 mx-auto relative">
                <p className="absolute -top-5 text-neutral-300 font-bold ml-2">email</p>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder="email..." value={email as string} className="!outline-none py-2 px-3 rounded-lg mb-7 mt-1 w-full bg-neutral-300"/>
                {regex.test(email) ? null : <p className="absolute w-full text-center bottom-[0.62rem] text-xs text-red-500">*must be a valid email*</p>}
            </div>
            <div className="w-2/3 mx-auto relative">
                <p className="absolute -top-4 text-neutral-300 font-bold ml-2">username</p>
                <input onChange={e => setLocalUsername(e.target.value)} type="text" placeholder="username..." value={localUsername as string} className="!outline-none py-2 px-3 rounded-lg mt-2 mb-4 w-full bg-neutral-300"/>
                {localUsername.length > 4 ? null : <p className="absolute w-full text-center -bottom-[0.15rem] text-xs text-red-500">*5+ characters*</p>}
            </div>
            <img className={`${imageUrl === "" ? "hidden" : null} w-3/5 rounded-xl mx-auto aspect-square object-cover bg-center mt-4 mb-2`} src={imageUrl !== "" ? imageUrl : undefined} />
            {imageUrl === "" ? <p className="w-fit mx-auto px-2 rounded-sm dangrek text-xl text-neutral-400 bg-neutral-800">no image</p> : null}
            <form className="w-1/2 flex flex-col justify-center mx-auto" onSubmit={handleSubmit}>
                {isClicked ? 
                    <button onClick={() => setIsClicked(true)} className="w-full mx-auto rounded-md bg-neutral-400 hover:bg-neutral-700 transition-all font-bold text-sm my-2 duration-200">change image</button> :
                    <>
                        <input onChange={() => setFile(true)} type="file" name="file" className="mt-2 py-[0.15rem] file:bg-neutral-500 hover:file:bg-neutral-400 mx-auto transitional-all duration-300 file:!outline-none file:rounded-lg text-neutral-800 text-sm px-2 w-4/5"/>
                        {file ? <p className="text-center text-sm font-bold select-none">image attached</p> : <p className="text-center text-sm font-bold select-none">no file</p>}
                    </>
                }
                <button type="submit" className="bg-neutral-400 w-1/2 mx-auto mt-4 mb-6 rounded-lg hover:bg-neutral-500 transition-all duration-300 font-bold">submit</button>
            </form>
        </div>
    )
}