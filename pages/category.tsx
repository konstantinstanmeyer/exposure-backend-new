import axios from "axios";
import { ChangeEvent, useState } from "react"

export default function Category(){
    const [category, setCategory] = useState("")

    async function submitCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        axios.post('http://localhost:3001/add-category', {
            name: category
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    return(
        <div>
            <form onSubmit={submitCategory}>
                <input value={category} onChange={(e) => setCategory(e.target.value)} />
                <button className="text-white" type="submit">submit</button>
            </form>
        </div>
    )
}