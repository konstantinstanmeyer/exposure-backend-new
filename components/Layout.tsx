import Navbar from './Navbar';
import Error from './Error';
import { PropsWithChildren } from 'react';
import Success from './Success';

export default function Layout({ children }: PropsWithChildren<{}>){
    return (
        <>
            <Navbar />
                <main>{children}</main>
            <Error />
            <Success />
        </>
    )
}