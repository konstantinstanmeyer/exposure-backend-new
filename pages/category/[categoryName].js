import { useRouter } from 'next/router'

export default function Category(){
    const router = useRouter();

    const categoryName = router.query?.categoryName;

    

    if (!categoryName) return router.push('/');

    return(
        <div>
            hello
        </div>
    )
}