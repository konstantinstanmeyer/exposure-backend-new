import Navbar from '@/components/Navbar'

export default function Sub(){
    return (
        <div className="relative">
            <Navbar />
            <div className="grid-cols-3 mt-40 mx-auto w-1/2 grid">
                <div className="bg-white w-5/6 h-[15rem] border-red-500 border-2 my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[25rem] border-red-500 border-2 row-span-2 my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[25rem] border-red-500 border-2 row-span-2 my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[25rem] border-red-500 border-2 row-span-3 my-4 rounded-md" />
                <div className="bg-white w-5/6 h-[15rem] border-red-500 border-2 my-4 rounded-md" />
            </div>
        </div>
    )
}