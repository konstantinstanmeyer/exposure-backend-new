import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/src/store";
import { ChangeEvent, useEffect, useState } from "react";
import validate from '@/util/validateUser';
import { useRouter } from 'next/router'
import { setSuccess } from '@/features/auth/authSlice';
import axios from 'axios';

export default function Suggest(){
    const [type, setType] = useState<String>("Category");
    const [newCategory, setNewCategory] = useState<string | number | readonly string[] | undefined>("");
    const [existingCategory, setExistingCategory] = useState<string | number | readonly string[] | undefined>("");
    const [subCategory, setSubCategory] = useState<string | number | readonly string[] | undefined>("");
    const [error, setError] = useState<String | null>("");
    const [obscurity, setObscurity] = useState<Number>(1);

    const router = useRouter();

    const userState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(!userState || !tokenState){
            if (!validate(dispatch)){
                router.push('/login')
            }
        }
    }, [])

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            if (type === "Category" && newCategory !== ""){
                const response = await axios.post('http://localhost:3001/suggestion', {
                    username: userState,
                    newCategory: newCategory,
                    type: type
                }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')}})

                if (response.status === 200){
                    setNewCategory("");
                    setSubCategory("");
                    setExistingCategory("");
                    dispatch(setSuccess("Suggestion successfully added"));
                }
            } else if(type === "SubCategory" && existingCategory !== "" && subCategory !== "" && obscurity >=1 && obscurity <= 5) {
                const response = await axios.post('http://localhost:3001/suggestion', {
                    username: userState,
                    newSubCategory: subCategory,
                    existingCategory: existingCategory,
                    obscurity: obscurity,
                    type: type
                }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token')}});

                if (response.status === 200){
                    router.push('/');
                }
            } else if(obscurity > 6 || obscurity < 1) {
                setError("Obscurity must be between 1 and 5");
            } else {
                setError("All fields must be filled out and valid");
            }
        } catch(e: any){
            setError(e.message);
        }
    }

    return (
        <div>
            <div className="w-1/4  flex flex-col mt-32 mx-auto bg-neutral-800 rounded-lg p-5">
                <div className="w-4/5 flex flex-row mx-auto">
                    <button onClick={() => setType("Category")} className={`${type === "Category" ? "bg-red-500/50 outline-2 outline outline-red-500/70" : "bg-gray-500"} w-1/2 rounded-md mx-1 py-2 dangrek`}>category</button>
                    <button onClick={() => setType("SubCategory")} className={`${type === "SubCategory" ? "bg-red-500/50 outline-2 outline outline-red-500/70" : "bg-gray-500"} w-1/2 rounded-md mx-1 py-2 dangrek`}>sub-category</button>
                </div>
                {type === "Category" ?
                <form onSubmit={handleSubmit} className="flex flex-col justify-center mt-5 ">
                    <p className="w-2/3 mx-auto text-gray-300 pl-1 text-sm">category</p>
                    <input placeholder="..." value={newCategory} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)} className="rounded-lg !outline-none indent-5 font-bold py-2 w-2/3 mx-auto mb-2" />
                    <button type="submit" className={`w-1/2 mx-auto ${newCategory !== "" ? "bg-red-500/50" : null} bg-gray-500 mt-3 rounded-lg p-2 dangrek transition-all duration-200`}>submit request</button>
                </form> :
                <form onSubmit={handleSubmit} className="flex flex-col justify-center mt-5 [&>input]:py-2 [&>input]:w-2/3 [&>input]:mx-auto [&>input]:mb-2">
                    <p className="w-2/3 mx-auto text-gray-300 pl-1 text-sm">category</p>
                    <input type="text" value={existingCategory} onChange={(e) => setExistingCategory(e.target.value)} placeholder="..." className="rounded-lg !outline-none indent-5 pr-2" />
                    <p className="w-2/3 mx-auto text-gray-300 pl-1 text-sm">sub-category</p>
                    <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} placeholder="..." className="rounded-lg !outline-none indent-5 pr-2" />
                    <p className="w-2/3 mx-auto text-gray-300 pl-1 text-sm">obscurity (1-5)</p>
                    <input min="1" max="5" type="number" value={+obscurity} onChange={(e: ChangeEvent<HTMLInputElement>) => setObscurity(parseFloat(e.target.value))} className="rounded-lg !outline-none indent-5 pr-2" />
                    <button type="submit" className={`w-1/2 mx-auto ${existingCategory !== "" && subCategory !== "" && obscurity >= 1 && obscurity <= 5 ? "bg-red-500/50" : null} bg-gray-500 mt-3 rounded-lg p-2 dangrek transition-all duration-200`}>submit request</button>
                </form>
                }
            </div>
            {error ? 
            <div className="fixed w-1/5 bg-red-700 rounded-lg h-fit z-40 mx-auto left-[40%] bottom-10">
            <p className="text-center mx-6 py-3 font-bold font-mono select-none">{error}</p>
            <p onClick={() => setError(null)} className="absolute top-1 right-3 rotate-45 font-bold text-xl hover:cursor-pointer">+</p>
            </div>
            : null }
        </div>
    )
}