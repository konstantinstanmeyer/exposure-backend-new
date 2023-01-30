import axios from 'axios';
import { ChangeEvent } from 'react';

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

export default function Upload(){
    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const key = await uploadToS3(e);

        console.log(key);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/jpeg image/png" name="file"/>
                <button type="submit">Submit</button>
            </form>
            <img src="https://exposure-s3-bucket.s3.amazonaws.com/3ab12b92-712c-4934-9f27-aeeeff60db91.png" />
        </div>
    )
}