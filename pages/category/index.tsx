import axios from "axios";
import { ChangeEvent, useState } from "react"

export default function Category(){
    const [category, setCategory] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    async function submitCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        axios.post('http://localhost:3001/add-category', {
            name: category,
            imageUrl: imageUrl,
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    return(
        <div>
            <form onSubmit={submitCategory}>
                <input value={category} onChange={(e) => setCategory(e.target.value)} />
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <button className="text-white" type="submit">submit</button>
            </form>
        </div>
    )
}