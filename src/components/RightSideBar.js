import React from 'react';
import {useSelector} from "react-redux";
import './RightSideBar.css'
import store from "./store";
import {updateCenterMap} from "./actions";


function RightSideBar({ filteredEffects }) {

    const handleItemClick = (lat, lng) => {
        console.log('handle the action in RightSideBar.js!')
        //store.dispatch(updateCenterMap([lng,lat,18]))
    };

    return (
        <div className='results-pane'>
            <h4>Search Results - {filteredEffects.length} Points</h4>
            <ul>
                {filteredEffects.map((effect, index) => (
                    <li key={index} onClick={() => handleItemClick(effect.lat, effect.lng)}>
                        {effect.fullName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RightSideBar;
