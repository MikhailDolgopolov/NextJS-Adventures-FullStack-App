'use client';

import { HomeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

function NavigateHome() {
    const router=useRouter();
    return (
        <button className="inline center-child" onClick={()=>router.push("/")}>
            <HomeIcon />
        </button>
    );
}
export default NavigateHome;