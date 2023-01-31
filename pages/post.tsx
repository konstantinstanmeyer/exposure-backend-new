import axios from 'axios';
import { ChangeEvent, useState } from 'react';

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
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const key = await uploadToS3(e);

        console.log(key)

        const response = axios.post('http://localhost:3001/post', {
            genre: genre,
            category: category,
            description: description,
            imageUrl: "https://exposure-s3-bucket.s3.amazonaws.com/" + key
        }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')}});

        console.log(response);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/jpeg image/png" name="file"/>
                <input type="text" value={genre} onChange={e => setGenre(e.target.value)} name="genre" />
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} name="category" />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} name="description" />
                <button type="submit">Submit</button>
            </form>
            <img src="https://exposure-s3-bucket.s3.amazonaws.com/3ab12b92-712c-4934-9f27-aeeeff60db91.png" />
        </div>
    )
}