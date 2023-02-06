import { useRouter } from "next/router"

export default function ProfileView(){
    const router = useRouter();

    return (
        <div className="">
            {`${router.query.username ? router.query.username : ""}`}
        </div>
    )
}