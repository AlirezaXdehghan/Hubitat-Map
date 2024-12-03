import React, { useEffect, useState } from 'react';
import './SearchBar.css'; // Ensure this path is correct
import { useDispatch, useSelector } from "react-redux";
import store from "./store";

function SearchBar({
                       searchTerm,
                       setSearchTerm,
                       filterCriteria,
                       handleCheckboxChange,
                       setFilterCriteria
                   }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [uniqueDenominations, setUniqueDenominations] = useState([]);
    const [uniqueIslands, setUniqueIslands] = useState([]);
    const dispatch = useDispatch();

    //useEffect(() => {
        //if (churchData?.length > 0) {
        //    updateUniqueValues(); update unique filter values here!
        //}
    //}, [churchData]);

    // const updateUniqueValues = () => {
    //     const denominations = new Set();
    //     const islands = new Set();
    //      churchData.forEach(church => {
    //         if (church.content["Island"]) {
    //             islands.add(church.content["Island"]); the characteristics you wanna filter based on!
    //         }
    //     });
    //
    //     setUniqueDenominations([...denominations]);
    //     setUniqueIslands([...islands]);
    // };

    // Fetch any data if not already fetched and you wanna use later
    //const [dataFetched, setDataFetched] = useState(false);
    // useEffect(() => {
    //     if (!dataFetched) {
    //         fetch(`http://ckdata.herokuapp.com/api/v1/dataset.json?group_name=Churches%202`)
    //             .then(response => {
    //                 if (response.status !== 200) {
    //                     console.log('Looks like there was a problem. Status Code: ' + response.status);
    //                     return;
    //                 }
    //                 response.text().then(data => {
    //                     let fixedJsonString = data.replace(/\\"/g, '"');
    //                     fixedJsonString = fixedJsonString.replace(/"\{/g, '{');
    //                     fixedJsonString = fixedJsonString.replace(/\}"?/g, '}');
    //                     fixedJsonString = fixedJsonString.replace(/\\\\/g, '\\');
    //                     try {
    //                         const parsedJson = JSON.parse(fixedJsonString);
    //                         setDataFetched(true);
    //                     } catch (e) {
    //                         console.error('Error parsing JSON:', e);
    //                     }
    //                 });
    //             })
    //             .catch(err => console.log('Fetch Error :-S', err));
    //     }
    // }, [dataFetched, dispatch]);

    const handleFilterChange = (value) => {
        handleCheckboxChange(value);
    };

    return (
        <div>
            <div className="SearchDiv">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setIsPopupOpen(true)}>Filter</button>
            </div>
            {isPopupOpen &&
                <div className="popup">
                    <button
                        className="popup-close"
                        onClick={() => setIsPopupOpen(false)}
                    >
                        &times;
                    </button>
                    <h3>Filter by Characteristics</h3>
                    <div className="filters">
                        <h4>Denomination</h4>
                        {uniqueDenominations.map((denomination, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`denom-${index}`}
                                    checked={filterCriteria.includes(denomination)}
                                    value={denomination}
                                    onChange={() => handleFilterChange(denomination)}
                                />
                                <label htmlFor={`denom-${index}`}>{denomination}</label>
                            </div>
                        ))}
                    </div>
                    <div className="filters">
                        <h4>Island</h4>
                        {uniqueIslands.map((island, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`island-${index}`}
                                    checked={filterCriteria.includes(island)}
                                    value={island}
                                    onChange={() => handleFilterChange(island)}
                                />
                                <label htmlFor={`island-${index}`}>{island}</label>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default SearchBar;
