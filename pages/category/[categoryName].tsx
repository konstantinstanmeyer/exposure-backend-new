import { useRouter } from 'next/router'
import { useState, ChangeEvent, useEffect } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface subCategory {

}

export default function Category(){
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [obscurity, setObscurity] = useState<string | number | readonly string[] | undefined>(1);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [page, setPage] = useState(1);
    const [subs, setSubs] = useState<Array<any>>([]);
    const token: TypedUseSelectorHook<any> = useSelector((state: any) =>  state.auth.token);
    let categoryName: undefined | string | string[];

    const router = useRouter();

    console.log(router)

    useEffect(() => {
        setIsLoading(true);
        categoryName = router.query?.categoryName;

        (async() => {
            const { data } = await axios.get(`http://localhost:3001/sub-categories/${categoryName}/${page}`, { headers: {"Authorization": `Bearer ${token}`} });
            setSubs(data.subs)
            setIsLoading(false);
        })();
    }, [page]);

    async function fetch(){
        const { data } = await axios.get(`http://localhost:3001/sub-categories/${categoryName}/${page}`, { headers: {"Authorization": `Bearer ${token}`} });
        console.log(data);
    }

    async function submitCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await axios.post('http://localhost:3001/add-category', {
            name: category,
            imageUrl: imageUrl,
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    async function submitSubCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await axios.post('http://localhost:3001/add-sub-category', {
            name: category,
            imageUrl: imageUrl,
            category: "Farming",
            obscurity: obscurity
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    return(
        <div className="relative w-screen">
            <Navbar />
            <div className="w-1/2 mt-20 grid grid-cols-2 mx-auto relative">
                {subs.length > 0 ? subs.map((sub, i) => 
                    <Link href={`/category/sub/${sub.name}/?category=${router.query.categoryName}`} id={`${sub.name + i.toString()}`} className={`h-72 w-72 mt-16 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600 rounded-full" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>{sub.name}</p>
                        {isLoading ? null : <img src={sub.imageUrl} className={`w-full rounded-full object-cover h-full bg-gray-600`} />}
                    </Link>
                ) :
                <>
                    <div className={`h-72 w-72 mt-16 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>.</p>
                    </div>
                    <div className={`h-72 w-72 mt-16 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>.</p>
                    </div>
                </>}
            </div>
            <div className="mt-14 bg-gray-800 w-32 h-10 mx-auto rounded-md flex flex-row items-center">
                <p onClick={() => setPage(page => page-1)} className="mx-auto font-extrabold text-gray-300 hover:cursor-pointer">{'<'}</p>
                <p className="mx-auto text-gray-300 select-none">{`${page}`}</p>
                <p onClick={() => setPage(page => page+1)} className="mx-auto font-extrabold text-gray-300 hover:cursor-pointer">{'>'}</p>
            </div>
        </div>
    )
}

{/* <form onSubmit={submitSubCategory}>
    <input value={category} onChange={(e) => setCategory(e.target.value)} />
    <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
    <input type="number" value={obscurity} onChange={(e: ChangeEvent<HTMLInputElement>) => setObscurity(e.target.value)} />
    <button className="text-white" type="submit">submit</button>
</form> */}