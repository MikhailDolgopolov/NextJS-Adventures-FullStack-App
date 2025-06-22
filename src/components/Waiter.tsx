import {useEffect, useState} from 'react';

function Waiter({delay, children}:{delay:number, children:React.ReactNode[]}) {
    const [wait, setWaiting] = useState<boolean>(true)
    useEffect(() => {
        setTimeout(() => setWaiting(false), delay*1000)
    }, [delay])
    return <>{wait?children[0]:children[1]}</>
}

export default Waiter;