import { AppDispatch, RootState } from "@/src/store"
import { useEffect, useState } from "react"
import { useSelector , useDispatch} from "react-redux"
import { fetchSuggestions, Suggestion, deleteSuggestion } from "@/features/admin/adminSlice";
import { useRouter } from "next/router";

export default function Admin(){
    const [type, setType] = useState<string>("Category");
    const [edit, setEdit] = useState<boolean>(false);

    const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);
    const username = useSelector((state: RootState) => state.auth.username);
    const token = useSelector((state: RootState) => state.auth.token);
    const suggestions = useSelector((state: RootState) => state.admin.suggestions);
    const status = useSelector((state: RootState) => state.admin.status);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    useEffect(() => {
        if(username && token && isAdmin){
            dispatch(fetchSuggestions());
        } else {
            router.push('/');
        }
    }, [status])

    const displayedSuggestions = suggestions.filter((suggestion: Suggestion) => suggestion.type === type);

    return (
        <div className="flex flex-col justify-center mt-32">
            {!edit ? <>
            (<div className="flex w-56 mx-auto justify-center space-x-4 mb-8">
                <button onClick={() => setType("Category")} className={`bg-neutral-700 rounded-lg px-2 py-1 dangrek ${type === "Category" ? "bg-red-500" : "bg-neutral-700"}`}>categories</button>
                <button onClick={() => setType("SubCategory")} className={`bg-neutral-700 rounded-lg px-2 py-1 dangrek ${type === "SubCategory" ? "bg-red-500" : "bg-neutral-700"}`}>sub-categories</button>
            </div>
            {displayedSuggestions.map(suggestion =>
                <>
                    {suggestion.existingCategory ? 
                    <div className="bg-neutral-700 mx-auto w-56 rounded-lg flex flex-col justify-center mt-4 mb-10 relative">
                            <p className="text-sm text-neutral-300 font-bold pt-1 text-center">@{suggestion.username}</p>
                            <p className="text-neutral-200 text-sm text-center"><strong className="text-neutral-300">Existing Cat.</strong> {suggestion.existingCategory}</p>
                            <p className="text-neutral-200 text-sm text-center"><strong className="text-neutral-300">New Sub-Cat.</strong> {suggestion.newSubCategory}</p>
                            <p className="text-neutral-200 text-sm text-center"><strong className="text-neutral-300">Obscurity</strong> {suggestion.obscurity}</p>
                            <img onClick={() => { dispatch(deleteSuggestion(suggestion._id)) }} className="hover:cursor-pointer w-8 mx-auto my-3 aspect-square rounded-full" src="/x.png"/>
                            <div className="absolute -bottom-9 w-full flex justify-center">
                                <button className="w-1/4 bg-neutral-600 text-neutral-300 dangrek text-lg rounded-lg hover:bg-neutral-500 transition-all duration-300">add</button>
                            </div>
                    </div>:
                    <div className="bg-neutral-700 mx-auto w-56 rounded-lg flex flex-col justify-center mt-4 mb-10 relative">
                        <p className='text-neutral-200 text-sm text-center font-bold pt-1'>@{suggestion.username}</p>
                        <p className='text-neutral-200 text-sm text-center font-bold'><strong className="text-neutral-300">New Category: </strong> {suggestion.newCategory}</p>
                        <img onClick={() => dispatch(deleteSuggestion(suggestion._id))} className="hover:cursor-pointer w-8 mx-auto my-3 aspect-square" src="/x.png"/>
                        <div className="absolute -bottom-9 w-full flex justify-center">
                            <button className="w-1/4 bg-neutral-600 text-neutral-300 dangrek text-lg rounded-lg hover:bg-neutral-500 transition-all duration-300">add</button>
                        </div>
                    </div>
                    }
                </>
            )})
            </> : 
            <div>

            </div>
            }
        </div>
    )
}

// async function submitCategory(e: ChangeEvent<HTMLFormElement>){
//     e.preventDefault();

//     const response = await axios.post('http://localhost:3001/add-category', {
//         // name: category,
//         // imageUrl: imageUrl,
//     }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
// }

// async function submitSubCategory(e: ChangeEvent<HTMLFormElement>){
//     e.preventDefault();

//     const response = await axios.post('http://localhost:3001/add-sub-category', {
//         // name: category,
//         // imageUrl: imageUrl,
//         // category: "Farming",
//         // obscurity: obscurity
//     }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
// }