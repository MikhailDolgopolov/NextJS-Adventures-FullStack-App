'use client';

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';

function NavigateHome() {
    const router=useRouter();
    return (
        <button className="inline center-child" onClick={()=>router.push("/")}>
            <FontAwesomeIcon icon={faHome} size="lg"/>
        </button>
    );
}
export default NavigateHome;