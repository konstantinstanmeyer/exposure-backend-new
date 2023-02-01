import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import axios from 'axios'
import { AppDispatch } from '../src/store'
import { setUsername, setToken } from '@/features/auth/authSlice'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
  const [error, setError] = useState<null | String>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const usernameState: TypedUseSelectorHook<any> = useSelector((state: any) =>  state.auth.username);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if(username && token){
      dispatch(setUsername(username));
      dispatch(setToken(token));
    } else {
      router.push('/login');
    }

    return () => {
      // nothing
    }
  }, [])

  return (
    <>
      <Head>
        <title>Exposure</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        <Navbar />
        <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-3/5 mx-auto mt-28">
          <Link href="/category/??" className={`bg-gray-300 h-72 flex items-center justify-center relative w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}>
            {isLoading ? null : <img src="https://images.unsplash.com/photo-1588786849373-642245e7bd15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" className="w-[95%] bg-black h-[95%] rounded-md object-cover"></img>}
            <div className="bg-white/20 backdrop-blur-md absolute w-32 min:h-5">
              <p className="font-bold text-center mx-3 break-all py-1">contemporary art</p>
            </div>
          </Link>
          <div className={`bg-gray-300 h-72 w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}></div>
          <div className={`bg-gray-300 h-72 w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}></div>
          <div className={`bg-gray-300 h-72 w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}></div>
          <div className={`bg-gray-300 h-72 w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}></div>
          <div className={`bg-gray-300 h-72 w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}></div>
          <div className={`bg-gray-300 h-72 w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}></div>
          <div className={`bg-gray-300 h-72 w-64 rounded-md mx-auto ${isLoading ? "animate-pulse" : null}`}></div>
        </div>
        <p>{`${usernameState}`}</p>
        <div className="fixed w-1/5 bg-red-700 rounded-lg h-fit z-40 mx-auto left-[40%] bottom-10">
          <p className="text-center mx-6 py-3 font-bold font-mono select-none">hello this is the very l</p>
          <p className="absolute top-1 right-3 rotate-45 font-bold text-xl hover:cursor-pointer">+</p>
        </div> 
      </div>
    </>
  )
}
