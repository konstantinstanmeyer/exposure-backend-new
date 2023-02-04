import axios from "axios";
import Navbar from '@/components/Navbar'
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
        <div className="relative w-full h-screen">
            <Navbar />
            <div className="bg-white">
                
            </div>
        </div>
    )
}