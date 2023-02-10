import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../src/store'
import { setUsername, setToken } from "@/features/auth/authSlice"
import validate from '@/util/validateUser';

async function uploadToS3(e: ChangeEvent<HTMLFormElement>){
    const formData = new FormData(e.target);

    const file: any = formData.get("file");

    if (!file) return null;

    // @ts=ignore

    const fileType = encodeURIComponent(file.type);

    const { data } = await axios.get(`/api/s3?type=${fileType}`);

    const { uploadUrl, key } = data;

    await axios.put(uploadUrl, file);

    return key;
}

export default function Post(){
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<any>("");
    const [sub, setSub] = useState<any>("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<null | String>(null);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    const userState = useSelector((state: any) =>  state.auth.username);
    const tokenState = useSelector((state: any) =>  state.auth.token);

    useEffect(() => {
        if(!userState || !tokenState){
            if (!validate(dispatch)){
                router.push('/login')
            }
        }

        if (router.query.category && router.query.sub){
            const categoryInput = document.querySelector('#cat-input') as HTMLInputElement;
            const subInput = document.querySelector('#sub-input') as HTMLInputElement;
            
            categoryInput.disabled = true;
            subInput.disabled = true;
        }

        setCategory(router.query.category);
        setSub(router.query.sub);
    }, [])

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const key = await uploadToS3(e);
            // console.log(key);

            const response = await axios.post('http://localhost:3001/post', {
                title: title,
                category: category,
                subCategory: sub,
                description: description,
                imageUrl: "https://exposure-s3-bucket.s3.amazonaws.com/" + key
            }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')}});

            console.log(response);
        } catch(e: any){
            setError(e.message);
        }
    }

    return (
        <div className="">
            <form className="mt-32 w-1/4 mx-auto flex flex-col justify-center" onSubmit={handleSubmit}>
                <div className="w-1/3 mx-auto relative my-8 flex justify-center">
                    <input className="rounded-md indent-3 py-2 !outline-none" type="text" value={title} onChange={e => setTitle(e.target.value)} name="category" />
                    <p className="absolute -top-[1.3rem] left-[0.15rem] text-sm text-gray-300">title</p>
                </div>
                <div className="w-1/3 mx-auto relative my-8 flex justify-center">
                    <input className="rounded-md indent-3 py-2 !outline-none" id="cat-input" type="text" value={category} onChange={e => setCategory(e.target.value)} name="category" />
                    <p className="absolute -top-[1.3rem] left-[0.15rem] text-sm text-gray-300">category</p>
                </div>
                <div className="w-1/3 mx-auto relative my-8 flex justify-center">
                    <input className="rounded-md indent-3 py-2 !outline-none" id="sub-input" type="text" value={sub} onChange={e => setSub(e.target.value)} name="category" />
                    <p className="absolute -top-[1.3rem] left-[0.15rem] text-sm text-gray-300">sub-category</p>
                </div>
                <div className="w-1/3 mx-auto relative my-8 flex justify-center">
                    <textarea placeholder="..." className="rounded-md py-2 px-3 bg-gray-200 !outline-none" value={description} onChange={e => setDescription(e.target.value)} name="description" />
                    <p className="absolute -top-[1.3rem] left-[0.15rem] text-sm text-gray-300">description</p>
                </div>
                <div className="w-2/3 mx-auto bg-gray-300/10 rounded-lg py-5 px-2 flex justify-center mt-4">
                    <input className="mx-auto w-3/4 text-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-gray-900" type="file" accept="image/jpeg image/png" name="file"/>
                </div>
                <button className="w-1/5 py-1 rounded-full mx-auto my-8 text-md bg-gray-500 hover:bg-gray-700 transition-all duration-300" type="submit">submit</button>
            </form>
            {error ? 
            <div className="fixed w-1/5 bg-red-700 rounded-lg h-fit z-40 mx-auto left-[40%] bottom-10">
                <p className="text-center mx-6 py-3 font-bold font-mono select-none">{error}</p>
                <p onClick={() => setError(null)} className="absolute top-1 right-3 rotate-45 font-bold text-xl hover:cursor-pointer">+</p>
            </div>
            : null }
        </div>
    )
}

{/* <form onSubmit={handleSubmit}>
    <input type="file" accept="image/jpeg image/png" name="file"/>
    <input type="text" value={genre} onChange={e => setGenre(e.target.value)} name="genre" />
    <input type="text" value={category} onChange={e => setCategory(e.target.value)} name="category" />
    <input type="text" value={description} onChange={e => setDescription(e.target.value)} name="description" />
    <button type="submit">Submit</button>
</form> */}