import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar(){


    const router = useRouter();

    return(
        <div className="h-20 w-screen bg-neutral-800 flex flex-row items-center">
            <img className="w-14 mx-12" src="camera.png" />
            <input className="rounded-sm ml-8 indent-2 p-1 w-52" placeholder="find a category..." />
            <Link href="/discover" className="text-gray-300 text-sm font-mono font-bold ml-auto mx-5 hover:underline">discover</Link>
            <Link href="/discover" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">friends</Link>
            <Link href="/discover" className="text-gray-300 text-sm font-mono font-bold mx-5 hover:underline">log out</Link>
            <img onClick={() => router.push('/profile')} className="w-10 mx-5" src="profile.png" />
        </div>
    )
}