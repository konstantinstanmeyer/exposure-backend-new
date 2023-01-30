import { ChangeEvent } from 'react';

async function uploadToS3(e: ChangeEvent<HTMLFormElement>){
    const formData = new FormData(e.target);

    const file = formData.get("file");

    if (!file) return null;

    // @ts=ignore

    const fileType = encodeURIComponent(file.type);
}

export default function Upload(){

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/jpeg image/png" name="file"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}