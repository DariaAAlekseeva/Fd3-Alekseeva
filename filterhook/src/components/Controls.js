import React from "react";

const Controls = ({ isSorted, filter, sortChanged, filterChanged, reset }) => {
    return (
        <>
            <input type='checkbox' checked={isSorted} onChange={sortChanged} />
            <input type='text' value={filter} onChange={(e) => filterChanged(e.target.value)}/>
            <input type='button' value='reset' onClick={reset} />
        </>
    )
}

export default Controls;