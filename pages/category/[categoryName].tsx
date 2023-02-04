import { useRouter } from 'next/router'
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';

export default function Category(){
    const [category, setCategory] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    let categoryName;

    const router = useRouter();

    useEffect(() => {
        categoryName = router.query?.categoryName;

        if (!categoryName) router.push('/');
    }, [])

    async function submitSubCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        axios.post('http://localhost:3001/add-sub-category', {
            name: category,
            imageUrl: imageUrl,
            category: "Farming"
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    return(
        <div>
            <form onSubmit={submitSubCategory}>
                <input value={category} onChange={(e) => setCategory(e.target.value)} />
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <button className="text-white" type="submit">submit</button>
            </form>
        </div>
    )
}