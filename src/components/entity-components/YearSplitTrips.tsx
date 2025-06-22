import React from 'react';

import useFetch from "../../../Hooks/useFetch";
import YearEntry from "./YearEntry";
import LoadingError from "../LoadingError";

function YearSplitTrips({tripsChanged}:{tripsChanged:boolean}) {
    const [years, loadYears]=useFetch<number[]>("trips/years/", tripsChanged)

    if(!years) return <LoadingError loadingObject={"путешествия"} loading={loadYears}/>
    return <div className="side_margins vert-margins" >
        {years.map(row =>
            <YearEntry key={row} year={row} refetch={tripsChanged}/>
        )}

    </div>
}

export default YearSplitTrips;