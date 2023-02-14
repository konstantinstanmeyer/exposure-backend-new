import { useRouter } from 'next/router'
import { useState, ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { AppDispatch, RootState } from "@/src/store";
import validate from "@/util/validateUser"
import { setError } from '@/features/auth/authSlice'

export default function Category(){
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [page, setPage] = useState(1);
    const [subs, setSubs] = useState<Array<any>>([]);
    const [obscurity, setObscurity] = useState<Number>(1);
    
    const username = useSelector((state: RootState) =>  state.auth.username);
    const token = useSelector((state: RootState) =>  state.auth.token);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);

        if (router.isReady){
            if(username && token){
                (async() => {
                    const { data } = await axios.get(`http://localhost:3001/sub-categories/${router.query.categoryName}/${page}`, { headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} });
                    setSubs(data.subs);
                    setIsLoading(false);
                })()
            } else if (validate(dispatch)) {
                (async() => {
                    try {
                        const { data } = await axios.get(`http://localhost:3001/sub-categories/${router.query.categoryName}/${page}`, { headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} });
                        setSubs(data.subs);
                        setIsLoading(false);
                    } catch(e: any){
                        dispatch(setError(e.message));
                    }
                })()
            } else {
                router.push('/login');
            }
        }
    }, [page, router.isReady]);

    useEffect(() => {
        setPage(1);
    }, [obscurity])

    async function fetch(){
        const { data } = await axios.get(`http://localhost:3001/sub-categories/${router.query.categoryName}/${page}`, { headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} });
        console.log(data);
    }

    async function submitCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await axios.post('http://localhost:3001/add-category', {
            // name: category,
            // imageUrl: imageUrl,
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    async function submitSubCategory(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await axios.post('http://localhost:3001/add-sub-category', {
            // name: category,
            // imageUrl: imageUrl,
            // category: "Farming",
            // obscurity: obscurity
        }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
    }

    const filteredSubs = subs.filter((sub) => sub.obscurity === obscurity);

    return(
        <div className="relative w-screen">
            <div className="w-1/5 h-10 bg-gray-400 absolute z-40 right-14 -top-10 rounded-xl flex flex-row">
                <div className="h-full w-full relative flex items-center">
                    <input id="input" min="1" max="5" value={+obscurity} onChange={e => setObscurity(+e.target.value)} className="accent-slate-500 !outline-none mx-auto w-2/3" type="range" />
                    <p className="absolute text-gray-300 -bottom-7 text-sm w-full text-center font-bold">obscurity {"(1-5)"}</p>
                </div>
            </div>
            <div className="w-1/2 grid grid-cols-2 mx-auto relative mt-36">
                {filteredSubs.length > 0 ? filteredSubs.map((sub, i) => 
                    <Link href={`/category/sub/${sub.name}/?category=${router.query.categoryName}`} key={`${sub.name + i.toString()}`} className={`h-56 w-56 mb-10 hover:bg-gray-600 transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600 rounded-full" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>{sub.name}</p>
                        {isLoading ? null : <img src={sub.imageUrl} className={`w-full rounded-full object-cover h-full bg-gray-600`} />}
                    </Link>
                ) : isLoading ?
                <>
                    <div className={`h-56 w-56 mb-10 bg-gray-600/40 transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>{" "}</p>
                    </div>
                    <div className={`h-56 w-56 mb-10 bg-gray-600/40 transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>{" "}</p>
                    </div>
                </>: 
                <>
                    <div className={`h-56 w-56 mb-10  transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>{" "}</p>
                    </div>
                    <div className="absolute top-16 w-full">
                        <p className="text-center top-15 relative text-gray-300 font-bold text-3xl">no results</p>
                    </div>
                    <div className={`h-56 w-56 mb-10 transition-all duration-300 ${isLoading ? "animate-pulse bg-gray-600" : null} m-auto relative p-3 rounded-md flex items-center justify-center`}>
                        <p className={`absolute -bottom-7 text-center w-1/2 left-[25%] text-gray-300 ${isLoading ? "text-white/0 bg-gray-600 rounded-lg animate-pulse" : null}`}>{" "}</p>
                    </div>
                </>
                }
            </div>
            <div className="bg-gray-800 mt-4 w-32 h-10 mx-auto rounded-md flex flex-row items-center">
                <p onClick={page !== 1 ? () => setPage(page => page-1) : undefined} className="mx-auto font-extrabold text-gray-300 hover:cursor-pointer">{'<'}</p>
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