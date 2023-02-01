import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export default function Navbar(){
    const username: TypedUseSelectorHook<any> = useSelector((state: any) =>  state.auth.username);

    const router = useRouter();

    async function handleLogout(){
        
    }

    return(
        <div className="h-20 w-screen bg-neutral-800 flex flex-row items-center fixed top-0 z-40">
            <img className="w-14 mx-12" src="camera.png" />
            <input className="rounded-sm ml-8 indent-2 p-1 w-52 !outline-none bg-gray-300" placeholder="find a category..." />
            <Link href="/discover" className="text-gray-300 text-sm font-mono font-bold ml-auto mx-5 hover:underline">discover</Link>
            <Link href="/friends" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">friends</Link>
            <Link href="/discover" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">log out</Link>
            <img onClick={() => router.push(`/user/${username}`)} className="w-10 ml-5 mr-10 rounded-full hover:cursor-pointer" src="profile.png" />
        </div>
    )
}