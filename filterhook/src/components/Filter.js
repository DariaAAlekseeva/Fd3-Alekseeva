import React, { useState } from "react";
import Controls from "./Controls";
import List from "./List";

const Filter = ({ initWords }) => {
    const [isSorted, setIsSorted] = useState(false);
    const [filter, setFilter] = useState('');

    const sortChanged = () => setIsSorted(!isSorted);

    const filterChanged = (eo) => setFilter(eo.target.value);

    const reset = () => {
        setFilter('')
        setIsSorted(false)
    }

    let filteredWords = [...initWords];
    if (isSorted)
        filteredWords.sort();
    if (filter)
        filteredWords = filteredWords.filter(s => s.includes(filter));

    return (
        <>
            <Controls isSorted={isSorted} filter={filter} sortChanged={sortChanged} filterChanged={filterChanged} reset={reset} />
            <List words={filteredWords} />
        </>
    )
}

export default Filter;