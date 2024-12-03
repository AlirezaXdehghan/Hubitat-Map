import React from 'react';
import placeholder from '../assets/placeholder.jpg';
import './ImageSlider.css'

function ImageSlider() {
    return (
        <div className={"slider"}>
            <img src={placeholder} alt="Artifact 1" />
            <img src={placeholder} alt="Artifact 2" />
            <img src={placeholder} alt="Artifact 3" />
            <img src={placeholder} alt="Artifact 3" />
            <img src={placeholder} alt="Artifact 3" />
            <img src={placeholder} alt="Artifact 3" />
            <img src={placeholder} alt="Artifact 3" />
        </div>
    );
}

export default ImageSlider;
