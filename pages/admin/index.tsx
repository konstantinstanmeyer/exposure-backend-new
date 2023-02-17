import { AppDispatch, RootState } from "@/src/store"
import { ChangeEvent, useEffect, useState } from "react"
import { useSelector , useDispatch} from "react-redux"
import { fetchSuggestions, Suggestion, deleteSuggestion } from "@/features/admin/adminSlice";
import { useRouter } from "next/router";
import uploadToS3 from "@/util/uploadToS3";
import axios from 'axios';
import { setError, setSuccess } from "@/features/auth/authSlice";

export default function Admin(){
    const [type, setType] = useState<string>("Category");
    const [edit, setEdit] = useState<null | String>(null);
    const [newCategory, setNewCategory] = useState<string>("");
    const [existingCategory, setExistingCategory] = useState<string>("");
    const [newSubCategory, setNewSubCategory] = useState<string>("");
    const [obscurity, setObscurity] = useState<Number>(1);

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

    async function categorySubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const key = await uploadToS3(e);

        if (newCategory.length > 0 && key) {
            const response = await axios.post('http://localhost:3001/add-category', {
                name: newCategory,
                imageUrl: "https://exposure-s3-bucket.s3.amazonaws.com/" + key,
            }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}})
            if (response.status === 200){
                dispatch(setSuccess("Successfully added category!"));
                setNewCategory("");
                setEdit(null);
            }
        } else {
            dispatch(setError("Fill in all fields"))
        }
    }

    async function subCategorySubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const key = await uploadToS3(e);

        if (newSubCategory.length > 0 && existingCategory.length > 0 && key) {
            const response = await axios.post('http://localhost:3001/add-sub-category', {
                name: newSubCategory,
                imageUrl: "https://exposure-s3-bucket.s3.amazonaws.com/" + key,
                category: existingCategory,
                obscurity: obscurity
            }, { headers: { "Authorization": "Bearer "+ localStorage.getItem('token')}}) 

            if (response.status === 200){
                dispatch(setSuccess("Successfully added sub-category!"));
                setEdit(null);
                setNewSubCategory("");
                setExistingCategory("");
                setObscurity(1);
            }
        }
    }

    function handleCategoryClick(name: string){
        setNewCategory(name);
        setEdit("Category");
    }

    function handleSubCategoryClick(newName: string, category: string, obscurity: Number){
        setNewSubCategory(newName);
        setExistingCategory(category);
        setObscurity(obscurity);
        setEdit("SubCategory");
    }

    const displayedSuggestions = suggestions.filter((suggestion: Suggestion) => suggestion.type === type);

    return (
        <div className="flex flex-col justify-center mt-32">
            {!edit ? <>
            (<div className="flex w-56 mx-auto justify-center space-x-4 -mt-5 mb-8">
                <button onClick={() => setType("Category")} className={`bg-neutral-700 rounded-lg px-2 py-1 dangrek ${type === "Category" ? "bg-red-500" : "bg-neutral-700"}`}>categories</button>
                <button onClick={() => setType("SubCategory")} className={`bg-neutral-700 rounded-lg px-2 py-1 dangrek ${type === "SubCategory" ? "bg-red-500" : "bg-neutral-700"}`}>sub-categories</button>
            </div>
            <button onClick={() => setEdit(type)} className="bg-neutral-700 mx-auto text-neutral-300 dangrek w-56 h-12 rounded-lg flex justify-center items-center mb-4 hover:bg-neutral-800 hover:text-neutral-400 transition-all duration-300">add own</button>
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
                                <button onClick={() => handleSubCategoryClick(suggestion.newSubCategory as string, suggestion.existingCategory as string, suggestion.obscurity)} className="w-1/4 bg-neutral-600 text-neutral-300 dangrek text-lg rounded-lg hover:bg-neutral-500 transition-all duration-300">add</button>
                            </div>
                    </div>:
                    <div className="bg-neutral-700 mx-auto w-56 rounded-lg flex flex-col justify-center mt-4 mb-10 relative">
                        <p className='text-neutral-200 text-sm text-center font-bold pt-1'>@{suggestion.username}</p>
                        <p className='text-neutral-200 text-sm text-center font-bold'><strong className="text-neutral-300">New Category: </strong> {suggestion.newCategory}</p>
                        <img onClick={() => dispatch(deleteSuggestion(suggestion._id))} className="hover:cursor-pointer w-8 mx-auto my-3 aspect-square" src="/x.png"/>
                        <div className="absolute -bottom-9 w-full flex justify-center">
                            <button onClick={() => handleCategoryClick(suggestion.newCategory as string)} className="w-1/4 bg-neutral-600 text-neutral-300 dangrek text-lg rounded-lg hover:bg-neutral-500 transition-all duration-300">add</button>
                        </div>
                    </div>
                    }
                </>
            )})
            </> : 
            <>
                {edit === "SubCategory" ?
                    <form onSubmit={subCategorySubmit} className="mx-auto w-56 flex flex-col relative bg-neutral-700 rounded-lg">
                        <p className="dangrek text-neutral-400 text-2xl text-center my-4">New Sub-Category</p>
                        <div className="my-6 w-4/6 mx-auto relative">
                            <p className="absolute text-sm text-neutral-300 -top-5 dangrek">Existing Cat.</p>
                            <input className="w-full rounded-md py-1 px-2" type="text" value={existingCategory} onChange={e => setExistingCategory(e.target.value)} />
                        </div>
                        <div className="my-6 w-4/6 mx-auto relative">
                            <p className="absolute text-sm text-neutral-300 -top-5 dangrek">New Sub-Cat.</p>
                            <input className="w-full rounded-md py-1 px-2" type="text" value={newSubCategory} onChange={e => setNewSubCategory(e.target.value)} />
                        </div>
                        <div className="my-6 w-4/6 mx-auto relative">
                            <p className="absolute text-sm text-neutral-300 -top-5 dangrek">Obscurity</p>
                            <input className="w-full rounded-md py-1 px-2" type="number" min="1" max="5" value={+obscurity} onChange={e => setObscurity(+e.target.value)}/>
                        </div>
                        <div className="my-6 w-4/6 mx-auto relative">
                            <p className="absolute text-sm text-neutral-300 -top-[1.1rem] dangrek ml-2">Image</p>
                            <input className="py-[0.15rem] file:bg-neutral-500 hover:file:bg-neutral-400 transitional-all duration-300 w-full file:!outline-none file:rounded-lg text-gray-400 text-sm" type="file" name="file"/>
                        </div>
                        <div className="w-1/2 h-fit relative mx-auto">
                            <button className="bg-neutral-400 w-full rounded-lg z-20 dangrek text-lg mb-6" type='submit'>add</button>
                        </div>
                        <div className="absolute -bottom-7 w-full flex">
                            <button onClick={() => setEdit(null)} className="text-neutral-600 font-bold hover:underline mx-auto">cancel</button>
                        </div>
                    </form> 
                : edit === "Category" ?
                    <form onSubmit={categorySubmit} className="mx-auto w-56 flex flex-col bg-neutral-700 rounded-lg relative">
                        <p className="dangrek text-neutral-400 text-2xl text-center my-4">New Category</p>
                        <div className="my-6 w-4/6 mx-auto relative">
                            <p className="absolute text-sm text-neutral-300 -top-5 dangrek">Existing Cat.</p>
                            <input className="w-full rounded-md py-1 px-2" type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                        </div>
                        <div className="my-6 w-4/6 mx-auto relative">
                            <p className="absolute text-sm text-neutral-300 -top-[1.1rem] dangrek ml-2">Image</p>
                            <input className="py-[0.15rem] file:bg-neutral-500 hover:file:bg-neutral-400 transitional-all duration-300 w-full file:!outline-none file:rounded-lg text-gray-400 text-sm" type="file" name="file"/>
                        </div>
                        <div className="w-1/2 h-fit relative mx-auto">
                            <button className="bg-neutral-400 w-full rounded-lg z-20 dangrek text-lg mb-6" type='submit'>add</button>
                        </div>
                        <div className="absolute -bottom-7 w-full flex">
                            <button onClick={() => setEdit(null)} className="text-neutral-600 font-bold hover:underline mx-auto">cancel</button>
                        </div>
                    </form>
                : null}
            </>
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