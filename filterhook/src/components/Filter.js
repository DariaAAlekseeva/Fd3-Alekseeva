import React, { useState, useMemo } from "react";
import Controls from "./Controls";
import List from "./List";

const Filter = ({ initWords }) => {
    const [isSorted, setIsSorted] = useState(false);
    const [filter, setFilter] = useState('');

    const sortChanged = () => setIsSorted(!isSorted);

    const filterChanged = (newFilter) => setFilter(newFilter);

    const reset = () => {
        setFilter('')
        setIsSorted(false)
    }

    const memoizedValue = useMemo(()=>{
        let filteredWords=[...initWords]
        if (isSorted)
            filteredWords.sort();
        if (filter)
            filteredWords = filteredWords.filter(s => s.includes(filter));
        return filteredWords;
    }, [filter, initWords, isSorted])

    return (

        <>
            <Controls isSorted={isSorted} filter={filter} sortChanged={sortChanged} filterChanged={filterChanged} reset={reset} />
            <List words={memoizedValue} />
        </>
    )
}

export default Filter;