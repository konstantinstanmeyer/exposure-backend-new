import { AppDispatch, RootState } from "@/src/store"
import { useEffect } from "react"
import { useSelector , useDispatch} from "react-redux"
import { fetchSuggestions } from "@/features/admin/adminSlice";
import { useRouter } from "next/router";

export default function Admin(){
    const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);
    const username = useSelector((state: RootState) => state.auth.username);
    const token = useSelector((state: RootState) => state.auth.token);
    const suggestions = useSelector((state: RootState) => state.admin.suggestions);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    useEffect(() => {
        if(username && token && isAdmin){
            dispatch(fetchSuggestions());
        } else {
            router.push('/');
        }
    }, [])

    console.log(suggestions);

    return (
        <div className="">
        
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