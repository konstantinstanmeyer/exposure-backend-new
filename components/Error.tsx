import { useSelector, useDispatch } from "react-redux"
import { setError } from '@/features/auth/authSlice';
import { AppDispatch } from "@/src/store";

export default function Error(){
    const error = useSelector((state: any) => state.auth.error)

    const dispatch = useDispatch<AppDispatch>();

    return(
        <>
        {error ? 
        <div className="fixed w-1/5 bg-red-700 rounded-lg h-fit z-40 mx-auto left-[40%] bottom-10">
            <p className="text-center mx-6 py-3 font-bold font-mono select-none">{error}</p>
            <p onClick={() => dispatch(setError(null))} className="absolute top-1 right-3 rotate-45 font-bold text-xl hover:cursor-pointer">+</p>
        </div>
        : null }
        </>
    )
}