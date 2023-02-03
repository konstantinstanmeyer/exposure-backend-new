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
            <div className="w-52 ml-8 flex flex-wrap justify-center">
                <input className="rounded-sm indent-2 p-1 !outline-none bg-gray-300" placeholder="find a category..." />
            </div>
            <Link className="ml-auto mx-3 text-gray-300 font-bold mb-1 hover:bg-gray-700 transition-all duration-300 rounded-full px-3 py-1" href="/post">+</Link>
            <Link href="/discover" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">discover</Link>
            <Link href="/friends" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">friends</Link>
            <Link href="/discover" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">log out</Link>
            <img onClick={username ? () => router.push(`/user/${username}`) : undefined} className="w-10 ml-5 mr-10 rounded-full hover:cursor-pointer" src="profile.png" />
        </div>
    )
}