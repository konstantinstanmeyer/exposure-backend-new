import { ChangeEvent } from "react";
import axios from 'axios';

export default async function uploadToS3(e: ChangeEvent<HTMLFormElement>){
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