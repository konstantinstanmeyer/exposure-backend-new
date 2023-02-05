import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Navbar from "@/components/Navbar";

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
    const [genre, setGenre] = useState("");
    const [category, setCategory] = useState<any>("");
    const [sub, setSub] = useState<any>("");
    const [description, setDescription] = useState("");
    const username = useSelector((state: any) =>  state.auth.username);
    const token = useSelector((state: any) =>  state.auth.token);

    const router = useRouter();

    useEffect(() => {
        if (!username || !token) router.push('/login');

        setCategory(router.query.category);
        setSub(router.query.sub);
    }, [])

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const key = await uploadToS3(e);
        // console.log(key);

        const response = await axios.post('http://localhost:3001/post', {
            genre: genre,
            category: category,
            description: description,
            imageUrl: "https://exposure-s3-bucket.s3.amazonaws.com/" + key
        }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')}});

        console.log(response);
    }

    return (
        <div className="">
            <Navbar />
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/jpeg image/png" name="file"/>
                <input type="text" value={genre} onChange={e => setGenre(e.target.value)} name="genre" />
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} name="category" />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} name="description" />
                <button type="submit">Submit</button>
            </form>
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