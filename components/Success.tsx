import { useSelector, useDispatch } from "react-redux"
import { setSuccess } from "@/features/auth/authSlice"
import { AppDispatch } from "@/src/store";

export default function Success(){
    const success = useSelector((state: any) => state.auth.success)

    const dispatch = useDispatch<AppDispatch>();

    return(
        <>
        {success ? 
        <div className="fixed w-1/5 bg-green-700 rounded-lg h-fit z-40 mx-auto left-[40%] bottom-10">
            <p className="text-center mx-6 py-3 font-bold font-mono select-none">{success}</p>
            <p onClick={() => dispatch(setSuccess(null))} className="absolute top-1 right-3 rotate-45 font-bold text-xl hover:cursor-pointer">+</p>
        </div>
        : null }
        </>
    )
}