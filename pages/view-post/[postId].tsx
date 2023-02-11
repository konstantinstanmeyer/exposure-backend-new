import { useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from '@/src/store'

export default function viewPost(){
    const userState = useSelector((state: RootState) =>  state.auth.username);
    const tokenState = useSelector((state: RootState) =>  state.auth.token);

    useEffect(() => {
        (async() => {

        })();
    }, [])

    return(
        <div className="">

        </div>
    )
}